"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const family_1 = require("./models/family");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.get('/families', async (_req, res) => {
    try {
        const families = await family_1.FamilyModel.find();
        res.send(families);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching families' });
    }
});
app.post('/families', async (req, res) => {
    try {
        const newFamily = req.body;
        const addedFamily = new family_1.FamilyModel(newFamily);
        await addedFamily.save();
        res.json({ message: 'Family added successfully', family: addedFamily });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding family' });
    }
});
// Implement the Secret Santa logic (simplified)
function generateSecretSanta(families, pairingsHistory, currentYear) {
    // Your existing generateSecretSanta logic here
    const pairings = {}; // Your generated pairings
    return [pairings, null];
}
app.post('/pairings', async (req, res) => {
    const currentYear = new Date().getFullYear();
    const pairingsHistory = {}; // Implement pairing history persistence
    const [pairings, error] = generateSecretSanta(req.body, pairingsHistory, currentYear);
    if (error) {
        res.status(400).json({ error });
    }
    else {
        res.json(pairings);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map