import AppError from '../errors/AppError';

import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';
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
  }: IRequest): Promise<Proposal> {

    
    const userExist = await this.userRepository.findById(user_create_id);

    if (!userExist) {
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
