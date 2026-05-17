import express from 'express';
import sessionMiddleware from './middleware/session.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/api', authRoutes);
app.use('/api/upload', uploadRoutes);

export default app;