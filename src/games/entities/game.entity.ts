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

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  judge: string;

  @ManyToOne(() => Team, (team) => team.games_as_team_one, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'team_one_id' })
  team_one_id: string;

  @ManyToOne(() => Team, (team) => team.games_as_team_two, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'team_two_id' })
  team_two_id: string;

  @OneToMany(() => Goal, (goal) => goal.game_id, {
    cascade: true,
  })
  goals: Goal[];

  @OneToMany(() => Red_card, (red_card) => red_card.game_id, {
    cascade: true,
  })
  red_cards: Red_card[];

  @OneToMany(() => Yellow_card, (yellow_card) => yellow_card.game_id, {
    cascade: true,
  })
  yellow_cards: Yellow_card[];

  @Column({ type: 'date' })
  game_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
