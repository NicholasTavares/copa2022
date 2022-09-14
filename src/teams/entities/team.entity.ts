import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Group } from '../../groups/entities/group.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('teams')
@Unique(['country'])
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  coach: string;

  @Column()
  image: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({ type: 'int', default: 0 })
  wins: number;

  @Column({ type: 'int', default: 0 })
  draws: number;

  @Column({ type: 'int', default: 0 })
  losses: number;

  @OneToMany(() => Game, (game) => game.team_one_id, {
    cascade: true,
  })
  games_as_team_one: Game[];

  @OneToMany(() => Game, (game) => game.team_two_id, {
    cascade: true,
  })
  games_as_team_two: Game[];

  @ManyToOne(() => Group, (group) => group.teams, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group_id' })
  group_id: string;

  @OneToMany(() => Player, (player) => player.team_id, {
    cascade: true,
  })
  players: Player[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
