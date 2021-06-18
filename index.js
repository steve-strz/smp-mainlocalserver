import express from 'express';
import api from './api.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3306;

mongoose
   .connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => {
      const app = express();
      app.use(express.json());
      app.use('/api', api);
      app.listen(PORT, '192.168.0.34', () => {
         console.log(`Main Local Server running at : http://localhost:${PORT}`);
      });
   });
