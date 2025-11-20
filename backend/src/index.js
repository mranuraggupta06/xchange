require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/xchange';

async function start() {
  try {
    console.log('Starting backend...');
    console.log('Connecting to MongoDB at', MONGO_URI);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection', reason);
      process.exit(1);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
