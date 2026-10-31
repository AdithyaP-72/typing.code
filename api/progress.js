// Vercel Serverless Function: Automatic Cross-Device Progress Sync with Vercel KV / Upstash Redis
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    // If KV not yet connected in Vercel dashboard, return empty cleanly
    if (!kvUrl || !kvToken) {
        return res.status(200).json({ status: 'offline', progress: {} });
    }

    const redisKey = 'personal_dsa_typeracer_progress';

    try {
        if (req.method === 'GET') {
            const response = await fetch(`${kvUrl}/get/${redisKey}`, {
                headers: { Authorization: `Bearer ${kvToken}` },
            });
            const data = await response.json();
            const progress = data.result ? JSON.parse(data.result) : {};
            return res.status(200).json({ status: 'ok', progress });
        }

        if (req.method === 'POST') {
            const { progress } = req.body || {};
            if (!progress) {
                return res.status(400).json({ error: 'Missing progress data' });
            }
            await fetch(`${kvUrl}/set/${redisKey}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${kvToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSON.stringify(progress)),
            });
            return res.status(200).json({ status: 'synced' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('KV Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}
