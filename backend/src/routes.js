const express = require('express')
const connection = require('./database/connetions')
const OngController = require('./controllers/OngController')
const InsController = require('./controllers/InsidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')



const routes = express.Router()


routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs',OngController.create)

routes.post('/incidents', InsController.create)
routes.get('/incidents', InsController.index)
routes.delete('/incidents/:id', InsController.delete)

routes.get('/profile', ProfileController.index)

module.exports = routes