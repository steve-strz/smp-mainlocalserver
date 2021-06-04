import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema(
   {
      name:{
         type:String,
         unique:true,
         required:true
      }
   },
   {timestamps: true}
);

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;