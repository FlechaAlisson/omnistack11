const express = require('express')
const { celebrate, Segments, Joi } =  require('celebrate')

const connection = require('./database/connetions')
const OngController = require('./controllers/OngController')
const InsController = require('./controllers/InsidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')



const routes = express.Router()


routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs',celebrate({
    [Segments.BODY] : Joi.object().keys({
        nome    : Joi.string().required().min(3).max(9),
        email   : Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city    : Joi.string().required(),
        uf      : Joi.string().required().length(2)
    })
}) ,OngController.create)

routes.post('/incidents', InsController.create)

routes.get('/incidents',celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number()
    })
}), InsController.index)


routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    })
}), InsController.delete)

routes.get('/profile',celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization : Joi.string().required()
    }).unknown()
}), ProfileController.index)

module.exports = routes