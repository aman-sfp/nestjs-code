import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class Pagination {
  @Field(() => Int, { nullable: true, description: 'limit' })
  @IsOptional()
  limit: number;

  @Field(() => Int, { nullable: true, description: 'page' })
  @IsOptional()
  page: number;
}
