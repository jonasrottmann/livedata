import path from 'path'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import bundleSize from 'rollup-plugin-bundle-size'
import livedataPkg from './packages/livedata/package.json'
import operatorsPkg from './packages/operators/package.json'

const identifierName = pkg => pkg.name.split('/').reverse()[0].replace(/[^\w\s]/gi, '')

export default [
  {
    input: './packages/livedata/index.js',
    output: {file: path.join('./packages/livedata', livedataPkg.unpkg), format: 'iife', name: identifierName(livedataPkg), sourcemap: true},
    plugins: [
      babel({
        presets: [['@babel/preset-env', {targets: {browsers: 'defaults'}}]]
      }),
      terser(),
      bundleSize()
    ]
  },
  {
    input: './packages/livedata/index.js',
    output: [
      {file: path.join('./packages/livedata', livedataPkg.main), format: 'umd', name: identifierName(livedataPkg), sourcemap: true},
      {file: path.join('./packages/livedata', livedataPkg.module), format: 'esm', sourcemap: true}
    ],
    plugins: [
      babel(),
      terser(),
      bundleSize()
    ]
  },
  {
    input: './packages/operators/index.js',
    external: [livedataPkg.name],
    output: {
      file: path.join('./packages/operators', operatorsPkg.unpkg),
      format: 'iife',
      name: identifierName(operatorsPkg),
      sourcemap: true,
      globals: {
        [livedataPkg.name]: identifierName(livedataPkg)
      }
    },
    plugins: [
      babel({
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: 'defaults'
            }
          }]
        ]
      }),
      terser(),
      bundleSize()
    ]
  },
  {
    input: './packages/operators/index.js',
    external: [livedataPkg.name],
    output: [{
      file: path.join('./packages/operators', operatorsPkg.main),
      format: 'umd',
      name: identifierName(operatorsPkg),
      sourcemap: true,
      globals: {
        [livedataPkg.name]: identifierName(livedataPkg)
      }
    },
    {
      file: path.join('./packages/operators', operatorsPkg.module),
      format: 'esm',
      sourcemap: true
    }],
    plugins: [
      babel(),
      terser(),
      bundleSize()
    ]
  }
]
