import { Test, TestingModule } from '@nestjs/testing'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'

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

describe('UsersResolver', () => {
  let resolver: UsersResolver
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
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [sampleUser]
      jest.spyOn(service, 'findAll').mockImplementation(async () => result)

      expect(await service.findAll()).toBe(result)
    })
  })
})
