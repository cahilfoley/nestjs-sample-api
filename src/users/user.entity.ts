import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Post } from '../posts/post.entity'
import { ApiModelProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiModelProperty()
  @Column()
  name: string

  @ApiModelProperty()
  @Column()
  email: string

  @ApiModelProperty()
  @Column()
  title: string

  @ApiModelProperty()
  @OneToMany(type => Post, post => post.author)
  posts: Post[]
}
