import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

import { FavoriteType } from './FavoriteType'
import { User } from './User'

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User

  @Column()
  marvel_id: string;

  @Column({
    type: 'enum',
    enum: FavoriteType,
    default: FavoriteType.CHARACTER
  })
  favorite_type: string;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateDateUpdate () {
    this.updated_at = new Date()
  }
}
