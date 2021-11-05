import request from 'supertest'
import { getConnection } from 'typeorm'
import  app  from '../app'
import  createConnection  from '../database/index'

describe('Campus', ()=>{
    beforeAll(async()=>{
        const connection = await createConnection()

        await connection.runMigrations()
    })

     afterAll(async()=>{
         const connection = getConnection()

         await connection.dropDatabase()

         await connection.close()

     })

    it('should be create a new campus', async()=>{
        const response = await request(app).post('/api/v1/campus/').send({
            name: 'Lijeirinho ariba'   
        })
        expect(response.status).toBe(201)
        
    })

})


