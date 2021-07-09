import { exec } from 'child_process';

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
}