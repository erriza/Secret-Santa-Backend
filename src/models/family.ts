import mongoose, { Document, Schema } from 'mongoose';

// Defines the structure for a family member
export interface FamilyMember {
  _id: mongoose.Types.ObjectId;
  name: string;
}

// Defines the structure for a family, extending the Mongoose Document Interface
export interface Family extends Document {
  name: string;
  members: FamilyMember[];
}

// Creates the Mongoose schema for the Family model
const familyMemberSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true }
});

const familySchema = new mongoose.Schema({
  name: String,
  members: [familyMemberSchema] // Use the nested schema here
});

// Defines the Mongoose model for the Family collection
export const FamilyModel = mongoose.model<Family>('Family', familySchema);