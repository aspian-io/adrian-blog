import { Schema, SchemaOptions } from 'mongoose';
import { UserDoc } from './auth-user.model';

/**
 * Base Schema Attributes Type
 */
export interface BaseAttrs {
  createdBy: string;
  createdByIp: string;
  updatedBy?: string;
  updatedByIp?: string;
  userAgent: string;
}

/**
 * Base Schema Document Type
 */
export interface BaseDoc {
  createdBy: UserDoc;
  createdByIp: string;
  updatedBy?: UserDoc;
  updatedByIp?: string;
  userAgent: string;
}

/**
 * Base Schema Options
 */
export const baseSchemaOptions: SchemaOptions | undefined = {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  },
  timestamps: true
};

/**
 * Base Schema
 */
export const baseSchema = new Schema( {
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdByIp: { type: String, required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedByIp: { type: String, required: false },
  userAgent: { type: String, required: true }
} );

// ----------------------------------------------------------

/**
 * Base Minimal Schema attributes type
 */
export interface BaseMinimalAttrs {
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

/**
 * Base Minimal Schema Document Type
 */
export interface BaseMinimalDoc {
  createdBy: UserDoc;
  createdByIp: string;
  userAgent: string;
}

/**
 * Base Minimal Schema
 */
export const baseMinimalSchema = new Schema( {
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdByIp: { type: String, required: true },
  userAgent: { type: String, required: true }
} );
