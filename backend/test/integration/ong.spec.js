const req = require('Supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connetions')

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    }) 

    afterAll( async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () =>{
        const res = await req(app)
                    .post('/ongs')
                    .send({
                        nome     :"APAI2",
                        email    : "contato@APAI.com.br",
                        whatsapp : "4500000000",
                        city     : "Foz do Igucacu",
                        uf       : "PR"
        })
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toHaveLength(8)
    })

   

})