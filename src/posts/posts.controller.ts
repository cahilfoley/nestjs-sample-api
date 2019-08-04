import { Controller, Delete, Get, Post, Param, Body } from '@nestjs/common'
import { Post as PostEntity } from './post.entity'
import { PostsService } from './posts.service'
import { ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { CreatePostInput } from './dto/create-post.input'

@ApiUseTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ title: 'Create post' })
  async create(@Body() post: CreatePostInput) {
    return await this.postsService.create(post)
  }

  @ApiOperation({ title: 'Delete post' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postsService.delete(id)
  }

  @ApiOperation({ title: 'Find post' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id)
  }

  @ApiOperation({ title: 'Find all posts' })
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return await this.postsService.findAll()
  }
}
