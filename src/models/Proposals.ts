import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Projects from './Projects';
import Users from './Users';

@Entity('proposals', { schema: 'public' })
export default class Proposals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp without time zone', {
    name: 'create_at',
    default: () => 'now()',
  })
  createAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @ManyToOne(() => Projects, projects => projects.proposals, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  project: Projects;

  @ManyToOne(() => Users, users => users.proposals, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_accept_id', referencedColumnName: 'id' }])
  userAccept: Users;

  @ManyToOne(() => Users, users => users.proposals2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_create_id', referencedColumnName: 'id' }])
  userCreate: Users;

}
