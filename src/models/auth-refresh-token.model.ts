import mongoose from 'mongoose'
import { UserDoc } from './auth-user.model'

interface RefreshTokenAttrs {
  user: UserDoc
  token: string
  expires: Date
  createdByIp: string
  userAgent: string
}

interface RefreshTokenModel extends mongoose.Model<RefreshTokenDoc> {
  build ( attrs: RefreshTokenAttrs ): RefreshTokenDoc
}

interface RefreshTokenDoc extends mongoose.Document {
  user: UserDoc
  token: string
  expires: Date
  created: Date
  createdByIp: string
  revoked: number
  revokedByIp: string
  replacedByToken: string
  isExpired: boolean
  isActive: boolean
  userAgent: string
}

const refreshTokenSchema = new mongoose.Schema( {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
  userAgent: { type: String, required: true }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id
      delete ret._id
      delete ret.user
    },
    versionKey: false,
    virtuals: true
  },
  timestamps: true
} )

//refreshTokenSchema.index({createdAt: 1}, {expireAfterSeconds: 7 * 24 * 60 * 60})

refreshTokenSchema.statics.build = ( attrs: RefreshTokenAttrs ) => {
  return new RefreshToken( attrs )
}

refreshTokenSchema.virtual( 'isExpired' ).get( function ( this: RefreshTokenDoc ) {
  return Date.now() >= this.expires.getTime()
} )

refreshTokenSchema.virtual( 'isActive' ).get( function ( this: RefreshTokenDoc ) {
  return !this.revoked && !this.isExpired
} )

const RefreshToken = mongoose.model<RefreshTokenDoc, RefreshTokenModel>( 'RefreshToken', refreshTokenSchema )

export { RefreshToken }