const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')
const customTheme = require('./src/app/config/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src'
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { modifyVars: customTheme, javascriptEnabled: true }
        }
      }
    }
  ]
}
