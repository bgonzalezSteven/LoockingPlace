'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hotel extends Model {
  static get fillable() {
    return ['name', 'direction', 'rif', 'role', 'email']
  }
  static fieldValidationRules() {
    const infoUser = {
      name: 'required|string',
      direction: 'required|string',
      rif: 'required|string',
      role: 'object',
      email: 'required|email'
    }
    return infoUser
  }
}

module.exports = Hotel
