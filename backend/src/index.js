const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
