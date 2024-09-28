import express from 'express';
import https from 'httpolyglot';
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const __dirname = path.resolve();

app.get('*', (req, res, next) => {
  const path = '/sfu/'

  if (req.path.indexOf(path) == 0 && req.path.length > path.length) return next()

  res.send(`You need to specify a room name in the path e.g. 'https://127.0.0.1/sfu/room'`)
})

app.use('/sfu/:room', express.static(path.join(__dirname, 'public')))


const options = {
  key: fs.readFileSync('./server/ssl/key.pem', 'utf-8'),
  cert: fs.readFileSync('./server/ssl/cert.pem', 'utf-8'),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(3000, () => {
  console.log('listening on port: ' + 3000);
});

const io = new Server(httpsServer, {
  cors: {
    origin: '*',
  },
});

const socketConnection = io.of('/mediasoup');

export default socketConnection;
