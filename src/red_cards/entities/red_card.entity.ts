import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { Player } from '../../players/entities/player.entity';

@Entity('red_cards')
export class Red_card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  at: number;

  @ManyToOne(() => Game, (game) => game.red_cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'game_id' })
  game_id: string;

  @ManyToOne(() => Player, (player) => player.red_cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'player_id' })
  player_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
