
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {user} from './route.js'
const app  = express();

app.use(cors());
app.use(express.json());
app.use('/api',user);

app.listen(3000,async ()=>{
    console.log('Server is running on port 3000');
    await mongoose.connect('mongodb+srv://visionop192004:GhPUF7$y@mern.h89pu.mongodb.net/catalogue');
    console.log('Database connected');
})
