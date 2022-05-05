import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate, CandidateAll } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { Pagination } from './dto/pagination-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}

  @Mutation(() => Candidate)
  createCandidate(
    @Args('createCandidateInput', ValidationPipe)
    createCandidateInput: CreateCandidateInput,
  ) {
    return this.candidateService.create(createCandidateInput);
  }

  @Query(() => CandidateAll)
  findAllCandidate(
    @Args('filter', ValidationPipe)
    filter: Pagination,
  ) {
    return this.candidateService.findAll(filter);
  }

  @Query(() => Candidate)
  findCandidate(@Args('id', { type: () => String }) id: string) {
    return this.candidateService.findOne(id);
  }

  @Mutation(() => Candidate)
  updateCandidate(
    @Args('updateCandidateInput', ValidationPipe)
    updateCandidateInput: UpdateCandidateInput,
  ) {
    return this.candidateService.update(
      updateCandidateInput.id,
      updateCandidateInput,
    );
  }

  @Mutation(() => String)
  removeCandidate(@Args('id', { type: () => String }) id: string) {
    return this.candidateService.remove(id);
  }

  @Mutation(() => String)
  removeMultipleCandidate(
    @Args('id', { type: () => [String] }) id: Array<string>,
  ) {
    return this.candidateService.removeMultiple(id);
  }
}
