'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Reservation = use('App/Models/Reservation')
const Historic = use('App/Models/Historic')
const Hotel = use('App/Models/Hotel')
const { validate } = use("Validator")
const moment = use('moment'); require('moment-range');
const date = new Date()
/**
 * Resourceful controller for interacting with reservations
 */
class ReservationController {
  /**
   * Show a list of all reservations.
   * GET reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new reservation.
   * GET reservations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new reservation.
   * POST reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  // Funcion para validar la reservacion de una habitaciond dentro de un periodo ya ocupada
  async VerificatePeriod(dates) {
    // Verifico si dentro de mi bd hay algun campo que posea la fecha de entrada o salida para la habitacion
    const entry = (await Reservation.where('room', dates.room).where({'entryDate': { $gte: new Date(dates.entryDate), $lte: new Date(dates.exitDate) } }).fetch()).toJSON()
    const exit = (await Reservation.where('room', dates.room).where({'exitDate': { $gte: new Date(dates.entryDate), $lte: new Date(dates.exitDate) } }).fetch()).toJSON()
    if ((entry.length > 0) && (exit.length > 0)) {
      return false
    } else {
      return true
    }
  }


  async store({ request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const temp = request.all()
    const information = {
      _idHotel: infoHotel._id,
      service: temp.service._idService,
      paypament: temp.paypament,
      entryDate: new Date(temp.entryDate),
      exitDate: new Date(temp.exitDate),
      customer: temp.customer,
      room: temp.room
    }
    const historicSales = {
      date: new Date(`${date.getUTCFullYear()}/${date.getMonth() + 1}/${date.getUTCDay()}`),
      method: temp.paypament.methods,
      coste: temp.paypament.coste,
    }
    if (await this.VerificatePeriod(information)) {
      const reservation = await Reservation.create(information)
      const histotic = await Historic.create(historicSales)
      response.status(200).send(reservation, histotic)
    } else {
      response.status(423).unprocessableEntity([{
        status: 423,
        message: 'Ya hay una reservación para esa habitacion dentro de esas fechas'
      }])
    } 

  }

  /**
   * Display a single reservation.
   * GET reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing reservation.
   * GET reservations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update reservation details.
   * PUT or PATCH reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a reservation with id.
   * DELETE reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ReservationController
