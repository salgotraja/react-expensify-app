const path = require('path');
const webpack = require('webpack');

// webpack.config.js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
   require('dotenv').config({ path: '.env.test' });
}else if (process.env.NODE_ENV === 'development'){
   require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
   const isProduction = env === 'production';
   const CSSExtract = new ExtractTextPlugin('styles.css');

   return {
      entry: './src/app.js',
      output: {
         path: path.join(__dirname, 'public', 'dist'),
         filename: 'bundle.js'
      },
      module: {
         rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
         }, {
            test: /\.s?css$/,
            use: CSSExtract.extract({
               use: [
                  {
                     loader: 'css-loader',
                     options: {
                        sourceMap: true
                     }
                  },
                  {
                     loader: 'sass-loader',
                     options: {
                        sourceMap: true
                     }
                  }
               ]
            })
         }]
      },
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      devServer: {
         contentBase: path.join(__dirname, 'public'),
         historyApiFallback: true,
         publicPath: '/dist/'
      },
      plugins: [
         CSSExtract,
         new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
         }),
         new HardSourceWebpackPlugin({
            // Either an absolute path or relative to webpack's options.context.
            cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
            // Either a string of object hash function given a webpack config.
            configHash: function(webpackConfig) {
               // node-object-hash on npm can be used to build this.
               return require('node-object-hash')({sort: false}).hash(webpackConfig);
            },
            // Either false, a string, an object, or a project hashing function.
            environmentHash: {
               root: process.cwd(),
               directories: [],
               files: ['package-lock.json', 'yarn.lock'],
            },
            // An object.
            info: {
               // 'none' or 'test'.
               mode: 'none',
               // 'debug', 'log', 'info', 'warn', or 'error'.
               level: 'debug',
            },
            // Clean up large, old caches automatically.
            cachePrune: {
               // Caches younger than `maxAge` are not considered for deletion. They must
               // be at least this (default: 2 days) old in milliseconds.
               maxAge: 2 * 24 * 60 * 60 * 1000,
               // All caches together must be larger than `sizeThreshold` before any
               // caches will be deleted. Together they must be at least this
               // (default: 50 MB) big in bytes.
               sizeThreshold: 50 * 1024 * 1024
            },
         })
      ]
   };
};