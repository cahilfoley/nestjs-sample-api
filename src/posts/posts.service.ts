import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreatePostDTO } from './dto/create-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async create(createPostDTO: CreatePostDTO) {
    const post = new Post()

    post.title = createPostDTO.title
    post.content = createPostDTO.content
    post.author = await this.usersService.findOne(createPostDTO.author)

    return await this.postRepository.save(post)
  }

  patch(id: number, update: Partial<Post>) {
    return this.postRepository.update(id, update)
  }

  delete(id: number) {
    return this.postRepository.delete({ id })
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id)
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }
}
