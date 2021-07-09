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
    let child = spawn('sudo bluetoothctl scan on');
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
      console.log('new device: ' + data);
    });
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data) => {
      console.log('error : ' + data);
    })   
  }
}