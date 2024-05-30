"use strict";
// import familiesData from "../../data/families";
Object.defineProperty(exports, "__esModule", { value: true });
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
const family_1 = require("../models/family");
const getFamilies = async () => {
    return await family_1.FamilyModel.find();
};
const addFamily = async (newFamily) => {
    const family = new family_1.FamilyModel(newFamily);
    await family.save();
    return family;
};
exports.default = { getFamilies, addFamily };
//# sourceMappingURL=familiesService.js.map