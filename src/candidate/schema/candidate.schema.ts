import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema({
  timestamps: true,
})
export class Candidate {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true, unique: true })
  identityNumber: string;

  @Prop(
    raw({
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, default: null },
      country: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    }),
  )
  address: Record<string, any>;

  @Prop(
    raw({
      linkedIn: { type: String, default: null },
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
    }),
  )
  socialMediaLinks: Record<string, any>;

  @Prop({ default: Date.now() })
  isActive: Date;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
