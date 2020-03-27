const knex = require('knex')
const config = require('../../knexfile')


//testa qual hambiente(teste ou desenvolvimento) deve utilizar
const env = process.env.NODE_ENV === 'test' ? config.test : config.development

const connection = knex(env)

module.exports = connection