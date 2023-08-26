import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  done: boolean;
}