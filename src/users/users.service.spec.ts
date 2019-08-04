import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'

const userRepoToken = getRepositoryToken(User)
const userMockRepo = jest.mock('./user.entity')

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: userRepoToken,
          useValue: userMockRepo,
        },
        UsersService,
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
