const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './Vuejs/mainVue.js',
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'Vuejs'),
        filename: 'index_bundle.js'
    },
    mode: 'development',
    plugins: [
        new VueLoaderPlugin()
    ]
}