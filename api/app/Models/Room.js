'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['roomsType', 'coste', '_id', 'capacity']
  }
  static fieldValidationRules() {
    return {
      roomsType: 'required|string',
      coste: 'required|string',
      _id: 'string',
      capacity: 'number'
    }
  }
  hotel () {
    return this.hasOne('App/Models/Hotel', '_idHotel', '_id')
  }
}

module.exports = Room
