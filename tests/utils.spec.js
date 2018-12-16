const { expect } = require('chai')

const { validateInput, sendValidationErrorResponse } = require('../utils/misc')
const { userB } = require('./mocks')

var response = {
  body: {},
  status: function (status) {
    return {
      json: function (data) {
        return data
      }
    }
  }
}

describe('Test helper Utilities', () => {
  it('validates data correctly', () => {
    const { name, email, password } = userB

    var validation = validateInput({
      name: { value: name, required: true },
      email: { value: email, required: true, type: 'email' },
      password: { value: password, required: true, minLength: 5 }
    })
    expect(validation.passed).to.be.true
  })

  it('validates required fields correctly ', () => {
    const { email, password } = userB

    var validation = validateInput({
      name: { value: '', required: true },
      email: { value: email, required: true, type: 'email' },
      password: { value: password, required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)
    expect(result.success).to.be.false
    expect(result.error).to.deep.include({ name: ['is required'] })
  })

  it('validates min length of fields correctly ', () => {
    const { email } = userB

    var validation = validateInput({
      name: { value: 'Patrick', required: true },
      email: { value: email, required: true, type: 'email' },
      password: { value: '123', required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)

    expect(result.success).to.be.false
    expect(result.error).to.deep.include({
      password: ['length should be more than 5']
    })
  })

  it('validates length of fields correctly ', () => {
    const { email, password } = userB

    var validation = validateInput({
      name: { value: 'Patrick', required: true },
      email: {
        value: 'luwyxx@gmail.com',
        required: true,
        length: 10,
        type: 'email'
      },
      password: { value: password, required: true, minLength: 5 }
    })

    var result = sendValidationErrorResponse(response, validation)

    expect(result.success).to.be.false
    expect(result.error).to.deep.include({
      email: ['length should be 10']
    })
  })
})
