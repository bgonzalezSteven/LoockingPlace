'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Historic extends Model {
  reservation () {
    return this.hasMany('App/Models/Reservation', '_idReservation', '_id')
  }
}

module.exports = Historic
