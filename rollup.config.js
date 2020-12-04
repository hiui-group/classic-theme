import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index',
  moduleName: 'ClassicTheme',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  output: [
    {
      format: 'es',
      file: 'es/classic-theme.js',
      indent: false
    },
    { file: 'lib/classic-theme.js', format: 'cjs', indent: false }
  ],
  plugins: [
    resolve({ extensions: ['.jsx', '.js'] }),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    postcss({
      use: [
        [
          'sass',
          {
            includePaths: ['./node_modules']
          }
        ]
      ]
    })
  ]
}
