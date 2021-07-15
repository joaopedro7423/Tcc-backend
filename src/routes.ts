import {Router, Request, Response} from 'express'
import {saveUser, listUser, login, updateUser, deletUser} from './controller/UserController'

import { auth } from './middleware/auth' 

const routes = Router()

routes.get('/', (request: Request, response: Response)=> {
    return response.json({message: 'Helo Back-End'})    
})

//rota para logar no sistema
routes.post('/session', login)

//USER
//rota para salvar o users
routes.post('/users', saveUser)

//tudo que estiver abaixo disso, precisa do token
//isso é para usar o middleware
routes.use(auth)

//atualizar o usuario
routes.put('/user/:id', updateUser)

//deletar usuario por id
routes.delete('/user/:id', deletUser)

//rota para listar todos os users
routes.get('/users', listUser)


export default routes
