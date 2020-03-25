const connection = require('../database/connetions')


module.exports= {
    async create(req,res){
        const {id} = req.body;
        const ong = await connection('ongs')
        .where("id",id)
        .select('nome')
        .first()

        if(!ong){
            return res.status(400).json({erro : "ONG não existente"})
        }

        return res.json(ong);
    }
}