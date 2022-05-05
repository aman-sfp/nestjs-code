import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class AddressObj {
  @Field(() => String, { description: 'Address Line 1' })
  addressLine1: string;

  @Field(() => String, { nullable: true, description: 'Address line 2' })
  addressLine2: string;

  @Field(() => String, { description: 'Country' })
  country: string;

  @Field(() => String, { description: 'City' })
  city: string;

  @Field(() => String, { description: 'Province' })
  province: string;

  @Field(() => String, { description: 'Postal code' })
  postalCode: string;
}

@ObjectType()
class SocialLinksObj {
  @Field(() => String, { nullable: true, description: 'LinkedIn' })
  linkedIn: string;

  @Field(() => String, { nullable: true, description: 'Facebook' })
  facebook: string;

  @Field(() => String, { nullable: true, description: 'Twitter' })
  twitter: string;
}

@ObjectType()
export class Candidate {
  @Field(() => String, { description: 'Id of the candidate' })
  _id: string;

  @Field(() => String, { description: 'First Name' })
  firstName: string;

  @Field(() => String, { description: 'Last Name' })
  lastName: string;

  @Field(() => String, { description: 'Email' })
  email: string;

  @Field(() => String, { description: 'Mobile Number' })
  mobileNumber: string;

  @Field(() => String, { description: 'Identity Number' })
  identityNumber: string;

  @Field(() => AddressObj, { description: 'Address' })
  address: object;

  @Field(() => SocialLinksObj, {
    nullable: true,
    description: 'Social Media Links',
  })
  socialMediaLinks: object;

  @Field(() => Date, { description: 'isActive' })
  isActive: Date;
}

@ObjectType()
export class CandidateAll {
  @Field(() => [Candidate], { description: 'Candidate' })
  candidate: Array<Candidate>;

  @Field(() => Int, { description: 'Candidate' })
  totalCount: number;
}
