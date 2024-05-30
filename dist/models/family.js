"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const familySchema = new mongoose_1.default.Schema({
    name: String,
    members: [{
            name: String,
            familyId: Number
        }]
});
exports.FamilyModel = mongoose_1.default.model('Family', familySchema);
//# sourceMappingURL=family.js.map