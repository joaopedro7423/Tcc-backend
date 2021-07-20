import IPaginated from "../interfaces/pagineted";
import User from "../models/Users";
import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  page: number;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class PaginatedUsersService {
  private userRepository: IUsersRepository;

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }
  public async execute({ page }: Request): Promise<IPaginated<User>> {
    const [user, total] = await this.userRepository.findAllPaginated(page * 10);

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<User> = {
      data: user,
      totalElementos: total,
      page,
      elements: user.length,
      elementsPerPage: 10,
      totalPages,
      fistPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}
