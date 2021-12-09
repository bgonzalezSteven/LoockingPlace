'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TypesRoom extends Model {
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['range', '_idRoom', '_id']
  }
  static fieldValidationRules() {
    return {
      range: 'required',
      _idRoom: 'required|string',
      _id: 'string'
    }
  }
  typeRoom () {
    return this.hasOne('App/Models/Room', '_idRoom', '_id')
  }
}

module.exports = TypesRoom
