
var webpack = require('webpack');
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPLugin = require('html-webpack-plugin');

module.exports = {
    //entry: './src/main.js',
    entry: {
        'app':'./src/main.js',
        'polyfills': [
            'core-js/es6'
        ],
        'css': [
            './src/css/common.less'
        ]
    },
    output:{
        path:'./dist',
        filename:'[name].bundle.js'
    },   
  plugins: [
    new CommonsPlugin({
      name: 'polyfills'
    }),
    new HtmlWebpackPLugin({
        template: './src/index.html',
        inject: 'body'
        
    }) ,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })      
  ],  
    module:{
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.html$/, loader: "raw-loader" }       
        ]
    }
}