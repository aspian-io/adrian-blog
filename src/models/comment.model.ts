import { Schema } from "mongoose";
import { baseSchema, baseSchemaOptions } from "./base.model";



const commentSchema = new Schema( {
  title: { type: String, required: true },
  content: { type: String, required: true, text: true },
  isApproved: { type: Boolean, required: true, default: false },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  replies: [ { type: Schema.Types.ObjectId, ref: "Comment" } ],
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  ...baseSchema.obj
}, baseSchemaOptions );