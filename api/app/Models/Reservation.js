'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reservation extends Model {
  customer () {
    return this.hasOne('App/Models/Customer', 'customer', '_id')
  }
}

module.exports = Reservation
