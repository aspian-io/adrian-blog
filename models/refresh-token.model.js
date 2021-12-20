const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  token: String,
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})

schema.set('timestamps', true)
schema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
    delete ret.id
    delete ret.user
  },
})

schema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires
})

schema.virtual('isActive').get(function () {
  return !this.revoked && !this.isExpired
})

module.exports = mongoose.model('RefreshToken', schema)
