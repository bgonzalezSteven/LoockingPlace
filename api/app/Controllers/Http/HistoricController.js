'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Historic = use('App/Models/Historic')
const Paypament = use('App/Models/Paypament')
const moment = use('moment');

/**
 * Resourceful controller for interacting with historics
 */
class HistoricController {
  /**
   * Show a list of all historics.
   * GET historics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, params }) {
    let information = []
    const info = await request.all()
    const dates = (await Historic.with('reservation').where({
      date: {
        $gte: new Date(info.entryDate),
        $lte: new Date(info.exitDate)
      }
    }).fetch()).toJSON()
    if (dates) {
      for (let i in dates) {
        const temp = dates[i].reservation
        if (temp.length > 0) {
          for (let j in temp) {
            information.push({ rangeDate: `${moment(temp[j].entryDate).format('YYYY-MM-DD')} / ${moment(temp[j].exitDate).format('YYYY-MM-DD')}`, coste: temp[j].paypament.coste, ref: `${temp[j].paypament.ref ? temp[j].paypament.ref : 'N/R'}`, date: moment(dates[i].date).format('YYYY-MM-DD'), methods: (await Paypament.where('_id', temp[j].paypament.methods).first()).type })
          }
        }
      }
    }
    response.send(information)
  }

  /**
   * Render a form to be used for creating a new historic.
   * GET historics/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new historic.
   * POST historics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single historic.
   * GET historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing historic.
   * GET historics/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update historic details.
   * PUT or PATCH historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a historic with id.
   * DELETE historics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = HistoricController
