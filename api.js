import express from 'express';
import Sensor from './models/sensor.js'
var router = express.Router();

router.get('/', (req, res) => {
   res.send('It works.');
});

//SENSORS

router.get('/sensors', async (req, res) => {
   const sensors = await Sensor.find();
   res.send(200, sensors);
});

router.post('/sensors', async (req, res) => {
   try{
      const sensor = new Sensor({
         name: req.body.name,
         macAddress: req.body.macAddress
      });
      await sensor.save();
      res.send(sensor);
   }catch(e){
      console.log("[POST][SENSOR][ERROR] - ", e);
      res.send(500);
   }   
});

// router.delete('/sensors/:filter', async (req, res) => {
//    if(req.params.filter == "all") await Sensor.deleteMany({});
//    else console.log("what ?");
//    res.send(200);
// }); 

router.put('/sensors/:mac_address', async (req, res) => {
   let response = await Sensor.findOneAndUpdate(
      {macAddress: req.params.mac_address},
      {value: req.body.value}
   );
   if(!response) res.send(500);
   res.sendStatus(200);
});

export default router;