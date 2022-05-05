import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
class SocialMedia {
  @Field(() => String, { nullable: true, description: 'LindedIn Profile Url' })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @Field(() => String, { nullable: true, description: 'FaceBook Profile Url' })
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @Field(() => String, { nullable: true, description: 'Twitter Profile Url' })
  @IsOptional()
  @IsUrl()
  twitter?: string;
}

@InputType()
class Address {
  @Field(() => String, { description: 'Address Line 1' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  addressLine1: string;

  @Field(() => String, { nullable: true, description: 'Address Line 2' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  addressLine2?: string;

  @Field(() => String, { description: 'Country' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  country: string;

  @Field(() => String, { description: 'City' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  city: string;

  @Field(() => String, { description: 'Province' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  province: string;

  @Field(() => Int, { description: 'Postal Code' })
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;
}

@InputType()
export class CreateCandidateInput {
  @Field(() => String, { description: 'First Name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @Field(() => String, { description: 'Last Name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @Field(() => String, { description: 'Email' })
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Mobile Number' })
  @IsMobilePhone()
  mobileNumber: string;

  @Field(() => String, { description: 'Identity Number' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(13)
  @MaxLength(13)
  identityNumber: string;

  @Field(() => Address, { description: 'Address Details' })
  @IsObject()
  address: object;

  @Field(() => SocialMedia, {
    nullable: true,
    description: 'Social Media links details',
  })
  @IsObject()
  @IsOptional()
  socialMediaLinks?: object;
}
