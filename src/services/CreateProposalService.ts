import AppError from '../errors/AppError';
import  Proposals  from '../models/Proposals';

import IProposalsRepository from '../repositories/IProposalsRepository';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  title: string;
  user_create_id: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateProposalService {
  private ProposalRepository: IProposalsRepository;

  private userRepository: UsersRepository;

  constructor(
    ProposalRepository: IProposalsRepository,
    userRepository: UsersRepository,
  ) {
    this.ProposalRepository = ProposalRepository;
    this.userRepository = userRepository;
  }
  public async execute({
    title,
    user_create_id,
    description,
  }: IRequest): Promise<Proposals> {

    
    const user = await this.userRepository.findById(user_create_id);

    if (!user) {
      throw new AppError('User not found!', 400);
    }
    
    const project = await this.ProposalRepository.create({
      title,
      user_create_id,
      description,
    });

    return project;
  }
}
