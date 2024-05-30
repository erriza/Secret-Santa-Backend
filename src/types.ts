export interface Family {
    name: string;
    members: FamilyMember[];
  }
  
  export interface FamilyMember {
    name: string;
    familyId: number;
  }
  
  export type FamilyDocument = Document & {
    name: string;
    members: FamilyMember[];
    _id: string;
  };