import mongoose from 'mongoose';

import Sensor from './sensor';

const connectDb = () => {
   return mongoose.connect(process.env.DATABASE_URL);
};

const models = {Sensor};
export { connectDb };
export default models;