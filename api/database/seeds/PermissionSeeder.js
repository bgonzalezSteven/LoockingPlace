'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Permission = use("App/Models/Permission")
const roleData = [
  {
    slug: 'configuration',
    name: 'Item de menu para las Configuraciones',
  },
  {
    slug: 'configuration.habitations',
    name: 'Habitaciones',
  },
  {
    slug: 'configuration.reserves',
    name: 'Reservas',
  },
  {
    slug: 'configuration.hotels',
    name: 'Hoteles',
  },
  {
    slug: 'configuration.paypament',
    name: 'Metodos de Pago',
  },
  {
    slug: 'reservation',
    name: 'Item de Menu para las resevaciones',
  },
  {
    slug: 'reservation.list',
    name: 'Reservas',
  },
  {
    slug: 'reservation.client',
    name: 'Clientes',
  }
]
class PermissionSeeder {
  async run() {
    for (let i in roleData) {
      let role = await Permission.findBy('slug', roleData[i].slug)
      if (!role) {
        await Permission.create(roleData[i])
      } else {
        role.name = roleData[i].name
        role.slug = roleData[i].slug
        await role.save()
      }
    }
    console.log('Finished Role')
  }
}

module.exports = PermissionSeeder
