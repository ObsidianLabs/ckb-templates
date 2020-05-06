import babel from "rollup-plugin-babel";
import commonjs from 'rollup-plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser";

module.exports = [
  {
    input: "src/index.js",
    output: {
      file: "build/duktape.js",
      format: "iife"
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      terser()
    ]
  }
]
