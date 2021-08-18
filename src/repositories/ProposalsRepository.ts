import { getRepository, Repository } from 'typeorm';
import ICreateProposalsDTO from '../dtos/ICreateProposalsDTO';
import Proposal from '../models/Proposals';
import IProposalsRepository from './IProposalsRepository';

class ProposalsRepository implements IProposalsRepository {
  private ormRepository: Repository<Proposal>;

  constructor() {
    this.ormRepository = getRepository(Proposal);
  }

  public async findAll(): Promise<Proposal[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Proposal | undefined> {
    return this.ormRepository.findOne(id);
  }
  public async create({
    title,
    description,
    user_create_id,
  }: ICreateProposalsDTO): Promise<Proposal> {
    const proposal = this.ormRepository.create({
      title,
      description,
      user_create_id,
    });

    await this.ormRepository.save(proposal);
    return proposal;
  }

  public async save(proposal: Proposal): Promise<Proposal> {
    return this.ormRepository.save(proposal);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default ProposalsRepository;
