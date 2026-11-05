require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const supabase = require('./supabase');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('message')
})

app.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        console.log("Supabase signup error:", error);

        return res.status(400).json({
            error: error.message,
            status: error.status,
            code: error.code
        });
    }

    console.log(data);

    return res.status(201).json({ message: 'User registered successfully' });
})

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.log("Supabase login error:", error);

        return res.status(400).json({
            error: error.message,
            status: error.status,
            code: error.code
        });
    }

    console.log({ userId: data.user?.id, hasSession: Boolean(data.session) });

    res.cookie('access_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });

    res.cookie('refresh_token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });

    return res.status(200).json({ message: 'User logged in successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})