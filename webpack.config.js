const path = require('path')
const devServerConfig = require('webpack-config-trainiac/devserver')
const buildPath = path.join(__dirname, 'build')
const srcPath = path.join(__dirname, 'client')

module.exports = devServerConfig(buildPath, srcPath)
