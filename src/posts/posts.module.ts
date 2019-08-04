import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { UsersModule } from '../users/users.module'
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  providers: [PostsService, PostsResolver],
  controllers: [PostsController],
})
export class PostsModule {}
