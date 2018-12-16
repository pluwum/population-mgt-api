'use strict'

const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { sendResponse } = require('../utils/misc')

require('dotenv').config()

const URL_PREFIX = '/authenticate'

module.exports = router => {
  // Authenticate
  router.post(URL_PREFIX, (req, res, next) => {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while Authenticating User',
          false,
          500,
          error
        )
      }
      if (!user) {
        return sendResponse(
          res,
          null,
          'Authentication failed: User does not exist failed',
          false,
          404
        )
      }
      if (req.body.password !== user.password) {
        return sendResponse(
          res,
          null,
          'Authentication failed: PassCode mismatch',
          false,
          400
        )
      } else {
        const { email, _id: userId } = user
        const payload = {
          email,
          userId
        }
        // create a token that expires in 24 hours
        var token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 86400
        })
        // return the information including token
        sendResponse(res, token, 'Successfully authenticated', true, 200)
      }
    })
  })
}
