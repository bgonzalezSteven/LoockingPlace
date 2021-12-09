'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use("App/Models/User")
const users = [
  {
    _id: '5e6bd7c1f587103b1609e84a',
    email: 'admin@example.com',
    password: 'admin',
    darkMode: false,
    roles: [
      {
        slug: 'app.everyAll',
      }
    ]
  }
]

class UserSeeder {
  async run() {
    for (let i in users) {
      let record = await User.findBy('_id', users[i]._id)
      if (!record) {
        await User.create(users[i])
      } else {
        record.email = users[i].email
        record.password = users[i].password
        record.roles = users[i].roles
        record.darkMode = users[i].darkMode
        await record.save()
      }
    }
    console.log('Finished User')
  }
}

module.exports = UserSeeder
