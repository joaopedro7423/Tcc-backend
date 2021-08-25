import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Projects from './Projects';

@Entity('activities', { schema: 'public' })
export default class Activities {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('character varying', { name: 'status' })
  status: string;

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

  @ManyToOne(() => Projects, projects => projects.activities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  project: Projects;
}
