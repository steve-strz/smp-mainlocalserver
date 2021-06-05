import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema(
   {
      name:{
         type:String,
         unique:true,
         required:true
      },
      macAddress:{
         type:String,
         unique:true,
         required:true
      },
      value:{
         type:Number,
         unique:false,
         required:false
      },
      suffixe:{
         type:String,
         unique:false,
         required:false
      }
   },
   {timestamps: true}
);

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;