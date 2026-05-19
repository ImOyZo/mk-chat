import session from 'express-session';
import { loadEnvFile } from 'node:process';

loadEnvFile();

export default session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
});