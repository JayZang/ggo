import mongoose, { Document } from './mongoose'

import { IMember, MemberStatus } from '@/interfaces/model/IMember'

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  gender: {
    type: Boolean,
    required: true
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  birthday: {
    type: Date,
    required: true,
  },

  avatar: {
    type: String
  },

  status: {
    type: Number,
    required: true,
    default: MemberStatus.active
  }
}, {
  timestamps: true
})

export default mongoose.model<IMember & Document>('Member', memberSchema)