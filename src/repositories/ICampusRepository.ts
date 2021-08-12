import CreateUsersDTO from "../dtos/CreateUsersDTO";
import Campus from "../models/Campus";

export default interface ICampusRepository {
  findById(id: string): Promise<Campus | undefined>;
  findAll(): Promise<Campus[]>;
  findOneByName(name: string): Promise<Campus | undefined>;
  findAllPaginated(page: number): Promise<[Campus[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(name: string): Promise<Campus>;
  save(campus: Campus): Promise<Campus>;
  delete(id: string): Promise<void>;

}
