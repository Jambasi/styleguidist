import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import {terser} from 'rollup-plugin-terser';


require('rollup-plugin-replace')({
  'process.env.NODE_ENV': JSON.stringify('production')
})
const pkg = require('./package.json')
console.log(process.env.NODE_ENV)
const libraryName = 'react-components'
process.env.NODE_ENV = "production"
export default {
  input: `src/${libraryName}.ts`,
  treeshake: true,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true, plugins: [terser({ compress: true,module: true})] },
    { file: pkg.module, format: 'es', sourcemap: true, plugins: [terser({
      compress: {
        inline:true
      },
      output: {
          comments: false
      }
  })] }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ["lodash","react"],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, clean:true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement']
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ].concat(process.env.NODE_ENV === 'production'
      ? [
        // Minify
        terser()
      ]
      : []),
}
