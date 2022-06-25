import express from 'express';
import { join } from 'path';
import ApiRoutes from './api/routes';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevConfig from '../config/webpack.dev.js';
import test from './test.json';

const app = express();

if(process.env.NODE_ENV == 'development') {
  var compiler = webpack(webpackDevConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackDevConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}else {
  app.use(express.static(join(__dirname, 'static')));
  console.log(test.test);
}

app.use('/api', ApiRoutes);

app.use(historyApiFallback()); // Important Note. Individual routes must be upper than this guy. This is added due to the webpack-dev-middleware was disallowing individual routes.

app.listen(3000);