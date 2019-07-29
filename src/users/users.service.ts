import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: User) {
    return this.userRepository.insert(user)
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
