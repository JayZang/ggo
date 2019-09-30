import mongoose from 'mongoose'
import massAssignPlugin from '@/models/plugins/massAssign'

// Install Global Plugins
mongoose.plugin(massAssignPlugin)

export default mongoose
export * from 'mongoose'