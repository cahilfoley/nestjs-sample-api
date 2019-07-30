import { Controller, Delete, Get, Post, Param, Body } from '@nestjs/common'
import { Post as PostEntity } from './post.entity'
import { PostsService } from './posts.service'
import { ApiOperation, ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ title: 'Create post' })
  create(@Body() post: PostEntity) {
    this.postsService.create(post)
  }

  @ApiOperation({ title: 'Delete post' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id)
  }

  @ApiOperation({ title: 'Find post' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id)
  }

  @ApiOperation({ title: 'Find all posts' })
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll()
  }
}
