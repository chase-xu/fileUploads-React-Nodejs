const express = require('express');
const app = express();
const files = require('./routes/filesRoutes');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const cors = require('cors')
const path = require('path')
const rateLimit = require('express-rate-limit')


// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 30 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests per windowMs
  handler: function (req, res, /*next*/) {
    return res.status(429).json({
      message: 'You sent too many requests. 2 requests per 30 seconds.'
    })
  }
})

// middleware
app.use(cors())
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(apiRequestLimiter);


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