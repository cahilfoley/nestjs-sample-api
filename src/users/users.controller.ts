import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ title: 'Create user' })
  create(@Body() user: CreateUserInput) {
    this.usersService.create(user)
  }

  @ApiOperation({ title: 'Update user' })
  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() update: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, update)
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
