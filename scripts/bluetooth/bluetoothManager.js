import { exec } from 'child_process';
import { spawn } from 'child_process';

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
    exec('pwd', (err, stdout, stderr) => {
      console.log(stdout);
    });
    exec('./searchDevices.sh', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script started : searchDevices.sh");
      }
    })
  }
}
