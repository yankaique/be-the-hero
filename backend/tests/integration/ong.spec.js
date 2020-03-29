const request = require('supertest');
const app = require('../../app');
const connection = require('../../src/database/connection');

describe('ONG',()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async()=>{
        await connection.destroy();
    });

    it('should be able to create a new ONG',async ()=>{
        const response = await request(app)
        .post('/ongs')
        // .set('Authorization','id')
        .send({
            name:"APAE",
            email:"contato@contato.com",
            whatsapp:"1231058251",
            city: "Rio do Sul",
            uf: "SP"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});