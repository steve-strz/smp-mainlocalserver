import express from 'express';
import Sensor from './models/sensor.js'
import btManager from './scripts/bluetooth/bluetoothManager.js'
var router = express.Router();

router.get('/', (req, res) => {
   res.send('It works.');
});

//SENSORS

router.get('/sensors', async (req, res) => {
   console.log("/api/sensors called");
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
router.put('/sensors/:mac_address', async (req, res) => {
   let response = await Sensor.findOneAndUpdate(
      {macAddress: req.params.mac_address},
      {value: req.body.value}
   );
   if(!response) res.sendStatus(500);
   console.log("[i] Sensor " + response.name + " value updated");
   res.sendStatus(200);
});
router.get('/sensors/:mac_address', async (req,res) => {
   const sensor = await Sensor.findOne({
      macAddress: req.params.mac_address
   })
   console.log(sensor);
   res.send(200, sensor);
});

//BLUETOOTH

router.get('/bluetooth/on', async(req, res) => {
   let state = await btManager.enableBluetooth();
   res.send(200, state);
});
router.get('/bluetooth/off', async(req, res) => {
   let state = await btManager.disableBluetooth();
   res.send(200, state);
});
router.get('/bluetooth/state', async(req, res) => {
   let state = await btManager.getBluetoothState();
   res.send(200, state);
});
router.get('/bluetooth/scan', async(req, res) => {
   let devicesList = await btManager.scanDevices();
   console.log("devices list :", devicesList);
   res.send(200, devicesList);
});
router.get('/bluetooth/removeall', async(req, res) => {
   btManager.removeDevices();
   res.send(200);
});
router.get('/bluetooth/pair/:mac_address', async(req, res) => {
   btManager.addDevice(req.params.mac_address);
   res.send(200);
});

export default router;