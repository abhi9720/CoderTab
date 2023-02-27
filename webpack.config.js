const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{ test: /\.js$/, use: 'raw-loader' }],
    },
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/")
        }
    },
};
