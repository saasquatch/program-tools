
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./visual-dev.cjs.production.min.js')
} else {
  module.exports = require('./visual-dev.cjs.development.js')
}
