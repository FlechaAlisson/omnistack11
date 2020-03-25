const crypto = require('crypto')
const connection = require('../database/connetions')

module.exports= {

    async index(req,res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res){
    const {nome, email, whatsapp, city, uf} = req.body;
    const id = crypto.randomBytes(4).toString('HEX')


    console.log(id)
    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade: city,
        uf
    })
   
   
    return res.json({id})
    }
}