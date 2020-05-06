# CKB Template using moleculec-es

This repo provides a template for writing JavaScript on CKB. It ships with [moleculec-es](https://github.com/xxuejie/moleculec-es) integration directly for CKB data structures.


## How to use it

```
$ npm install
```

`src/index.js` serves as a starting point for your script. When you finish editing the files. Run the following command to build the script:

```
$ npm run build
```

A file named `duktape.js` will be generated in the `build` directory. This file should contain everything you need to run your script logic.

## References

- https://github.com/xxuejie/ckb-duktape-template/tree/next
- https://github.com/xxuejie/moleculec-es