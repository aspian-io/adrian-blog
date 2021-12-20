const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  claim: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

schema.set('timestamps', true)
schema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform(doc, ret) {
    delete ret._id
  },
})

module.exports = mongoose.model('Claim', schema)
