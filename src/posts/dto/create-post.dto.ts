import { IsInt, IsString } from 'class-validator'

export class CreatePostDTO {
  @IsString()
  readonly title: string

  @IsInt()
  readonly author: number

  @IsString()
  readonly content: string
}
