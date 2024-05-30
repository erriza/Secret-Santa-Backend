import mongoose, { Document } from 'mongoose';

export interface FamilyMember {
  name: string;
  familyId: number;
}

export interface Family extends Document {
  name: string;
  members: FamilyMember[];
}

const familySchema = new mongoose.Schema({
  name: String,
  members: [{
    name: String,
    familyId: Number
  }]
});

export const FamilyModel = mongoose.model<Family>('Family', familySchema);