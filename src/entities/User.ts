import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { hash } from 'bcryptjs'

import { Favorite } from './Favorite'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async generatePasswordHash (): Promise<void> {
    this.password = await hash(this.password, 8)
  }

  @BeforeUpdate()
  updateDateUpdate () {
    this.updated_at = new Date()
  }
}

export { User }
