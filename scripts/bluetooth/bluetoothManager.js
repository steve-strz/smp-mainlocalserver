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
    let bluetoothctl = spawn('sudo bluetoothctl');
    bluetoothctl.stdout.setEncoding('utf8');
    bluetoothctl.stdin.write("scan on");
    bluetoothctl.stdout.on('data', (data) => {
      console.log(data);
    })
  }
}