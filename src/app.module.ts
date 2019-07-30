import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { join } from 'path'
import { PostsModule } from './posts/posts.module'

@Module({
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
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
