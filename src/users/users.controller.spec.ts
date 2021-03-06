import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

const userRepoToken = getRepositoryToken(User)
const userMockRepo = jest.mock('./user.entity')
const sampleUser = {
  id: 1,
  createdAt: new Date(),
  email: 'testy@mctest.test',
  name: 'Testy McTester',
  title: 'Expert Test Dummy',
  updatedAt: new Date(),
}

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: userRepoToken,
          useValue: userMockRepo,
        },
        UsersService,
        UsersResolver,
      ],
      controllers: [UsersController],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [sampleUser]
      jest.spyOn(service, 'findAll').mockImplementation(async () => result)

      expect(await controller.findAll()).toBe(result)
    })
  })
})
