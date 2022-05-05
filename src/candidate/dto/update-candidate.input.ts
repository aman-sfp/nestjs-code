import { CreateCandidateInput } from './create-candidate.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateCandidateInput extends PartialType(CreateCandidateInput) {
  @Field(() => String)
  @IsMongoId()
  id: string;
}
