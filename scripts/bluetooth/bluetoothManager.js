import { exec } from 'child_process';

export default {
  async enableBluetooth(){
    return new Promise((resolve, reject) => {
      exec('sudo systemctl start bluetooth', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          reject({state: 'error', error: err})
        } else{
          console.log("[i] Bluetooth enabled");
          resolve({state: 'enable'});
        }
      });
    })
  },
  async disableBluetooth(){
    return new Promise((resolve, reject) => {
      exec('sudo systemctl stop bluetooth', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          reject({state: 'error', error: err})
        } else{
          console.log("[i] Bluetooth disabled");
          resolve({state: 'disable'});
        }
      });
    });
  },
  async getBluetoothState(){
    return new Promise((resolve, reject) => {
      console.log("[i] Starting script : getBluetoothState.sh");
      let child = exec(process.cwd() + '/scripts/bluetooth/getBluetoothState.sh', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("[i] Script exited with no errors : getBluetoothState.sh");
          if(stdout.toString().charAt(0) == "1") resolve("enable");
          else if(stdout.toString().charAt(0) == "0") resolve("disable");
          else resolve("error");
        }
      });
    });
  },
  async scanDevices(){
    await this.removeDevices();
    return new Promise((resolve, reject) => {
      console.log("[i] Starting script : searchDevices.sh");
      let child = exec(process.cwd() + '/scripts/bluetooth/searchDevices.sh', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("[i] Script exited with no errors : searchDevices.sh");
        }
      });
      child.on('exit', async () => {
        let rawDevicesList = await this.getDevices();
        resolve(rawDevicesList);
      }) 
    });
  },
  async removeDevices(){
    return new Promise((resolve, reject) => {
      console.log("[i] Starting script : removeDevices.sh");
      exec(process.cwd() + '/scripts/bluetooth/removeDevices.sh', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("[i] Script exited with no errors : removeDevices.sh");
          resolve();
        }
      })
    })
  },
  async addDevice(mac_address){
    console.log("[i] Starting script : pairDevice.sh");
    exec(process.cwd() + '/scripts/bluetooth/pairDevice.sh ' + mac_address, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[i] Script exited with no errors : addDevice.sh");
        this.trustDevice(mac_address);
      }
    })
  },
  async getDevices(){
    return new Promise((resolve, reject) => {
      exec("bluetoothctl devices", (err, stdout, stderr) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          let lines = stdout.toString().split('\n');
          lines.pop();
          let devices = new Array();
          lines.forEach((line) => {
            devices.push({
              macAddress: line.substr(7, 17),
              name: line.substr(25, line.lenght)
            });
          });
          resolve(devices);
        }
      })
    });
  },
  async trustDevice(mac_address){
    exec('bluetoothctl trust ' + mac_address, (err, stdout, stderr) => {
      if(err){
        console.log(err);
      }else{
        console.log("[i] New device trusted");
        this.connectDevice(mac_address)
      }
    })
  },
  async connectDevice(mac_address){
    exec('bluetoothctl connect ' + mac_address, (err, stdout, stderr) => {
      if(err){
        console.log(err);
      }else{
        console.log("[i] New device connected");
      }
    })
  }
};