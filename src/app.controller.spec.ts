import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { PostsModule } from './posts/posts.module'
import { GraphQLModule } from '@nestjs/graphql'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mssql',
          host: 'ih-coeus',
          port: 1433,
          username: 'web',
          password: 'web',
          database: 'server_boilerplate',
          entities: [join(__dirname, '**/*.entity{.ts,.js}')],
          synchronize: true,
          cache: true,
        }),
        UsersModule,
        PostsModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
          installSubscriptionHandlers: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
