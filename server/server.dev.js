import express from 'express'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack.config.js'

const APP_PORT = 3000

var compiler = webpack(webpackConfig)

var app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    stats: {
        chunks: false,
        colors: true,
    }
})

app.use('/', express.static(path.resolve(__dirname, '..', 'public')))
app.listen(APP_PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App is running at http://localhost:${APP_PORT}`)
}
})