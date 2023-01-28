const webpack = require('webpack'),
   { merge } = require('webpack-merge'),
   common = require('./webpack.config'),
   path = require('path'),
   devCerts = require('office-addin-dev-certs');

process.env.TAILWIND_MODE = 'watch';

module.exports = async () => {
   let ssl = await devCerts.getHttpsServerOptions();

   return merge(common({ tailwindOptions: {}, rootCssLoader: 'style-loader' }), {
      mode: 'development',
      devtool: 'eval',
      output: {
         publicPath: 'https://localhost:7168/',
      },
      devServer: {
         hot: true,
         port: 7168,
         historyApiFallback: true,
         server: {
            type: 'https',
            options: ssl,
         },
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
         },
      },
   });
};
