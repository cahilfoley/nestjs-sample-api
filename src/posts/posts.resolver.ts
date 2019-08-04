import { ParseIntPipe, NotFoundException } from '@nestjs/common'
import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { Post } from './post.entity'
import { PostsService } from './posts.service'
import { CreatePostInput } from './dto/create-post.input'

const pubSub = new PubSub()

@Resolver(of => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(returns => Post)
  async post(@Args('id', ParseIntPipe) id: number): Promise<Post> {
    const post = await this.postsService.findOne(id)
    if (!post) {
      throw new NotFoundException(id)
    }
    return post
  }

  @Query(returns => [Post])
  async getPosts(): Promise<Post[]> {
    return await this.postsService.findAll()
  }

  @Mutation(returns => Post)
  async createPost(
    @Args('post') createPostInput: CreatePostInput,
  ): Promise<Post> {
    const user = await this.postsService.create(createPostInput)
    pubSub.publish('postAdded', { userAdded: user })
    return user
  }

  @Mutation(returns => Boolean)
  async removePost(@Args('id') id: number) {
    const result = await this.postsService.delete(id)
    return result.affected === 1
  }

  @Subscription(returns => Post)
  postAdded() {
    return pubSub.asyncIterator('postAdded')
  }
}
