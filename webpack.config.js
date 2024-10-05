const path = require('path');
const SRC_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    index: {
      import: path.resolve(SRC_PATH, 'index.ts'),
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: {
      type: 'commonjs',
    },
    path: OUTPUT_PATH,
    filename: `index.js`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        loader: 'ts-loader',
        include: SRC_PATH,
        exclude: /test/,
      },
    ],
  },
  plugins: []
};
