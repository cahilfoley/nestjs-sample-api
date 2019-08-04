import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from '../posts/post.entity'
import { ApiModelProperty } from '@nestjs/swagger'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @ApiModelProperty()
  @Column()
  name: string

  @Field()
  @ApiModelProperty()
  @Column()
  email: string

  @Field()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  @UpdateDateColumn()
  updatedAt: Date

  @Field({ nullable: true })
  @ApiModelProperty()
  @Column()
  title?: string

  @OneToMany(type => Post, post => post.author)
  posts?: Post[]
}
