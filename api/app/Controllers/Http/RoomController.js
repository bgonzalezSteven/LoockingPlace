'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Room = use('App/Models/Room')
const Hotel = use('App/Models/Hotel')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {
  /**
   * Show a list of all rooms.
   * GET rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const RommsHotel = (await Room.where('_idHotel', infoHotel._id).fetch()).toJSON()
    RommsHotel.forEach(element => {
      element.actions = [
        {
          color: "secondary",
          icon: "edit",
          title: "Editar",
          to: `roomTypes/edit_roomTypes/${element._id}`
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
   * Render a form to be used for creating a new room.
   * GET rooms/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new room.
   * POST rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const validation = await validate(request.all(), Room.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const date = request.only(Room.fillable)
      date._idHotel = infoHotel._id
      if (date._id) {
        response.status(204).send(await Room.where('_id', date._id).update(date))
      } else {
        response.status(200).send(await Room.create(date))
      }
    }
    
  }

  /**
   * Display a single room.
   * GET rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Room.where('_id', params.id).first())
  }

  /**
   * Render a form to update an existing room.
   * GET rooms/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update room details.
   * PUT or PATCH rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a room with id.
   * DELETE rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await Room.where('_id', params.id).delete())
  }
}

module.exports = RoomController
