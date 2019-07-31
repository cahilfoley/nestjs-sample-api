import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ title: 'Create user' })
  create(@Body() user: User) {
    this.usersService.create(user)
  }

  @ApiOperation({ title: 'Delete user' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id)
  }

  @ApiOperation({ title: 'Find user' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @ApiOperation({ title: 'Find all users' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }
}