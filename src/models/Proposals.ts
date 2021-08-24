import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './Users';

@Entity('proposals')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_create_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_create_id' })
  user_create: User;

  @Column()
  user_accept_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_accept_id' })
  user_accept: User;

  
  @Column()
  project_id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
