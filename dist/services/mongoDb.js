"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const family_1 = require("../models/family");
const families_1 = __importDefault(require("../data/families"));
dotenv_1.default.config();
const connectMongoDb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        // Check if example family data already exists
        const familiesExist = await family_1.FamilyModel.exists({});
        console.log('familiesExist', familiesExist);
        if (!familiesExist) {
            await family_1.FamilyModel.insertMany(families_1.default);
            console.log('Example family data inserted');
        }
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};
exports.default = connectMongoDb;
//# sourceMappingURL=mongoDb.js.map