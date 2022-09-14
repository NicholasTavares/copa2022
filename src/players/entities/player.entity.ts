import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Goal } from '../../goals/entities/goal.entity';
import { Red_card } from '../../red_cards/entities/red_card.entity';
import { Yellow_card } from '../../yellow_cards/entities/yellow_card.entity.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  shirt: number;

  @ManyToOne(() => Team, (team) => team.players, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'team_id' })
  team_id: string;

  @OneToMany(() => Goal, (goal) => goal.player_id, {
    cascade: true,
  })
  goals: Goal[];

  @OneToMany(() => Red_card, (red_card) => red_card.player_id, {
    cascade: true,
  })
  red_cards: Red_card[];

  @OneToMany(() => Yellow_card, (yellow_card) => yellow_card.player_id, {
    cascade: true,
  })
  yellow_cards: Yellow_card[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
