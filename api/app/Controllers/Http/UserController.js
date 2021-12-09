'use strict'

const User = use("App/Models/User")
const Role = use("App/Models/Role")


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async info ({ request, response, params, auth }) {
    let user = await auth.getUser()
    let userData = (await User.findBy('email', user.email)).toJSON()
    let roleIds =
    userData.roles.length > 0
      ? userData.roles.map(roleMap => {
        return roleMap.slug
      })
      : []
    const name = (await Role.whereIn('slug', roleIds).fetch()).toJSON()
    user.name = name[0].name
    response.send(user)
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(request.all(), User.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let body = request.only(User.fillable)
      let plan = ((await Plan.find(body.plan._id)).toJSON()).planType.value
      console.log(plan)
      body.roles = plan === 'broker' ? [{slug: 'app.broker'}] : [{slug: 'app.agency'}]
      const user = await User.create(body)
      // const user = body
      // Email.sendMail(body.email, 'Bienvenido a hevent', 'A partir de Ahora Formas Parte De Nuestra Plataforma')
      // const user = body
      response.send(user)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let body = request.all()
    response.send(await User.where('_id', body._id).update({
      'darkMode': !body.darkMode
    }))
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async login ({ auth, request }) {
    /* const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    let roles = (await User.findBy('email', email)).roles
    token.roles = roles.map(roleMap => {
      return roleMap.slug
    })

    let userRoles = await Role.whereIn('slug', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2.slug)
      })
    })

    return token */

    const { email, password } = request.all();
    let usr = await auth.attempt(email, password)

    let userData = (await User.findBy('email', email)).toJSON()
    usr.email = userData.email
    let roleIds =
      userData.roles.length > 0
        ? userData.roles.map(roleMap => {
          return roleMap.slug
        })
        : []
    const name = (await Role.whereIn('slug', roleIds).fetch()).toJSON()
    let userRoles = (await Role.whereIn('slug', roleIds).fetch()).toJSON()
    usr.roles = userData.roles.map(roleMap => {
      return roleMap.slug
    })
    let permissions = []
    userRoles.forEach(element => {
      element.permissions.forEach(element2 => {
        permissions.push(element2.slug)
      })
    })
    usr.name = name[0].name
    usr.permissions = permissions
    return usr
  }

  async getPlanInfo ({ auth, request, response }) {
  }
}

module.exports = UserController
