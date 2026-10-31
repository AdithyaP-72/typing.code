import { useMemo } from 'react';
import { problems } from '../data/problems';
import { categories } from '../data/categories';
import { getAllProgress, getDailyStreak } from '../utils/metrics';

export default function Dashboard({ onSelectProblem, onBrowse }) {
    const progress = getAllProgress();
    const streak = getDailyStreak();

    const solvedProblems = useMemo(() => problems.filter(p => p.solved), []);

    const stats = useMemo(() => {
        const entries = Object.entries(progress);
        const totalAttempts = entries.reduce((sum, [, p]) => sum + p.attempts, 0);
        const practicedCount = entries.filter(([, p]) => p.attempts > 0).length;

        const bestWpms = entries.map(([, p]) => p.bestWpm).filter(w => w > 0);
        const avgWpm = bestWpms.length > 0
            ? Math.round(bestWpms.reduce((a, b) => a + b, 0) / bestWpms.length)
            : 0;
        const peakWpm = bestWpms.length > 0 ? Math.max(...bestWpms) : 0;

        const bestAccs = entries.map(([, p]) => p.bestAccuracy).filter(a => a > 0);
        const avgAccuracy = bestAccs.length > 0
            ? Math.round(bestAccs.reduce((a, b) => a + b, 0) / bestAccs.length * 10) / 10
            : 0;

        return { totalAttempts, avgWpm, peakWpm, avgAccuracy, practicedCount };
    }, [progress]);

    // Top categories with counts
    const categoryCards = useMemo(() => {
        const priorityCatIds = [
            'dynamic-programming',
            'graphs',
            'binary-search',
            'sliding-window',
            'stack',
            'trees',
        ];

        return priorityCatIds.map(catId => {
            const cat = categories.find(c => c.id === catId);
            const catProblems = problems.filter(p => p.category === catId);
            const solvedCount = catProblems.filter(p => p.solved).length;
            const practicedInCat = catProblems.filter(p => progress[p.id]?.attempts > 0).length;

            return {
                ...cat,
                total: catProblems.length,
                solved: solvedCount,
                practiced: practicedInCat,
                problems: catProblems,
            };
        });
    }, [progress]);

    const recent = useMemo(() => {
        const all = [];
        Object.entries(progress).forEach(([id, p]) => {
            const problem = problems.find(pr => pr.id === id);
            if (!problem || !p.history?.length) return;
            const last = p.history[p.history.length - 1];
            all.push({ problem, ...last, bestWpm: p.bestWpm });
        });
        return all.sort((a, b) => b.date - a.date).slice(0, 5);
    }, [progress]);

    const getRandomSolved = () => {
        const pool = solvedProblems.length > 0 ? solvedProblems : problems;
        return pool[Math.floor(Math.random() * pool.length)];
    };

    const handleDrillCategory = (catId) => {
        const pool = problems.filter(p => p.category === catId && p.solved);
        const fallback = problems.filter(p => p.category === catId);
        const targetPool = pool.length > 0 ? pool : fallback;
        if (targetPool.length > 0) {
            const chosen = targetPool[Math.floor(Math.random() * targetPool.length)];
            onSelectProblem(chosen);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090d] text-[#e4e4ed] pb-24 font-mono relative overflow-hidden">
            {/* Subtle radial ambient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-8 pt-8 relative z-10">
                {/* Big Action Buttons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => onSelectProblem(getRandomSolved())}
                        className="bg-primary hover:bg-[#20dbff] text-[#07090e] py-6 px-8 rounded-2xl font-black text-xl tracking-wide transition-all shadow-[0_0_30px_rgba(0,212,255,0.25)] hover:shadow-[0_0_45px_rgba(0,212,255,0.45)] flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
                    >
                        <span className="text-2xl">⚡</span>
                        <span>Start Random Drill</span>
                    </button>
                    <button
                        onClick={() => onBrowse('all')}
                        className="bg-[#12131a] hover:bg-[#181a24] border border-[#232738] hover:border-[#3b415a] text-white py-6 px-8 rounded-2xl font-black text-xl tracking-wide transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                        <span>📂</span>
                        <span>Browse Library <span className="text-primary font-mono font-bold">({problems.length})</span></span>
                    </button>
                </div>

                {/* Sleek KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
                    <div className="bg-[#101118]/80 border border-[#1b1d28] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2b3044] transition-colors">
                        <div className="text-[11px] uppercase tracking-wider text-[#6c7087] font-bold mb-1">Average Speed</div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black text-white font-mono">{stats.avgWpm || '—'}</span>
                            <span className="text-xs text-[#6c7087]">WPM</span>
                        </div>
                        {stats.peakWpm > 0 && (
                            <div className="text-[10px] text-primary mt-2 font-mono">
                                Peak: {stats.peakWpm} WPM
                            </div>
                        )}
                    </div>

                    <div className="bg-[#101118]/80 border border-[#1b1d28] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2b3044] transition-colors">
                        <div className="text-[11px] uppercase tracking-wider text-[#6c7087] font-bold mb-1">Accuracy</div>
                        <div className="flex items-baseline gap-1.5">
                            <span className={`text-3xl font-black font-mono ${
                                stats.avgAccuracy >= 95 ? 'text-[#00ff88]' : stats.avgAccuracy >= 85 ? 'text-[#ffb703]' : 'text-white'
                            }`}>
                                {stats.avgAccuracy ? `${stats.avgAccuracy}%` : '—'}
                            </span>
                        </div>
                        <div className="text-[10px] text-[#6c7087] mt-2 font-mono">
                            Keystroke precision
                        </div>
                    </div>

                    <div className="bg-[#101118]/80 border border-[#1b1d28] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2b3044] transition-colors">
                        <div className="text-[11px] uppercase tracking-wider text-[#6c7087] font-bold mb-1">Solved Trained</div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black text-[#00ff88] font-mono">{stats.practicedCount}</span>
                            <span className="text-xs text-[#6c7087]">/ {solvedProblems.length}</span>
                        </div>
                        <div className="text-[10px] text-[#6c7087] mt-2 font-mono">
                            From your sheet
                        </div>
                    </div>

                    <div className="bg-[#101118]/80 border border-[#1b1d28] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2b3044] transition-colors">
                        <div className="text-[11px] uppercase tracking-wider text-[#6c7087] font-bold mb-1">Streak</div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black text-[#ffb703] font-mono">{streak > 0 ? streak : 1}</span>
                            <span className="text-xs text-[#ffb703]">🔥</span>
                        </div>
                        <div className="text-[10px] text-[#6c7087] mt-2 font-mono">
                            {stats.totalAttempts} total drills done
                        </div>
                    </div>
                </div>

                {/* Core Pattern Quick Launch Matrix */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-3.5">
                        <h2 className="text-sm font-black text-white tracking-tight uppercase">Core DSA Patterns</h2>
                        <button
                            onClick={() => onBrowse('solved')}
                            className="text-xs text-primary hover:underline font-bold"
                        >
                            View all 15 categories →
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categoryCards.map(cat => (
                            <div
                                key={cat.id}
                                className="bg-[#101118]/60 hover:bg-[#141620] border border-[#1b1d28] hover:border-[#2c3247] rounded-xl p-4 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-mono" style={{ color: cat.color }}>{cat.icon}</span>
                                            <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                                                {cat.name}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-[#6c7087] font-mono">
                                            {cat.solved} solved
                                        </span>
                                    </div>

                                    {/* Progress line */}
                                    <div className="w-full h-1 bg-[#181a24] rounded-full overflow-hidden mb-3">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                backgroundColor: cat.color,
                                                width: `${cat.total > 0 ? Math.round((cat.practiced / cat.total) * 100) : 0}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-[#181a24]">
                                    <span className="text-[10px] text-[#6c7087]">
                                        {cat.practiced} trained
                                    </span>
                                    <button
                                        onClick={() => handleDrillCategory(cat.id)}
                                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                        <span>Drill</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Recent Performance or Quick Starter */}
                <div className="bg-[#101118]/60 border border-[#1b1d28] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#181a24]">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span>🕒</span> Recent Drills
                        </h3>
                        {recent.length > 0 && (
                            <button onClick={() => onBrowse('all')} className="text-xs text-primary hover:underline">
                                Full History
                            </button>
                        )}
                    </div>

                    {recent.length === 0 ? (
                        <div className="py-6 text-center">
                            <p className="text-white text-sm font-bold mb-1">No drills logged yet</p>
                            <p className="text-[#6c7087] text-xs max-w-sm mx-auto mb-4">
                                Click "Start Random Drill" above or pick any problem to start tracking your WPM.
                            </p>
                            <button
                                onClick={() => onSelectProblem(getRandomSolved())}
                                className="text-xs px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg font-bold transition-colors cursor-pointer"
                            >
                                Take your first drill →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recent.map((r, i) => (
                                <div
                                    key={i}
                                    onClick={() => onSelectProblem(r.problem)}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[#09090d]/60 hover:bg-[#141620] border border-[#1b1d28] hover:border-[#2d3348] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3 min-w-0 pr-4">
                                        <span className="text-[11px] text-[#6c7087] font-mono w-10 text-right shrink-0">
                                            {r.problem.leetcodeNum > 0 ? `#${r.problem.leetcodeNum}` : ''}
                                        </span>
                                        <span className="text-xs text-white group-hover:text-primary transition-colors font-bold truncate">
                                            {r.problem.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 shrink-0 font-mono">
                                        <span className="text-xs text-[#00ff88] font-bold">{r.accuracy}% acc</span>
                                        <span className="text-xs text-primary font-bold">{r.wpm} WPM</span>
                                        <span className="text-[#6c7087] group-hover:text-primary text-xs">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
