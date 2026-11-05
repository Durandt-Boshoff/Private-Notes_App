const { createClient } = require('@supabase/supabase-js');
const supabase = require('../supabase');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies['access_token'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = data.user;

    req.supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false
            },
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );
    next();
}

module.exports = authMiddleware;