const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/bin'),
        filename: 'app.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.css$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ],
        // rules: [
        //     
        // ]
    }
}