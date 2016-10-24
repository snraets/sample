var resolve = require('path').resolve;
var webpack = require('webpack');
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPLugin = require('html-webpack-plugin');

var plugins = [
            new HtmlWebpackPLugin({
                template: './src/index.html',
                inject: 'body'            
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }) 
        ];

    if(process.env.NODE_ENV !== 'TEST'){
        plugins.push(        
            //new CommonsPlugin('polyfills', 'polyfills.js', Infinity),
            new CommonsPlugin({
                name: 'polyfills'
            })); //, Infinity );
    }        

module.exports = {
    //entry: './src/main.js',
    entry: {
        'polyfills': [
            'core-js/es6'
        ],
        'css': [
            './src/css/common.less'
        ],
        'app':'./src/main.js',
    },
    output:{
        path:resolve(__dirname, 'dist'),
        filename:'[name].[chunkhash].bundle.js'
    },   
    plugins: plugins,  
    module:{
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.html$/, loader: "raw-loader" }       
        ]
    }
};