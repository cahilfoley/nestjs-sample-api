import { IsInt, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { ApiModelProperty } from '@nestjs/swagger'

@InputType()
export class CreatePostInput {
  @Field()
  @ApiModelProperty()
  @IsString()
  readonly title: string

  @Field()
  @ApiModelProperty()
  @IsInt()
  readonly author: number

  @Field()
  @ApiModelProperty()
  @IsString()
  readonly content: string
}
