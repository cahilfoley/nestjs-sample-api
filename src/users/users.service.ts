import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getCount(): Promise<number> {
    return await this.userRepository.count()
  }

  async create(user: CreateUserInput) {
    const newUser = this.userRepository.create(user)
    return await this.userRepository.save(newUser)
  }

  async update(id: number, update: Partial<User>) {
    const user = await this.userRepository.findOne(id)
    const updatedUser = this.userRepository.merge(user, update)
    return await this.userRepository.save(updatedUser)
  }

  async delete(id: number) {
    return await this.userRepository.delete({ id })
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
