import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    const hashedPassword = bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(400).json({ error: 'Username already exists' });
    });
    res.json({ success: true });
};

export function login(req, res) {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], function (err, results) {
    if (err || results.length === 0) return res.status(400).json({ error: 'User not found' });

    const match = bcrypt.compare(password, results[0].password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });

    req.session.user = { username };
    res.json({ success: true });
    })
};

export function check_session(req, res) {
    if (req.session.user) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
};

export function logout(req, res) {
    req.session.destroy(() => res.json({ success: true }));
};
