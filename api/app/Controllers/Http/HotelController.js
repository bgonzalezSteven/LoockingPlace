'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Hotel = use('App/Models/Hotel')
const User = use('App/Models/User')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with hotels
 */
class HotelController {
  /**
   * Show a list of all hotels.
   * GET hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const dates = (await Hotel.all()).toJSON()
    const info = []
    for (let i in dates) {
      info.push({
        _id: dates[i]._id,
        email: dates[i].email,
        name: dates[i].name,
        status: `${((await User.where('email', dates[i].email).fetch()).toJSON()).length > 0 ? 'Activo' : 'Inactivo'}`,
        direction: dates[i].direction,
        actions: [
          {
            color: "secondary",
            icon: "edit",
            title: "Editar",
            to: `hotels/edit_hotels/${dates[i]._id}`
          },
          {
            color: "primary",
            icon: "delete",
            title: "Eliminar",
            to: `${dates[i]._id}`
          },
          {
            color: `${((await User.where('email', dates[i].email).fetch()).toJSON()).length > 0 ? 'negative' : 'positive'}`,
            icon: "people",
            title: `${((await User.where('email', dates[i].email).fetch()).toJSON()).length > 0 ? 'Desactivar' : 'Activar'}`,
            to: `${dates[i]._id}`,
            activate: `${((await User.where('email', dates[i].email).fetch()).toJSON()).length > 0 ? true : false}`
          }
        ]
      })
    }
    response.send(info)
  }

  /**
   * Render a form to be used for creating a new hotel.
   * GET hotels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async changeInfo({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    response.send(infoHotel)
  }

  /**
   * Create/save a new hotel.
   * POST hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const validation = await validate(request.all(), Hotel.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const date = request.all()
      if (date._id) {
        response.send(await Hotel.where('email', date.email).update(date))
      } else {
        const role = [
          {
            slug: date.role.value
          }
        ]
        if (((await Hotel.where('email', date.email).fetch()).toJSON()).length > 0) {
          response.status(423).unprocessableEntity([{
            status: 423,
            message: 'Ya existe un Hotel con ese Correo'
          }])
        } else {
          delete date.role // Elimino los Roles para que solo me queden los datos para el registro interno
          const infoCreatedHotel = await Hotel.create(date)
          const infoUserCreated = {
            email: date.email,
            password: `${date.rif.slice(0, 5)}${date.name.slice(0, 4)}${date.rif.slice(5, 8)}`,
            darkMode: false,
            roles: role
          }
          console.log(infoUserCreated)
          response.send(await User.create(infoUserCreated))
        }
      }
    }
  }

  /**
   * Display a single hotel.
   * GET hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const info = (await Hotel.where('_id', params.id).fetch()).toJSON()
    response.send(info[0])
  }

  /**
   * Render a form to update an existing hotel.
   * GET hotels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update hotel details.
   * PUT or PATCH hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const dates = request.only(['email', 'status', '_id'])
    if (dates.status == 'Activar') {
      const infoUser = (await Hotel.where('email', dates.email).first())
      const infoUserCreated = {
        email: infoUser.email,
        password: `${infoUser.rif.slice(0, 5)}${infoUser.name.slice(0, 4)}${infoUser.rif.slice(5, 8)}`,
        darkMode: false,
        roles: [
          {
            slug: 'app.everyAll'
          }
        ]
      }
      response.send(await User.create(infoUserCreated))
    } else {
      response.send(await User.where('email', dates.email).delete())
    }
  }

  /**
   * Delete a hotel with id.
   * DELETE hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    response.send(await Hotel.where('_id', params.id).delete())
  }
}

module.exports = HotelController
