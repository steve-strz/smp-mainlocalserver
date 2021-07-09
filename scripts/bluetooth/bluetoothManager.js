import { exec } from 'child_process';

export default {
  async enableBluetooth(){
    exec('ls', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        for (let line of stdout.split("\n")) {
          console.log(`ls: ${line}`);
        }
      }
    });
  }
}