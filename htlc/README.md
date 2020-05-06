# HTLC Example

## How to use

```
$ npm install
$ npm run build
```

A file named `duktape.js` will be generated in the `build` directory.

## Notice

In the blockchain schema, `Uint64.toBigEndianBigUint64` and `Uint64.toLittleEndianBigUint64` were (modified)[https://github.com/ObsidianLabs/ckb-templates/commit/cb1bf5e3220faa1ab26adb9633814e95b92357e0] because Duktape does not support [BigInt](https://github.com/svaarala/duktape/issues/2048) and [int64](https://github.com/svaarala/duktape/issues/1471).

## References

- https://xuejie.space/2020_02_21_introduction_to_ckb_script_programming_advanced_duktape_examples/
- https://github.com/xxuejie/ckb-duktape-template/tree/next