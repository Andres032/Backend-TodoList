import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../parametrization';

@Entity('Task')
export class Task extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  tittle: string;
  
  @Column({ type: String, nullable: false })
  description: string;
  
  @Column({ type: String, nullable: false })
  author: string;

  @Column({ type: Boolean, nullable: false, default: false })
  status: boolean;
};