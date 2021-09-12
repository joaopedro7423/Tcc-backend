import ICreateProposalsDTO from '../dtos/ICreateProposalsDTO';
import Proposal from '../models/Proposals';

export default interface IProposalsRepository {
  findAll(): Promise<Proposal[]>;
  findAllNullByRole(role: string): Promise<Proposal[] | undefined>;
  findAllNullById(id: string): Promise<Proposal[] | undefined>;
  findAllNullByRoleAndCourse(
    id: string,
    role: string,
    course: string,
  ): Promise<Proposal[] | undefined>;
  findById(id: string): Promise<Proposal | undefined>;
  create(createProposal: ICreateProposalsDTO): Promise<Proposal>;
  save(project: Proposal): Promise<Proposal>;
  delete(id: string): Promise<void>;
}
