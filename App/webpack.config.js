/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const path = require('path');

module.exports =
{   
    // App Entry Point:
    entry: './src/App/index.ts',

    // Output file (bundle):
    output: 
    {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // Dev-Server Config
    devServer: 
    {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 9000
    },

    resolve: 
    {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        
        // Enable loading modules relatively
        modules: 
        [
            'node_modules', 
            path.join(__dirname, 'src')
        ]
    },
    
    module:
    {
        loaders:
        [
            // TypeScript (TS)
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            // EcmaScript 2015 (JS)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // Html
            // {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            //     loader: "raw-loader"
            // },
            {
                test: /\.(html)$/,
                use: 
                {
                    loader: 'html-loader',
                    options: 
                    {
                        attrs: [':data-src']
                    }
                }
            },
            // Less (CSS)
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: 
                [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },

    // support source maps
    devtool: "#inline-source-map"
};