const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { loginUser, cleanUp, createUser } = require('./utils')
const { userC, userB, userA } = require('./mocks')
var token

before(async function () {
  // set up here
  token = await loginUser(app)

  const user = await createUser(app, userC)
  userId = user.body.data._id
})

describe('Test user functionality', () => {
  it('Create User', done => {
    request(app)
      .post('/api/v1/user/')
      .send(userA)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end(function (error, response) {
        expect(response.body.message).to.be.equal('User created successfully')
        expect(response.body.success).to.be.true
        done()
      })
  })

  it('Get User', done => {
    request(app)
      .get('/api/v1/user')
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
