import express from 'express';
import Sensor from './models/sensor.js'
var router = express.Router();

router.get('/', (req, res) => {
   res.send('It works.');
});

router.get('/sensors', async (req, res) => {
   const sensors = await Sensor.find();
   res.send(sensors);
});

router.post('/sensors', async (req, res) => {
   const sensor = new Sensor({
      name: req.body.name
   });
   await sensor.save();
   res.send(sensor);
});

export default router;