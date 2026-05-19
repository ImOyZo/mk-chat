import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

export default router;