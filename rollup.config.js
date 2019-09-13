import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import pkg from './package.json' // eslint-disable-line import/extensions

export default [
  {
    input: 'index.js',
    output: {file: pkg.unpkg, format: 'iife', name: 'livedata'},
    plugins: [
      babel({
        presets: [['@babel/preset-env', {targets: {browsers: 'defaults'}}]]
      }),
      terser()
    ]
  },
  {
    input: 'index.js',
    output: [
      {file: pkg.main, format: 'umd', name: 'livedata', sourcemap: true},
      {file: pkg.module, format: 'esm', sourcemap: true}
    ],
    plugins: [
      babel(),
      cleanup()
    ]
  }
]
