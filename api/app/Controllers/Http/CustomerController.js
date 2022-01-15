'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use('App/Models/Customer')
const TypesRoom = use('App/Models/TypesRoom')
const Hotel = use('App/Models/Hotel')
const Paypament = use('App/Models/Paypament')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * 
   * 
   */

  async getinfo({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON() // Informacion del hotel
    const RommsHotel = (await Customer.where('_idHotel', infoHotel._id).with('count').fetch()).toJSON() // Informacion de los clientes
    const countHabitations = (await TypesRoom.where('_idHotel', infoHotel._id).with('typeRoom').fetch()).toJSON() // Informacion de los Servicios
    const PaypamentHotel = (await Paypament.where('_idHotel', infoHotel._id).fetch()).toJSON() // Informacion de los metodos de pago

    let GeneralInfo = {
      customer: [],
      service: [],
      paypament: []
    }
    if (RommsHotel.length > 0) { // Si existen clientes lo anexa al objeto sino lo envia vacio
      RommsHotel.forEach(element => {
        element.label = `${element.name} ${element.lastname}`
        element.value = element._id
      })
      GeneralInfo.customer = RommsHotel
    }
    if (countHabitations.length > 0) {
      let infoRooms = []
      countHabitations.forEach(element => {
        infoRooms.push({_idService: element._id, range: element.range, type: element.typeRoom.roomsType, coste: element.typeRoom.coste, capacity: element.typeRoom.capacity})
      })
      GeneralInfo.service = infoRooms
    }
    if (PaypamentHotel.length > 0) {
      PaypamentHotel.forEach(element => {
        element.label = element.type,
        element.value = element._id
      })
      GeneralInfo.paypament = PaypamentHotel
    }
    response.send(GeneralInfo)
  }


  async index({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const RommsHotel = (await Customer.where('_idHotel', infoHotel._id).fetch()).toJSON()
    RommsHotel.forEach(element => {
      element.actions = [
        {
          color: "secondary",
          icon: "edit",
          title: "Editar",
          to: `customer/edit_customer/${element._id}`
        },
        {
          color: "primary",
          icon: "delete",
          title: "Eliminar",
          to: `${element._id}`
        },
      ]
    })
    response.send(RommsHotel)
  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const validation = await validate(request.all(), Customer.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const date = request.only(Customer.fillable)
      date._idHotel = infoHotel._id
      if (date._id) {
        response.status(204).send(await Customer.where('_id', date._id).update(date))
      } else {
        response.status(200).send(await Customer.create(date))
      }
    }

  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    response.send(await Customer.where('_id', params.id).first())
  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    response.send(await Customer.where('_id', params.id).delete())
  }
}

module.exports = CustomerController
