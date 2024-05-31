import mongoose, { Document } from 'mongoose';

//Defines the structre for a family member
export interface FamilyMember {
  name: string;
  familyId: number;
}

//Defines the structure for a family, extending the Moongose Document Interface
export interface Family extends Document {
  name: string;
  members: FamilyMember[];
}

//Creates the Moongose schema for the Family model
const familySchema = new mongoose.Schema({
  name: String,
  members: [{
    name: String,
    familyId: Number
  }]
});

//Defines the Mongoose model for the Family collection
export const FamilyModel = mongoose.model<Family>('Family', familySchema);