import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(post: Post) {
    return this.postRepository.insert(post)
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
