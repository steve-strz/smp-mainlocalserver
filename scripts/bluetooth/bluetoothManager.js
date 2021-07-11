import { exec } from 'child_process';
import { spawn } from 'child_process';

let cwd = process.cwd();

export default {
  async enableBluetooth(){
    exec('sudo systemctl start bluetooth', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Bluetooth enabled");
      }
    });
  },
  async disableBluetooth(){
    exec('sudo systemctl stop bluetooth', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Bluetooth disabled");
      }
    });
  },
  async scanDevices(){
    console.log("[i] Starting script : searchDevices.sh");
    let child = exec(process.cwd() + '/scripts/bluetooth/searchDevices.sh', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script exited with no errors : searchDevices.sh");
      }
    });
    child.on('exit', async () => {
      let rawDevicesList = await this.getDevices()
      console.log("2");
      return rawDevicesList;
    }) 
  },
  async removeDevices(){
    console.log("[i] Starting script : removeDevices.sh");
    exec(process.cwd() + '/scripts/bluetooth/removeDevices.sh', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script exited with no errors : removeDevices.sh");
      }
    })
  },
  async addDevice(mac_address){
    console.log("[i] Starting script : pairDevice.sh");
    exec(process.cwd() + '/scripts/bluetooth/pairDevice.sh ' + mac_address, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script exited with no errors : addDevice.sh");
      }
    })
  },
  async getDevices(){
    exec("bluetoothctl devices", (err, stdout, stderr) => {
      if(err){
        console.log(err);
      }else{
        return stdout;
      }
    })
  }
};

