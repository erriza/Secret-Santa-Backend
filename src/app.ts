import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { Types } from 'mongoose';
import { FamilyModel, Family, FamilyMember } from './models/family';

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

// Get all the families from the database (with familyId)
app.get('/api/families', async (_req: Request, res: Response) => {
    try {
        const families = await FamilyModel.find().lean(); // Use lean() for faster response
        const familiesWithId = families.map((family, index) => ({ ...family, familyId: index + 1 })); // Add familyId
        res.send(familiesWithId);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching families' });
    }
});


// POST to create a new family or add a member to an existing family
app.post('/api/families', async (req, res) => {
  const { familyName, memberName } = req.body;

  try {
    let family = await FamilyModel.findOne({ name: familyName }).lean() as Family & { familyId: string }; 

    if (family) {
      const newMember: FamilyMember = {
        _id: new Types.ObjectId(),
        name: memberName,
      };

      family.members.push(newMember);
      await FamilyModel.updateOne({ _id: family._id }, { $push: { members: newMember } });

      return res.json({ message: 'Member added successfully', family });
    } else {
      const maxFamily = await FamilyModel.findOne().sort({ familyId: -1 }).lean() as Family & { familyId: string };
      const newFamilyId = maxFamily ? (parseInt(maxFamily.familyId) + 1).toString() : '1'; 

      const newFamily = new FamilyModel({
        name: familyName,
        familyId: newFamilyId,
        members: [
          {
            _id: new Types.ObjectId(),
            name: memberName,
          }
        ]
      });

      const createdFamily = await newFamily.save();
      return res.json({ message: 'Family and member created successfully', family: createdFamily });
    }

  } catch (error) {
    console.error("Error creating family or adding member:", error);
    return res.status(500).json({ error: "Error creating family or adding member" });
  }
});


// DELETE a member from a family (using _id)
app.delete('/api/families/:familyId/members/:memberId', async (req, res) => {
    const { familyId, memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(familyId) || !mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ error: 'Invalid familyId or memberId' });
    }

    try {
        // Find the family by familyId
        const family = await FamilyModel.findById(familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        // Find the member within the family by _id 
        const memberIndex = family.members.findIndex(m => m._id.toString() === memberId);
        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found in family' });
        }

        // Remove the member from the family's members array
        family.members.splice(memberIndex, 1);

        // Update the family in the database
        await family.save();

        // Delete the empty family collection
        if(family.members.length === 0) {
          await FamilyModel.findByIdAndDelete(familyId);
        }
        return res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ error: "Error deleting member" });
    }
});

// DELETE an entire family
app.delete('/api/families/:familyId', async (req, res) => {
    const familyId = req.params.familyId; // familyId is a string!

    try {
        await FamilyModel.findByIdAndDelete(familyId);
        return res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting family:", error);
        return res.status(500).json({ error: "Error deleting family" }); 
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