import { NotFoundException, ParseIntPipe } from '@nestjs/common'
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'

const pubSub = new PubSub()

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @Query(returns => [User])
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Mutation(returns => User)
  async createUser(
    @Args('user') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(createUserInput)
    pubSub.publish('userAdded', { userAdded: user })
    return user
  }

  @Mutation(returns => Boolean)
  async removeUser(@Args('id') id: number) {
    const result = await this.usersService.delete(id)
    return result.affected === 1
  }

  @Subscription(returns => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded')
  }
}
