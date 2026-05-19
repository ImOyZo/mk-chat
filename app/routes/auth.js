import express from'express';
import * as authServices from '../services/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    await authServices.register(req, res);
});

router.post('/login', async (req, res) => {
    await authServices.login(req, res);
});

router.get('/user', async (req, res) => {
    await authServices.check_session(req, res);
});

router.post('/logout', async (req, res) => {
    await authServices.logout(req, res);
});

export default router;