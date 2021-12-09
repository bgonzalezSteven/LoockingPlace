'use strict'

const Role = use('App/Models/Role')
class RolController {
  // Listado de ROles existentes
  async index({ request, response, view }) {
    const roleData = (await Role.all()).toJSON()
    roleData.forEach(element => {
      element.actions = [
        {
          color: "secondary",
          icon: "edit",
          title: "Editar",
          to: `rol/edit_rol/${element._id}`
        },
        {
          color: "primary",
          icon: "delete",
          title: "Eliminar",
          to: `${element._id}`
        }
      ]
    });
    response.send(roleData)
  }
  /**
   * Create/save a new hotel.
   * POST hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // Funcion de creacion de Roles
  async store({ request, response }) {
    const date = request.all()
    if (date._id) {
      response.send(await Role.where('_id', date._id).update(date))
    } else {
      // Primero se debe verificar que no exista algun slug similar ya que es quien da el acceso al sistema para evitar choques
      if (((await Role.where('slug', date.slug).fetch()).toJSON()).length > 0) {
        response.status(423).unprocessableEntity([{
          status: 423,
          message: 'Ya existe un Rol con ese Slug'
        }])
      } else {
        console.log('new')
        response.send(await Role.create(date))
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
  // Funcion que retorna todos los roles existentes dentro del sistema
  async show({ params, request, response, view }) {
    const info = (await Role.where('_id', params.id).fetch()).toJSON()
    for (let i in info) {
      info[i].permissions.forEach(permission => {
        permission.label = permission.name
        permission.value = { name: permission.name, slug: permission.slug}
      })
    }
    response.send(info[0])
  }
  // Funcion que retorna los slugs de los Roles para la creacion de Usuarios nuevos
  async details({ params, request, response, view }) {
    const info = (await Role.all()).toJSON()
    let datails = []
    info.forEach(element => {
      datails.push({label: element.name, value: element.slug})
    })
    response.send(datails)
  }
  // Funcion destrucción para un ROL
  async destroy ({ params, request, response }) {
    response.send(await Role.where('_id', params.id).delete())
  }
}

module.exports = RolController
