import { Request, Response, NexFunction } from 'express'
import * as jwt from 'jsonwebtoken'


//midleware, só poderá acessar as rotas se o token for enviado no cabeçalho
export const auth = async (req: Request, res: Response, next: NexFunction)=>{

    const authHeader = req.headers.authorization
    
    if(!authHeader){
        return res.status(401).json({message: 'Token is required!'})
    }

    //Emana o Bearer e o token, o split devolve o token
    const [, token] = authHeader.split(' ')

    try{

        await jwt.verify(token, process.env.APP_SECRET)
        next()
    }catch(error){
        return res.status(401).json({message: 'Token invalid or expired!'})
    }
}
