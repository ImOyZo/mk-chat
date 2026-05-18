import db from '../config/db.js';
import { encrypt, decrypt } from '../utils/crypto.js';

export default function(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.username}`);

        db.query('SELECT username, message, image_url FROM messages ORDER BY id ASC', (err, results) => {
            if (err) {
                console.error("Failed to load chat history:", err);
                return;
            };

            // Decrypt from result query.
            const decryptedChatHistory = results.map(row => ({
                username: row.username,
                message: decrypt(row.message),
                image_url: decrypt(row.image_url)
            }));

            socket.emit('chat history', decryptedChatHistory);
        });

        socket.on('chat message', (data) => {
            const msgData = {
                username: socket.username,
                message: data.message || null,
                image_url: data.image_url || null
            };

            // For database
            const dbData = {
                username: socket.username,
                message: encrypt(data.message),
                image_url: encrypt(data.image_url)
            };

            db.query('INSERT INTO messages SET ?', dbData, (err) => {
                if (err) {
                    console.error("Database insert failed:", err);
                    return;
                }
                // Active user still sended normal text
                io.emit('chat message', msgData);
            });
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.username}`);
        });
    });
};