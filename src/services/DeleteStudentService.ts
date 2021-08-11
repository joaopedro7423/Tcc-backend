import { hash } from "bcrypt";
import AppError from "../errors/AppError";

import IStudentRepository from "../repositories/IStudentRepository";
import StudentRepository from "../repositories/StudentRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteStudentService {

    private studentRepository: IStudentRepository

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository

    }
    public async execute(id: string): Promise<void> {
        const userExist = await this.studentRepository.findById(id)

        if(!userExist){
            throw new AppError('Student dont exist', 401)
        }
        await this.studentRepository.delete(id)
    }
}