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
    try{
    	let bluetoothctl = spawn('bluetoothctl', ['--', 'scan', 'on']);
	bluetoothctl.stdout.setEncoding('utf8');
	bluetoothctl.stdout.on('data', (data) => {
	  console.log(data);
	});
	bluetoothctl.stderr.on('data', (err) => {
	  console.log(err);
	});
	bluetoothctl.on('error', (err) => {
	  console.log(err);
	});
	bluetoothctl.on('close', (code) => {
	  console.log('code erreur :', code);
	});
    }catch(e){
	console.log(e);
    }
  }
}
