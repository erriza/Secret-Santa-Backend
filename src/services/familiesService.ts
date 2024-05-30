// import familiesData from "../../data/families";

// import { Family } from "../../types";

// const getFamilies = ():Family[] => {
//     return familiesData;
// }

// const addFamily = (newFamily: Family):Family => {
//     familiesData.push(newFamily);
//     return newFamily;
// }

// export default {
//     getFamilies,
//     addFamily
// }

import { FamilyModel, Family } from '../models/family';

const getFamilies = async () => {
    return await FamilyModel.find();
};

const addFamily = async (newFamily: Family) => {
    const family = new FamilyModel(newFamily);
    await family.save();
    return family;
};

export default { getFamilies, addFamily };