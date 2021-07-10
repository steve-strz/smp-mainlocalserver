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
    console.log(this.cwd);
    exec('./searchDevices.sh', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script started : searchDevices.sh");
      }
    })
  }
}
