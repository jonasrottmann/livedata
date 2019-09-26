import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import bundleSize from 'rollup-plugin-bundle-size'
import pkg from './package.json'

export default [
  {
    input: 'index.js',
    output: {file: pkg.unpkg, format: 'iife', name: 'livedata', sourcemap: true},
    plugins: [
      babel({
        presets: [['@babel/preset-env', {targets: {browsers: 'defaults'}}]]
      }),
      terser(),
      bundleSize()
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
      terser(),
      bundleSize()
    ]
  }
]
