import mongoose from 'mongoose';
import { AccessPoliciesEnum } from '../../infrastructure/security/access-policies.enum';
import { baseSchemaOptions } from '../base/base.model';
import { UserDoc } from './auth-user.model';

export interface ClaimAttrs {
  claim: AccessPoliciesEnum;
  description: string;
  localizedDescKey: string;
}

interface ClaimModel extends mongoose.Model<ClaimDoc> {
  build ( attrs: ClaimAttrs ): ClaimDoc;
}

export interface ClaimDoc extends mongoose.Document {
  claim: AccessPoliciesEnum;
  description: string;
  localizedDescKey: string;
}

const claimSchema = new mongoose.Schema<ClaimDoc, ClaimModel>( {
  claim: { type: String, required: true, enum: Object.values( AccessPoliciesEnum ) },
  description: { type: String, required: true },
  localizedDescKey: { type: String, required: true }
}, baseSchemaOptions );

claimSchema.statics.build = ( attrs: ClaimAttrs ) => {
  return new Claim( attrs );
};

const Claim = mongoose.model<ClaimDoc, ClaimModel>( 'Claim', claimSchema );

export { Claim };