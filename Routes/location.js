'use strict'

const Location = require('../Models/Location')
const User = require('../Models/User')
const _ = require('lodash')
const { verifyToken } = require('../utils/auth')
const {
  sendResponse,
  validateInput,
  sendValidationErrorResponse
} = require('../utils/misc')

module.exports = router => {
  const URL_PREFIX = '/location'

  // Create Location
  router.post(URL_PREFIX, (req, res) => {
    const { name, female, male, parent_id } = req.body
    var validation = validateInput({
      name: { value: name, required: true },
      female: { value: female, required: true },
      male: { value: female, required: true },
      parent_id: { value: parent_id, required: false }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    Location.findOne({ name: name }, (error, existingLocation) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while creating Location',
          false,
          500,
          error
        )
      }

      if (existingLocation) {
        return sendResponse(
          res,
          null,
          'Error while creating location: Duplicate name',
          false,
          400
        )
      } else {
        var location = new Location(req.body)

        location.save(error => {
          if (error) {
            return sendResponse(
              res,
              null,
              'Error while creating location',
              false,
              500,
              error
            )
          }

          sendResponse(
            res,
            location,
            'Location created successfully',
            true,
            201
          )
        })
      }
    })
  })

  // Get all locations details
  router.get(`${URL_PREFIX}`, verifyToken, (req, res) => {
    Location.find({}, (error, locations) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while getting locations',
          false,
          500,
          error
        )
      }
      return sendResponse(res, location)
    })
  })

  // Get location by id details
  router.get(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Location.findById(req.params.id, (error, location) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while getting location',
          false,
          500,
          error
        )
      }
      return sendResponse(res, location)
    })
  })

  // Update location
  router.put(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    const { name, female, male, parent_id } = req.body
    var validation = validateInput({
      name: { value: name, minLength: 2 },
      female: { value: female },
      male: { value: female },
      parent_id: { value: parent_id, minLength: 10 }
    })

    if (!validation.passed) {
      return sendValidationErrorResponse(res, validation)
    }

    Location.findById(req.params.id, (error, location) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while updating Location',
          false,
          500,
          error
        )
      }
      if (location) {
        _.merge(location, req.body)
        location.save(error => {
          if (error) {
            return sendResponse(
              res,
              null,
              'Error while updating Location',
              false,
              500,
              error
            )
          }

          sendResponse(res, location, 'Location updated successfully', true)
        })
      }
    })
  })

  router.delete(`${URL_PREFIX}/:id`, verifyToken, (req, res) => {
    Location.findByIdAndRemove(req.params.id, (error, location) => {
      if (error) {
        return sendResponse(
          res,
          null,
          'Error while removing location',
          false,
          500,
          error
        )
      }
      // TODO: probably best to use some pre-save hooks here
      Location.updateMany(
        { parent_id: req.params.id },
        {
          parent_id: 'deleted_location'
        },
        error => {
          if (error) {
            return sendResponse(
              res,
              null,
              'Error while removing location',
              false,
              500,
              error
            )
          }

          sendResponse(
            res,
            req.params.id,
            'Location removed successfully',
            true
          )
        }
      )
    })
  })
}
