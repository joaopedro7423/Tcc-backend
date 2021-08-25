import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Notifications from './Notifications';
import Proposals from './Proposals';
import Courses from './Courses';

@Index('UQ_97672ac88f789774dd47f7c8be3', ['email'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('character varying', { name: 'role' })
  role: string;

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

  @OneToMany(() => Notifications, notifications => notifications.user)
  notifications: Notifications[];

  @OneToMany(() => Proposals, proposals => proposals.userAccept)
  proposals: Proposals[];

  @OneToMany(() => Proposals, proposals => proposals.userCreate)
  proposals2: Proposals[];

  @ManyToOne(() => Courses, courses => courses.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'course_id', referencedColumnName: 'id' }])
  course: Courses;
}
