const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { loginUser, cleanUp } = require('./utils')
const { locationA } = require('./mocks')
var token

before(async function () {
  // set up here
  token = await loginUser(app)
})

describe('Test location functionality', () => {
  it('Create a new location', done => {
    request(app)
      .post('/api/v1/location')
      .send(locationA)
      .set('Content-Type', 'application/json')
      .end(function (error, response) {
        expect(response.body.message).to.be.equal(
          'Location created successfully'
        )
        expect(response.body.success).to.be.true
        done()
      })
  })

  it('Get locations', done => {
    request(app)
      .get('/api/v1/location')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end(function (error, response) {
        expect(response.body.success).to.be.true
        done()
      })
  })
})

after(() => {
  cleanUp()
})
