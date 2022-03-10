import { PasswordUtil } from 'infrastructure/security/password-util';
import mongoose, { Schema } from 'mongoose';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export enum GenderEnum {
  FEMALE = "FEMALE",
  MALE = "MALE"
}

export interface UserAttrs {
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  gender?: GenderEnum;
  birthDate?: Date;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  mobilePhone?: string;
  isMobilePhoneVerified?: Boolean;
  phone?: string;
  avatar?: string;
  job?: string;
  email: string;
  isEmailConfirmed?: boolean;
  password: string;
  isSuspended?: boolean;
  createdByIp: string;
  lastIp: string;
  claims?: AccessPoliciesEnum[];
  updatedBy?: string;
  updatedByIp?: string;
  userAgent: string;
}

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  gender?: GenderEnum;
  birthDate?: Date;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  mobilePhone?: string;
  isMobilePhoneVerified?: Boolean;
  phone?: string;
  avatar?: string;
  job?: string;
  email: string;
  isEmailConfirmed?: boolean;
  password: string;
  isSuspended: boolean;
  createdByIp: string;
  lastIp: string;
  claims: AccessPoliciesEnum[];
  updatedBy?: UserDoc;
  updatedByIp?: string;
  userAgent: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build ( attrs: UserAttrs ): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>( {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  displayName: { type: String, required: false },
  bio: { type: String, required: false },
  gender: { type: String, required: false, enum: Object.values( GenderEnum ) },
  birthDate: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  address: { type: String, required: false },
  postalCode: { type: String, required: false },
  mobilePhone: { type: String, required: false },
  isMobilePhoneVerified: { type: Boolean, default: false },
  phone: { type: String, required: false },
  avatar: { type: String, required: false },
  job: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  isEmailConfirmed: { type: Boolean, default: false },
  password: { type: String, required: true },
  isSuspended: { type: Boolean, default: false },
  createdByIp: { type: String, required: true },
  lastIp: { type: String, required: true },
  claims: [
    {
      type: String,
      enum: Object.values( AccessPoliciesEnum ),
    }
  ],
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedByIp: { type: String, required: false },
  userAgent: { type: String, required: true }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false,
  },
  timestamps: true
} );

userSchema.pre( 'save', async function ( done ) {
  if ( this.isModified( 'password' ) ) {
    const hashed = await PasswordUtil.hash( this.get( 'password' ) );
    this.set( 'password', hashed );
  }
  done();
} );

userSchema.statics.build = ( attrs: UserAttrs ) => {
  return new User( attrs );
};

const User = mongoose.model<UserDoc, UserModel>( 'User', userSchema );

export { User };