const axios = require('axios');
const { SerialPort } = require('serialport');

const CLOUD_URL = 'https://yuga-cloud-project12.onrender.com'; // change after deploy
const ARDUINO_PORT = 'COM3';

const port = new SerialPort({
  path: ARDUINO_PORT,
  baudRate: 9600,
});

async function checkCloud() {
  try {
    const res = await axios.get(`${CLOUD_URL}/command`);
    const cmd = res.data.command;

    if (cmd) {
      console.log('Sending to Arduino:', cmd);
      port.write(cmd + '\n');
    }
  } catch (err) {
    console.log('Cloud error:', err.message);
  }

  setTimeout(checkCloud, 500);
}

checkCloud();
