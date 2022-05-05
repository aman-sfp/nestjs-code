import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { Pagination } from './dto/pagination-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate, CandidateDocument } from './schema/candidate.schema';
import { Model } from 'mongoose';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) {}

  create(createCandidateInput: CreateCandidateInput): Promise<Candidate> {
    const createCandidate = new this.candidateModel({
      firstName: createCandidateInput.firstName,
      lastName: createCandidateInput.lastName,
      identityNumber: createCandidateInput.identityNumber,
      email: createCandidateInput.email,
      mobileNumber: createCandidateInput.mobileNumber,
      address: createCandidateInput.address,
      socialMediaLinks: createCandidateInput.socialMediaLinks,
    });
    return createCandidate.save();
  }

  async findAll(filter: Pagination) {
    let totalCount = await this.candidateModel.countDocuments();
    let skipData = filter.limit * (filter.page - 1);
    let candidate = await this.candidateModel
      .find()
      .limit(filter.limit)
      .skip(skipData);
    return { candidate, totalCount };
  }

  findOne(id: string) {
    return this.candidateModel.findById(id);
  }

  update(id: string, updateCandidateInput: UpdateCandidateInput) {
    return this.candidateModel.findByIdAndUpdate(id, updateCandidateInput, {
      returnDocument: 'after',
    });
  }

  remove(id: string) {
    return this.candidateModel
      .findByIdAndDelete(id)
      .then((res) => {
        if (res !== null) {
          return 'Candidate deleted successfully';
        }
        return "Candidate already removed or doesn't exists";
      })
      .catch((err) => {
        return 'Internal server error';
      });
  }

  removeMultiple(id: Array<string>) {
    return this.candidateModel
      .deleteMany({ _id: { $in: id } })
      .then((res) => {
        if (res.acknowledged) {
          return 'All candidates deleted successfully';
        }
        return "Candidates already removed or doesn't exists";
      })
      .catch((err) => {
        return 'Internal server error';
      });
  }
}
