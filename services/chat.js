import db from '../config/db.js';

export default function(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.username}`);

        db.query('SELECT username, message, image_url FROM messages ORDER BY id ASC', (err, results) => {
            if (!err) socket.emit('chat history', results);
        });

        socket.on('chat message', (data) => {
            const msgData = {
                username: socket.username,
                message: data.message || null,
                image_url: data.image_url || null
            };

            db.query('INSERT INTO messages SET ?', msgData, (err) => {
                if (err) console.error(err);
                io.emit('chat message', msgData);
            });
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.username}`);
        });
    });
};