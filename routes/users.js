import { Router } from "express";
import bcrypt from 'bcrypt';
import Users from "../models/users.js";
import Profile from "../models/Profiles.js";

const router = new Router();
const SALT_ROUNDS = 8;

/**
 * GET /
 * @description returns all users
 */
router.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// dummy comment
/**
 * GET /:id
 * @description return a user by id
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Resource not found!" });
    else res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /
 * @description creates a new user
 */
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, dateOfBirth } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // Create a new user
    const newUser = new Users({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      dateOfBirth
    });
    await newUser.save();
    await Profile.create({user: newUser._id});
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * PUT /:id
 * @description updates a user by id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await Users.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /:id
 * @description deletes a user by id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Users.findByIdAndDelete(id);
    res.json({ msg: "User deleted", deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
/**
 * POST /signin
 */
router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
console.log(password);
  // find user with the provided email
  const user = await Users.findOne({email});
console.log(user);
  if (!user) {
    return res.status(401).json({msg: "Invalid Credentials"});
  }

  // verify provided password with password hash from db
  const passwordMatched = bcrypt.compare(password, user.password);
console.log(passwordMatched);

  if (!passwordMatched) {
    return res.status(401).json({msg: "Invalid Credentials password"})
  }

  // TODO: generate a jwt token and send it to the client
  res.json(user);
});

/**
* POST /signup
*/
router.post('/signup', async (req, res) => {
  // check email is not in db
  // create a new user in db
  // send the new user
  const user = {_id: '1', email: 'alex@gmail.com', userName: 'alex123'};
  res.json(user);
});
export default router;
