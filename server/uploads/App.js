const express = require('express');
const app = express();
const files = require('./routes/filesRoutes');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const cors = require('cors')
const path = require('path')

// middleware
app.use(cors())
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

// routes
app.use('/api/v1/', files);
app.use(notFound);


const start = async () => {
  try {
    const server = app.listen(0, () =>
      console.log(`Server is listening on port ${server.address().port}...`)
    );

  } catch (error) {
    console.log(error);
  }
};

start();