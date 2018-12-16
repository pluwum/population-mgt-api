const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { loginUser, cleanUp } = require('./utils')
const { userB } = require('./mocks')

describe('Test authentication', () => {
  it('Throws 404 when url is invalid', () => {
    request(app)
      .get('/khkh')
      .end((error, response) => {
        expect(response.status).to.be.equal(404)
      })
  })

  it('Logs in successfully', done => {
    request(app)
      .post('/api/v1/authenticate/')
      .send(userB)
      .set('Content-Type', 'application/json')
      .end(function (error, response) {
        expect(response.body.message).to.be.equal('Successfully authenticated')
        expect(response.body.success).to.be.true
        done()
      })
  })
})

after(() => {
  cleanUp()
})
