'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Paypament extends Model {
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['type', '_id']
  }
  static fieldValidationRules() {
    return {
      type: 'required|string',
      _id: 'string'
    }
  }
}

module.exports = Paypament
