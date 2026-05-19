import * as http from 'node:http';
import { Server } from 'socket.io';
import app from './app.js';
import socketAuth from './middleware/socketAuth.js';
import setupChat from './services/chat.js';

const server = http.createServer(app);
const io = new Server(server);

io.use(socketAuth);

setupChat(io);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});