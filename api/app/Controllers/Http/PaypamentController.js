'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Paypament = use('App/Models/Paypament')
const Hotel = use('App/Models/Hotel')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with paypaments
 */
class PaypamentController {
  /**
   * Show a list of all paypaments.
   * GET paypaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const PaypamentHotel = (await Paypament.where('_idHotel', infoHotel._id).fetch()).toJSON()
    PaypamentHotel.forEach(element => {
      element.actions = [
        {
          color: "secondary",
          icon: "edit",
          title: "Editar",
          to: `paypament/edit_paypament/${element._id}`
        },
        {
          color: "primary",
          icon: "delete",
          title: "Eliminar",
          to: `${element._id}`
        },
      ]
    })
    response.send(PaypamentHotel)
  }

  /**
   * Render a form to be used for creating a new paypament.
   * GET paypaments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new paypament.
   * POST paypaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const validation = await validate(request.all(), Paypament.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const date = request.only(Paypament.fillable)
      date._idHotel = infoHotel._id
      if (date._id) {
        response.status(204).send(await Paypament.where('_id', date._id).update(date))
      } else {
        response.status(200).send(await Paypament.create(date))
      }
    }
    
  }

  /**
   * Display a single paypament.
   * GET paypaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Paypament.where('_id', params.id).first())
  }

  /**
   * Render a form to update an existing paypament.
   * GET paypaments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update paypament details.
   * PUT or PATCH paypaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a paypament with id.
   * DELETE paypaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await Paypament.where('_id', params.id).delete())
  }
}

module.exports = PaypamentController
