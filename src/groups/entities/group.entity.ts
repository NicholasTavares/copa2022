import { Team } from '../../teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('groups')
@Unique(['name'])
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  })
  name: string;

  @OneToMany(() => Team, (team) => team.group_id, {
    cascade: true,
  })
  teams: Team[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
