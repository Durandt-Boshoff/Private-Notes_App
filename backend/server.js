require('dotenv').config();

console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase key loaded:", Boolean(process.env.SUPABASE_ANON_KEY));
console.log("Supabase key prefix:", process.env.SUPABASE_ANON_KEY?.slice(0, 15));

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})