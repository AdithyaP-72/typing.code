export function calculateWPM(charsTyped, elapsedMs) {
    const minutes = elapsedMs / 1000 / 60;
    if (minutes <= 0) return 0;
    return Math.round((charsTyped / 5) / minutes);
}

export function calculateAccuracy(correct, total) {
    if (total <= 0) return 100;
    return Math.round((correct / total) * 1000) / 10;
}

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getProgressData(problemId) {
    try {
        const data = JSON.parse(localStorage.getItem('dsa-typeracer-progress') || '{}');
        return data[problemId] || null;
    } catch {
        return null;
    }
}

export function saveProgress(problemId, result) {
    try {
        const data = JSON.parse(localStorage.getItem('dsa-typeracer-progress') || '{}');
        const existing = data[problemId] || { attempts: 0, bestWpm: 0, bestAccuracy: 0, history: [] };

        existing.attempts += 1;
        existing.bestWpm = Math.max(existing.bestWpm, result.wpm);
        existing.bestAccuracy = Math.max(existing.bestAccuracy, result.accuracy);
        existing.lastAttempt = Date.now();
        existing.history.push({
            wpm: result.wpm,
            accuracy: result.accuracy,
            time: result.time,
            date: Date.now(),
        });

        // Keep only last 50 attempts
        if (existing.history.length > 50) {
            existing.history = existing.history.slice(-50);
        }

        data[problemId] = existing;
        localStorage.setItem('dsa-typeracer-progress', JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save progress:', e);
    }
}

export function getAllProgress() {
    try {
        return JSON.parse(localStorage.getItem('dsa-typeracer-progress') || '{}');
    } catch {
        return {};
    }
}

export function getDailyStreak() {
    try {
        const data = JSON.parse(localStorage.getItem('dsa-typeracer-progress') || '{}');
        const dates = new Set();
        Object.values(data).forEach(p => {
            p.history?.forEach(h => {
                dates.add(new Date(h.date).toDateString());
            });
        });

        const sortedDates = [...dates].map(d => new Date(d)).sort((a, b) => b - a);
        if (sortedDates.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastDate = sortedDates[0];
        lastDate.setHours(0, 0, 0, 0);

        if (lastDate < yesterday) return 0;

        let streak = 1;
        for (let i = 1; i < sortedDates.length; i++) {
            const prev = sortedDates[i - 1];
            const curr = sortedDates[i];
            const diff = (prev - curr) / (1000 * 60 * 60 * 24);
            if (diff <= 1.5) streak++;
            else break;
        }
        return streak;
    } catch {
        return 0;
    }
}

