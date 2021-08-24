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
import User from "./Users";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
