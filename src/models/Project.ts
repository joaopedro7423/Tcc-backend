import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ProjectStatus from "../enums/projectStatus";
import Student from "./Student";
import User from "./Users";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: string;


  @Column()
  student_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'student_id'})
  student: Student;


  @Column({
    type: "varchar",
  })
  status: ProjectStatus;

  @Column()
  logo: string;

  @Column()
  description: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
