const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcryptjs')

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  displayName: { type: String, required: false },
  bio: { type: String, required: false },
  avatar: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  createdByIp: { type: String, required: true },
  lastIp: { type: String, required: true },
  claims: [{ type: mongoose.Types.ObjectId(), ref: 'claim' }],
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.passwordHash
  },
  timestamps: true,
})

schema.pre('save', function (next) {
  if (this.isModified('passwordHash')) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.get('passwordHash'), 10, (err, hash) => {
        if (err) reject(new Error('Something went wrong saving the user'))
        this.set('passwordHash', hash)
        resolve()
      })
    })
  }
  next()
})

module.exports = mongoose.model('User', schema)
