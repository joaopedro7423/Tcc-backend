import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";
import Notifications from '../models/Notifications';

export default interface INotificationRepository {
  //findByEmail(email: string): Promise<Notifications | undefined>;
  findById(id: string): Promise<Notifications | undefined>;
  findAll(): Promise<Notifications[]>;
 // findAllByName(name: string): Promise<Notifications[]>;
  //findAllPaginated(page: number): Promise<[Notifications[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(createNotificationDTO: ICreateNotificationDTO): Promise<Notifications>;
  save(Notifications: Notifications): Promise<Notifications>;
  delete(id: string): Promise<void>;

}
