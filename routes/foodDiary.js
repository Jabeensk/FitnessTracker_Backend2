import express from 'express';
import FoodDiaryEntry from '../models/foodDiary.js';

const router = express.Router();

// Create a food diary entry
router.post('/', async (req, res) => {
  try {
    const { userId, waterIntake, breakfast, lunch, dinner, snacks } = req.body;
    const newEntry = await FoodDiaryEntry.create(req.body) ({
    userId,
    waterIntake,
    breakfast,
    lunch,
    dinner,
    snacks
  });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all food diary entries for a user
router.get('/:userId', async (req, res) => {
 console.log(req.params.userId)
  try {
    const entries = await FoodDiaryEntry.find({ userId: req.params.userId });
    console.log(entries)
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a food diary entry
router.patch('/:id', async (req, res) => {
  try {
    const updatedEntry = await FoodDiaryEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a food diary entry
router.delete('/:id', async (req, res) => {
  try {
    await FoodDiaryEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food diary entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
