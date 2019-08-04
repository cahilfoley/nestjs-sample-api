import { IsEmail, IsString, IsOptional } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

@InputType()
export class CreateUserInput {
  @Field()
  @ApiModelProperty()
  @IsString()
  name: string

  @Field()
  @ApiModelProperty()
  @IsEmail()
  email: string

  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string
}
