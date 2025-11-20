const mongoose = require('mongoose');

async function connectDb(uri) {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/xchange';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
}

module.exports = connectDb;
