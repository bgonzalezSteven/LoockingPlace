'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['name', 'lastname', 'phone', 'dni', 'email']
  }
  static fieldValidationRules() {
    return {
      name: 'required|string',
      lastname: 'required|string',
      phone: 'string',
      dni: 'required|string',
      email: 'string',
    }
  }
}

module.exports = Customer
