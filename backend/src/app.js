const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const creditRoutes = require('./routes/credits.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);

// Simple health route
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Xchange Backend' });
});

module.exports = app;
