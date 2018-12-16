const request = require('supertest')
const { userB } = require('./mocks')
const { connectDatabase, dropDatabase } = require('../utils/database')

exports.loginUser = app => {
  return this.createUser(app).then(() => {
    return request(app)
      .post('/api/v1/authenticate/')
      .send(userB)
      .set('Content-Type', 'application/json')
      .then(function (response) {
        return response.body.data
      })
  })
}

exports.createUser = (app, user) => {
  user = user || userB

  return request(app)
    .post('/api/v1/user')
    .send(user)
    .set('Content-Type', 'application/json')
}

exports.createLocation = (app, location, token) => {
  return request(app)
    .post('/api/v1/location')
    .send(location)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
}

exports.cleanUp = () => {
  // Connect to the db and remove test data
  const connection = connectDatabase()
  dropDatabase(connection)
}
