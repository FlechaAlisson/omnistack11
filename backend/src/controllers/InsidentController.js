const connection = require('../database/connetions')


module.exports= {
    async create(req, res){
        const {title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({id});
    },
    async index(req, res){
        const{page = 1} = req.query;

        const [count] = await connection('incidents').count()


        const inc = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)  //pega os 5
        .offset((page - 1) * 5) // pula uns registros ai
        .select(['incidents.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf'])

        res.header('X-Total-Count', count['count(*)'])
        res.json(inc)
    },
    async delete(req,res){
        const {id} = req.params
        const ong_id = req.headers.authorization;
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first() //so retorna o primeiro registro

        
        
        if(ong_id !== incident.ong_id){
            console.log(incident)
            console.log(ong_id)
            return res.status(401).json({error: "Operação não autorizada"})
        }    

        await connection('incidents').where('id',id).delete();

        return res.status(204).send()
        
    }
}