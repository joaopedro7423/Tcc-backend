import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import User from "../models/Users"
import UsersRepository from "../repositories/UsersRepository";
import CreateUsersService from "../services/CreateUsersService";
import SessionUsersService from "../services/SessionServicec";


export default class SessionController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body

        const userRepository = new UsersRepository()
        const createSession = new SessionUsersService(userRepository)

        const session = await createSession.execute({
            email,
            password
        })

        return res.json(session)
    }

}










/*
//Logar no sistema
export const login = async (req: Request, res: Response) => {


    //      variaveis que vamos receber na requisição
    const { email, password } = req.body

    const user = await getRepository(User).find({
        where: {
            email
        }
    })

    //resultado vem em forma de array, ou seja se tiver 1 é pq encontrou
    if (user.length === 1) {

        if (await bcrypt.compare(password, user[0].password)) {

            const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
                expiresIn: '1d' //tempo que o token expira
            })

            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                role: user[0].role,
                token
            }

            return res.json(data)
        } else {
            return res.status(404).json({ message: 'Password not found' })
        }

    } else {
        return res.status(404).json({ message: 'User not found' })
    }

}


//listar todos os usuários
export const listUser = async (req: Request, res: Response) => {

    const users = await getRepository(User).find()

    return res.json(users)
}

//Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params

    const { name, email, password, role } = req.body

    const passwordHash = await bcrypt.hash(password, 8)


    const user = await getRepository(User).update(id, {
        name,
        email,
        password: passwordHash,
        role
    })

    if (user.affected === 1) {
        const userUpadate = await getRepository(User).findOne(id)
        return res.json(userUpadate)
    }


    res.status(404).json({ message: 'User not found!' })
}

//salvar usuario
export const saveUser = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body

    const passwordHash = await bcrypt.hash(password, 8)

    const user = await getRepository(User).save({
        name,
        email,
        password: passwordHash,
        role
    })
    return res.json(user)
}

//Deletar Usuário
export const deletUser = async (req: Request, res: Response) => {

    const { id } = req.params

    const user = await getRepository(User).delete(id)

    if (user.affected === 1) {
        const userUpadate = await getRepository(User).findOne(id)
        return res.json({ message: 'User removed!' })
    }

    res.status(404).json({ message: 'User not found!' })
}*/