import { Router } from "express";
import Profile from "../models/Profiles.js";
import User from "../models/users.js"; 

const router = new Router();

/**
 * GET /profiles
 * @description returns all profiles
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /profiles/:id
 * @description returns a profile by id
 */
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Profile not found!" });
    else res.json(profile);
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /profiles
 * @description creates a new profile
 */
router.post("/", async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * PUT /profiles/:id
 * @description updates a profile by id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedProfile = await Profile.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /profiles/:id
 * @description deletes a profile by id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    res.json({ msg: "Profile deleted", deletedProfile });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
