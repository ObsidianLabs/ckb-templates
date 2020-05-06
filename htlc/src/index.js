import crc32 from "crc32"
import { Script, Header } from "../schema/blockchain.js"
import { HtlcArgs, HtlcWitness } from "../schema/htlc.js"

function bytesToHex(b) {
  return "0x" + Array.prototype.map.call(
    new Uint8Array(b),
    function(x) {
      return ('00' + x.toString(16)).slice(-2)
    }
  ).join('')
}

function bytesToString(b) {
  return String.fromCharCode.apply(null, new Uint8Array(b))
}

const script = new Script(CKB.load_script(0))
const args = script.getArgs().raw()
const htlcArgs = new HtlcArgs(args)

const rawWitness = CKB.load_witness(0, 0, CKB.SOURCE.GROUP_INPUT)
if (typeof rawWitness === 'number') {
  throw new Error(`Invalid response when loading witness: ${rawWitness}`)
}
const htlcWitness = new HtlcWitness(rawWitness)

let lockHashToMatch
const secret = bytesToString(htlcWitness.getS().raw())
if (secret) {
  const hash = '0x' + crc32(secret)
  if (hash !== bytesToHex(htlcArgs.getHash().raw())) {
    throw new Error(`Invalid secret string!`)
  }
  CKB.debug(`Secret verified!`)
  lockHashToMatch = bytesToHex(htlcArgs.getA().raw())
} else {
  // Load header for current input first
  const rawInputHeader = CKB.load_header(0, 0, CKB.SOURCE.GROUP_INPUT)
  if (typeof rawInputHeader === 'number') {
    throw new Error(`Invalid response when loading input header: ${rawInputHeader}`)
  }
  const inputHeader = new Header(rawInputHeader)
  const inputHeaderNumber = inputHeader.getRaw().getNumber().toLittleEndianBigUint64()
  
  const targetHeaderIndex = htlcWitness.getI().toLittleEndianUint32()
  const rawTargetHeader = CKB.load_header(0, targetHeaderIndex, CKB.SOURCE.HEADER_DEP)
  if (typeof rawTargetHeader === 'number') {
    throw new Error(`Invalid response when loading target header: ${rawTargetHeader}`)
  }
  const targetHeader = new Header(rawTargetHeader)
  const targetHeaderNumber = targetHeader.getRaw().getNumber().toLittleEndianBigUint64()

  if (targetHeaderNumber < inputHeaderNumber + 100) {
    throw new Error(`Timeout period has not reached!`)
  }
  lockHashToMatch = bytesToHex(htlcArgs.getB().raw())
}

CKB.debug(`lockHashToMatch: ${lockHashToMatch}`)

// Now we know which lock hash to test against, we look for an input cell
// with the specified lock hash
let i = 0
while (true) {
  const rawHash = CKB.load_cell_by_field(0, i, CKB.SOURCE.INPUT, CKB.CELL.LOCK_HASH)
  if (rawHash == CKB.CODE.INDEX_OUT_OF_BOUND) {
    throw new Error(`Cannot find input cell using lock hash ${lockHashToMatch}`)
  }
  if (typeof rawHash === 'number') {
    throw new Error(`Invalid response when loading input cell: ${rawHash}`)
  }
  if (bytesToHex(rawHash) == lockHashToMatch) {
    break
  }
  i += 1
}
