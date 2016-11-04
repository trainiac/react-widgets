const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const port = 3000

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
})
.listen(port, 'localhost', (err) => {

  if (err) {

    console.log(err)  // eslint-disable-line no-console

  }

  console.log(`Listening at localhost:${port}`) // eslint-disable-line no-console

})