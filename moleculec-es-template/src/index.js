import { Script } from "../schema/blockchain.js"

function bytesToHex(b) {
  return "0x" + Array.prototype.map.call(
    new Uint8Array(b),
    function(x) {
      return ('00' + x.toString(16)).slice(-2)
    }
  ).join('')
}

const script = new Script(CKB.load_script(0))
const args = script.getArgs().raw()
CKB.debug(bytesToHex(args))