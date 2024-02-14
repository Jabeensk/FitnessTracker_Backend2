import './localEnv.js';
import express from 'express';
import morgan from 'morgan';
import { conn } from './db/conn.js'; 
import cors from 'cors';
import usersRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';
import workoutsRoutes from './routes/workouts.js';
import foodDiaryRoutes from './routes/foodDiary.js'; 

conn();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT || 4000;
console.log(process.env.ATLAS_URI);

app.use('/api/users', usersRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/food-diary', foodDiaryRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome My Burn buddy');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
