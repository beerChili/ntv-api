'use strict'

module.exports = {
  api_key: function checkApiKeySecurity(req, secDef, key, next) {
    if (key === require('config').get('api').api_key) {
      next()
    } else {
      next(new Error('access denied!'))
    }
  }
}
