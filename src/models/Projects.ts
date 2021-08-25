import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Activities from './Activities';
import Proposals from './Proposals';

@Entity('projects', { schema: 'public' })
export default class Projects {
  @PrimaryGeneratedColumn("uuid")
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

  @OneToMany(() => Activities, activities => activities.project)
  activities: Activities[];

  @OneToMany(() => Proposals, proposals => proposals.project)
  proposals: Proposals[];
}
