require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const supabase = require('./supabase');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://private-note-app.netlify.app",
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
        sameSite: 'none',
        path: '/'
    });

    res.cookie('refresh_token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/'
    });

    return res.status(200).json({ message: 'User logged in successfully' });
});

app.post('/api/auth/logout', authMiddleware, async (req, res) => {
    const { data, error } = await req.supabase.auth.setSession({
        access_token: req.cookies.access_token,
        refresh_token: req.cookies.refresh_token
    });

    if (error) {
        console.log('Session restoration error:', error.message);
    } else {
        const { error: signOutError } = await req.supabase.auth.signOut({
            scope: 'local'
        });

        if (signOutError) {
            console.log('Sign out error:', signOutError.message);
        }
    }
    
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/'
    });
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/'
    });

    return res.status(200).json({ message: 'User logged out successfully' });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
    res.json({
        message: 'Authenticated successfully',
        userId: req.user.id
    });
})

app.get('/api/notes', authMiddleware, async (req, res) => {
    const { data, error } = await req.supabase
        .from('notes')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
})

app.post('/api/notes', authMiddleware, async (req, res) => {
    const { title, content, color } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data, error } = await req.supabase
        .from('notes')
        .insert([
            {
                user_id: req.user.id,
                title,
                content,
                color: color || '#f3ebdd'
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
});

app.put('/api/notes/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const {
        title,
        content,
        color,
        is_favourite,
        is_trashed
    } = req.body;

    const updates = {};

    if (title !== undefined) {
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ error: 'Invalid title' });
        }

        updates.title = title.trim();
    }

    if (content !== undefined) {
        if (typeof content !== 'string' || !content.trim()) {
            return res.status(400).json({ error: 'Invalid content' });
        }

        updates.content = content;
    }

    if (color !== undefined) {
        if (typeof color !== 'string' || !color.trim()) {
            return res.status(400).json({ error: 'Invalid color' });
        }

        updates.color = color;
    }

    if (is_favourite !== undefined) {
        if (typeof is_favourite !== 'boolean') {
            return res.status(400).json({ error: 'Invalid favourite status' });
        }

        updates.is_favourite = is_favourite;
    }

    if (is_trashed !== undefined) {
        if (typeof is_trashed !== 'boolean') {
            return res.status(400).json({ error: 'Invalid trash status' });
        }

        updates.is_trashed = is_trashed;
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided'});
    }

    const { data, error } = await req.supabase
        .from('notes')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json(data);
});

app.delete('/api/notes/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const { data, error } = await req.supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})