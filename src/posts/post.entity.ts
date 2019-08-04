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
import { ObjectType, ID, Field } from 'type-graphql'

@ObjectType()
@Entity()
export class Post {
  @Field(type => ID)
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @ApiModelProperty()
  @Column()
  title: string

  @Field(type => User)
  @ApiModelProperty()
  @ManyToOne(type => User, user => user.posts)
  author: User

  @Field({ nullable: true })
  @ApiModelProperty()
  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  content?: string

  @Field()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @UpdateDateColumn()
  updatedAt: Date
}
