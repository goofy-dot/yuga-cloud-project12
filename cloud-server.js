const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

let lastCommand = null;

// Serve static website
app.use(express.static(path.join(__dirname, 'public')));

// Phone / browser sends a command
app.post('/command', (req, res) => {
  const { command } = req.body;
  console.log('Received command from client:', command);
  lastCommand = command;
  res.send({ status: 'OK' });
});

// PC bridge fetches latest command
app.get('/command', (req, res) => {
  res.send({ command: lastCommand });
  lastCommand = null; // clear after sending
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cloud server running on port ${PORT}`);
});
