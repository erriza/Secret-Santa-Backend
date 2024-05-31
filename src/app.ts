import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { FamilyModel, Family } from './models/family';

const app: Express = express();

// Middleware
// Enable CORS for cross-origin requests
app.use(cors());
app.use(bodyParser.json());

//Serve statis files from 'dist' directory (for the frontend application)
app.use(express.static('dist'));

// Routes
// Simple endpoint for testing the connection
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

// Get all the families from the database
app.get('/api/families', async (_req: Request, res: Response) => {
    try {
        const families = await FamilyModel.find();
        res.send(families);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching families' });
    }
});

// Create a new family in the database
app.post('/api/families', async (req: Request, res: Response) => {
    try {
        const newFamily: Family = req.body;
        const addedFamily = new FamilyModel(newFamily);
        await addedFamily.save();
        res.json({ message: 'Family added successfully', family: addedFamily });
    } catch (error) {
        res.status(500).json({ error: 'Error adding family' });
    }
});

// Implement the Secret Santa logic (simplified)
function generateSecretSanta(families: Family[], pairingsHistory: Record<string, [string, number][]>, currentYear: number): [Record<string, string>, string | null] {
    // Your existing generateSecretSanta logic here
    const pairings = {}; // Your generated pairings
    return [pairings, null];
}

app.post('/pairings', async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();
    const pairingsHistory: Record<string, [string, number][]> = {}; // Implement pairing history persistence
    const [pairings, error] = generateSecretSanta(req.body, pairingsHistory, currentYear);

    if (error) {
        res.status(400).json({ error });
    } else {
        res.json(pairings);
    }
});

export default app;