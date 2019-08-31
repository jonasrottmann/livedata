import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json' // eslint-disable-line import/extensions

export default {
  input: 'index.js',
  output: [{
    file: pkg.main,
    format: 'cjs'
  },
  {
    name: pkg.name.split('/').pop(),
    file: pkg.browser,
    format: 'iife'
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}
