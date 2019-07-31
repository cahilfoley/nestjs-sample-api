import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from '../users/user.entity'
import { ApiModelProperty } from '@nestjs/swagger'

@Entity()
export class Post {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiModelProperty()
  @Column()
  title: string

  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @CreateDateColumn()
  createdAt: Date

  @ApiModelProperty()
  @ManyToOne(type => User, user => user.posts)
  author: User

  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @UpdateDateColumn()
  updatedAt: Date

  @ApiModelProperty()
  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  content?: string
}
