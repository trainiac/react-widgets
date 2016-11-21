const path = require('path')
const devServerConfig = require('trainiac-webpack-configs/devserver')
const buildPath = path.join(__dirname, 'build')
const srcPath = path.join(__dirname, 'client')

module.exports = devServerConfig(buildPath, srcPath)
