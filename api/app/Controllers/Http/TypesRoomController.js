'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Room = use('App/Models/Room')
const TypesRoom = use('App/Models/TypesRoom')
const Hotel = use('App/Models/Hotel')
const User = use('App/Models/User')
const { validate } = use("Validator")
/**
 * Resourceful controller for interacting with typesrooms
 */
class TypesRoomController {
  /**
   * Show a list of all typesrooms.
   * GET typesrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async counterRooms(infoHotel) {
    const countHabitations = (await TypesRoom.where('_idHotel', infoHotel._id).fetch()).toJSON()
    let allRoom = []
    for (let i = 1; i <= infoHotel.countHabitations; i++) {
      allRoom.push(i)
    } // Todas las habitaciones del hotel)
    if (countHabitations.length > 0) {
      for (let i in countHabitations) {
        const temp = countHabitations[i].range
        for (let j in temp) {
          const index = (allRoom.indexOf(temp[j]))
          allRoom.splice(index, 1)
        }
      }
      return allRoom
    } else {
      return allRoom
    }
  }
  async getInfoCount({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const infoRooms = (await Room.where('_idHotel', infoHotel._id).fetch()).toJSON()
    const rooms = []
    infoRooms.forEach(element => {
      rooms.push({ label: element.roomsType, value: element._id })
    })
    infoHotel.rooms = rooms
    infoHotel.counter = await this.counterRooms(infoHotel)
    response.send(infoHotel)
  }

  /**
   * Render a form to be used for creating a new typesroom.
   * GET typesrooms/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request, response, params }) {
    response.send((await TypesRoom.where('_id', params.id).with('typeRoom').first()).toJSON())
  }

  /**
   * Create/save a new typesroom.
   * POST typesrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const validation = await validate(request.all(), TypesRoom.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const date = request.only(TypesRoom.fillable)
      date._idHotel = infoHotel._id
      const band = (await this.countOfValidation(infoHotel, date))
      if (band.band) {
        response.send(band.message)
      } else {
        console.log(band)
      }
    }
  }

  async countOfValidation(date, ingresate) {
    if (ingresate._id) {
      console.log('Edicion')
      const creation = (await TypesRoom.where('_id', ingresate._id).update(ingresate))
      return ({
        band: true,
        message: creation
      })
    } else {
      if ((await TypesRoom.where('_idRoom', ingresate._idRoom).first())) {
        console.log('Push in range')
        const info = (await TypesRoom.where('_idRoom', ingresate._idRoom).first())
        const tempConcat = info.range.concat(ingresate.range)
        let edition = (await TypesRoom.where('_idRoom', ingresate._idRoom).update({ range: tempConcat }))
        return ({
          band: true,
          message: edition
        })
      } 
      if (((await TypesRoom.all()).toJSON()).length > 0) {
        console.log('New')
        const info = ((await TypesRoom.all()).toJSON())
        for (let i in info) {
          const temp = info[i].range
          for (let j in ingresate.range) {
            if ((temp.includes(ingresate.range[j]))) {
            } else {
              const creation = await TypesRoom.create(ingresate)
              return ({
                band: true,
                message: creation
              })
            }
          }
        }
      } else {
        const creation = await TypesRoom.create(ingresate)
        return ({
          band: true,
          message: creation
        })
      }
    }
    /*
    if (ingresate.count > date.countHabitations) {
      return {
        value: false,
        message: 'El numero de habitaciones ingresado supera la cantidad registrada'
      }
    } else {
      const countHabitations = (await TypesRoom.all()).toJSON()
      if (countHabitations.length > 0) {
        let allRoom = 0
        countHabitations.forEach(element => {
          allRoom += element.count
        })
        console.log(date.countHabitations - allRoom)
      } else {
        return (await TypesRoom.create({
          _idRoom: ingresate._idRoom,
          _idHotel: ingresate._idHotel,
          begin: 0,
          end: ingresate.count
        })) // si no hay ninguna habitacion se crea y ya
      }
    }*/
  }

  /**
   * Display a single typesroom.
   * GET typesrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const countHabitations = (await TypesRoom.where('_idHotel', infoHotel._id).with('typeRoom').fetch()).toJSON()
    countHabitations.forEach(element => {
      element.actions = [
        {
          color: "secondary",
          icon: "edit",
          title: "Editar",
          to: `countRoom/edit_countRoom/${element._id}`
        },
        {
          color: "primary",
          icon: "delete",
          title: "Eliminar",
          to: `${element._id}`
        },
      ]
    })
    response.send(countHabitations)
  }

  /**
   * Render a form to update an existing typesroom.
   * GET typesrooms/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async counterRoom({ params, request, response, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Hotel.where('email', getUserLog.email).first()).toJSON()
    const countHabitations = (await TypesRoom.where('_idHotel', infoHotel._id).fetch()).toJSON()
    let allRoom = []
    for (let i = 1; i <= infoHotel.countHabitations; i++) {
      allRoom.push(i)
    } // Todas las habitaciones del hotel
    if (countHabitations.length > 0) {
      for (let i in countHabitations) {
        const temp = countHabitations[i].range
        for (let j in temp) {
          const index = (allRoom.indexOf(temp[j]))
          allRoom.splice(index, 1)
        }
      }
    }
    if (allRoom.length > 0) {
      response.send({
        count: allRoom.length,
        message: 'Habitaciones sin asignar'
      })
    } else {
      response.send({
        count: 0,
        message: 'Asignación total'
      })
    }
    /*
    countHabitations.forEach(element => {
      allRoom += element.count
    })
    if ((infoHotel.countHabitations - allRoom) == 0) {
      response.send({
        count: 0,
        message: 'Asignacion Total'
      })
    } else {
      response.send({
        count: (infoHotel.countHabitations - allRoom),
        message: 'Habitaciones sin asignar'
      })
    }*/

  }

  /**
   * Update typesroom details.
   * PUT or PATCH typesrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a typesroom with id.
   * DELETE typesrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    response.send(await TypesRoom.where('_id', params.id).delete())
  }
}

module.exports = TypesRoomController
