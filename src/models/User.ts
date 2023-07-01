import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  githubId: string;
  displayName?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  githubId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
