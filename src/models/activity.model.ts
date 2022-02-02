import { Schema, Model, model, Types, Document } from 'mongoose';

export interface ActivityAttrs {
  level: string;
  method: string;
  url: string;
  status: number;
  responseTime?: number;
  userId?: string;
  userEmail?: string;
  userAgent?: string;
  message?: string;
  localizedMsgKey?: string;
  name?: string;
}

interface ActivityDoc extends Document {
  level: string;
  method: string;
  url: string;
  status: number;
  responseTime?: number;
  userId?: Types.ObjectId;
  userEmail?: string;
  userAgent?: string;
  message?: string;
  localizedMsgKey?: string;
  name?: string;
}

interface ActivityModel extends Model<ActivityDoc> {
  build ( attrs: ActivityAttrs ): ActivityDoc;
}

const activitySchema = new Schema<ActivityDoc, ActivityModel>( {
  level: { type: String, required: true },
  method: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: Number, required: true },
  responseTime: { type: Number, required: false },
  userId: { type: Schema.Types.ObjectId, required: false },
  userEmail: { type: String, required: false },
  userAgent: { type: String, required: false },
  message: { type: String, required: false },
  localizedMsgKey: { type: String, required: false },
  name: { type: String, required: false }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  },
  timestamps: true,
  capped: { size: parseInt( process.env.LOGGER_CAPPED_SIZE_IN_MB! ) * 1024 * 1024 }
} );

activitySchema.statics.build = ( attrs: ActivityAttrs ) => {
  return new Activity( attrs );
};

const Activity = model<ActivityDoc, ActivityModel>( "Activity", activitySchema );

export { Activity };