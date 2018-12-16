'use strict'

const User = require('../Models/User')
const _ = require('lodash')
const { verifyToken } = require('../utils/auth')
const {
  sendResponse,
  validateInput,
  sendValidationErrorResponse
} = require('../utils/misc')

module.exports = router => {
  const URL_PREFIX = '/user'

  // Create User
  router.post(URL_PREFIX, (req, res) => {
    const { name, email, password } = req.body
    var validation = validateInput({
      name: { value: name, required: true },
      email: { value: email, required: true, length: 10 },
      password: { value: password, required: true, minLength: 5 }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    User.findOne({ email }, (error, existingUser) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while creating User',
          false,
          500,
          error
        )
      }

      if (existingUser) {
        return sendResponse(
          res,
          null,
          'Error while creating User: Duplicate email',
          false,
          400
        )
      } else {
        var user = new User(req.body)

        user.save(error => {
          if (error) {
            return sendResponse(
              res,
              null,
              'Error while creating User',
              false,
              500,
              error
            )
          }

          sendResponse(res, user, 'User created successfully', true, 201)
        })
      }
    })
  })

  // Get my user details
  router.get(`${URL_PREFIX}`, verifyToken, (req, res) => {
    User.findById(req.decodedToken.userId, (error, user) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while getting user',
          false,
          500,
          error
        )
      }
      return sendResponse(res, user)
    })
  })

  // Update User
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    const { name, email, password } = req.body
    var validation = validateInput({
      name: { value: name, minLength: 2 },
      email: { value: email, length: 10 },
      password: { value: password, minLength: 5 }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    User.findById(req.decodedToken.userId, (error, user) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while updating User',
          false,
          500,
          error
        )
      }
      if (user) {
        _.merge(user, req.body)
        user.save(error => {
          if (error) {
            return sendResponse(
              res,
              null,
              'Error while updating user',
              false,
              500,
              error
            )
          }

          sendResponse(res, user, 'User updated successfully', true)
        })
      }
    })
  })

  router.delete(`${URL_PREFIX}/`, verifyToken, (req, res) => {
    const { userId } = req.decodedToken

    User.findByIdAndRemove(userId, (error, user) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while removing user',
          false,
          500,
          error
        )
      }
      sendResponse(res, userId, 'User removed successfully', true)
    })
  })
}
