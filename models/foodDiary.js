import mongoose from 'mongoose';

const foodDiaryEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  waterIntake: {
    type: Number,
    default: 0
  },
  breakfast: {
    type: String,
    default: ''
  },
  lunch: {
    type: String,
    default: ''
  },
  dinner: {
    type: String,
    default: ''
  },
  snacks: {
    type: String,
    default: ''
  }
});

export default mongoose.model('FoodDiaryEntry', foodDiaryEntrySchema);
