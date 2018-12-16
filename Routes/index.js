'use strict'

const user = require('./user')
const location = require('./location')
const auth = require('./auth')

module.exports.routes = router => {
  user(router)
  location(router)
  auth(router)
}

module.exports.handle404 = () => {
  // Handle 404s
  return function (req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' })
  }
}

module.exports.handle500 = () => {
  // handle exceptions
  return function (err, req, res, next) {
    // return res.status(500).send({ error: err })
  }
}
