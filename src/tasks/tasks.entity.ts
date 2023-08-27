import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  @Length(1, 120, { message: 'Content must be between 1 and 120 characters long.' })
  content: string;

  @Column()
  done: boolean;
}