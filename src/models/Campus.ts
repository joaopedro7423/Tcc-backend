import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Courses  from "./Courses";

@Entity("campus", { schema: "public" })
export default class Campus {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("timestamp without time zone", {
    name: "create_at",
    default: () => "now()",
  })
  createAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Courses, (courses) => courses.campus)
  courses: Courses[];
}
