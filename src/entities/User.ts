/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn
} from 'typeorm'
import { hash } from 'bcrypt'

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
