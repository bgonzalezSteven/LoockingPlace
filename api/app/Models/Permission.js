'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
  static hidden = ['created_at', 'updated_at', '_id']
}

module.exports = Permission
