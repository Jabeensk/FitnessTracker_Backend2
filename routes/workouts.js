import express from 'express';
import Workout from '../models/workouts.js';

const router = express.Router();

// GET all workouts for a specific user
router.get('/:userId', async (req, res) => {
  try {
    // const userId = req.params.userId;
    const workouts = await Workout.find({ userId:req.params.userId });
    console.log(workouts);
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// POST a new workout
router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// PUT update a workouts
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted', workout: deletedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;
