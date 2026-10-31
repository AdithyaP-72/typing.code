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
            {/* Ambient lighting backdrop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 relative z-10">
                {/* Big Action Buttons Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    <button
                        onClick={() => onSelectProblem(getRandomSolved())}
                        className="bg-primary hover:bg-[#20dbff] text-[#07090e] py-8 px-10 rounded-2xl font-black text-2xl lg:text-3xl tracking-wide transition-all shadow-[0_0_35px_rgba(0,212,255,0.25)] hover:shadow-[0_0_55px_rgba(0,212,255,0.45)] flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
                    >
                        <span>Start Random Drill</span>
                    </button>
                    <button
                        onClick={() => onBrowse('all')}
                        className="bg-[#12131a] hover:bg-[#181a24] border border-[#232738] hover:border-[#3b415a] text-white py-8 px-10 rounded-2xl font-black text-2xl lg:text-3xl tracking-wide transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl active:scale-[0.99]"
                    >
                        <span>Browse Library <span className="text-primary font-mono">({problems.length})</span></span>
                    </button>
                </div>

                {/* Expanded KPI Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div className="bg-[#101118]/85 border border-[#1b1d28] rounded-2xl p-7 relative overflow-hidden group hover:border-[#2b3044] transition-all">
                        <div className="text-xs uppercase tracking-wider text-[#6c7087] font-bold mb-2">Average Speed</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl lg:text-5xl font-black text-white font-mono">{stats.avgWpm || '—'}</span>
                            <span className="text-sm text-[#6c7087]">WPM</span>
                        </div>
                        {stats.peakWpm > 0 && (
                            <div className="text-xs text-primary mt-3 font-mono font-bold">
                                Peak: {stats.peakWpm} WPM
                            </div>
                        )}
                    </div>

                    <div className="bg-[#101118]/85 border border-[#1b1d28] rounded-2xl p-7 relative overflow-hidden group hover:border-[#2b3044] transition-all">
                        <div className="text-xs uppercase tracking-wider text-[#6c7087] font-bold mb-2">Accuracy</div>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-4xl lg:text-5xl font-black font-mono ${
                                stats.avgAccuracy >= 95 ? 'text-[#00ff88]' : stats.avgAccuracy >= 85 ? 'text-[#ffb703]' : 'text-white'
                            }`}>
                                {stats.avgAccuracy ? `${stats.avgAccuracy}%` : '—'}
                            </span>
                        </div>
                        <div className="text-xs text-[#6c7087] mt-3 font-mono">
                            Keystroke precision
                        </div>
                    </div>

                    <div className="bg-[#101118]/85 border border-[#1b1d28] rounded-2xl p-7 relative overflow-hidden group hover:border-[#2b3044] transition-all">
                        <div className="text-xs uppercase tracking-wider text-[#6c7087] font-bold mb-2">Solved Trained</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl lg:text-5xl font-black text-[#00ff88] font-mono">{stats.practicedCount}</span>
                            <span className="text-base text-[#6c7087]">/ {solvedProblems.length}</span>
                        </div>
                        <div className="text-xs text-[#6c7087] mt-3 font-mono">
                            From your solved pool
                        </div>
                    </div>

                    <div className="bg-[#101118]/85 border border-[#1b1d28] rounded-2xl p-7 relative overflow-hidden group hover:border-[#2b3044] transition-all">
                        <div className="text-xs uppercase tracking-wider text-[#6c7087] font-bold mb-2">Streak</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl lg:text-5xl font-black text-[#ffb703] font-mono">{streak > 0 ? streak : 1}</span>
                            <span className="text-xl text-[#ffb703]">🔥</span>
                        </div>
                        <div className="text-xs text-[#6c7087] mt-3 font-mono">
                            {stats.totalAttempts} total drills done
                        </div>
                    </div>
                </div>

                {/* Core Pattern Quick Launch Matrix */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-black text-white tracking-tight uppercase">Core DSA Patterns</h2>
                        <button
                            onClick={() => onBrowse('solved')}
                            className="text-xs lg:text-sm text-primary hover:underline font-bold"
                        >
                            View all 15 categories →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryCards.map(cat => (
                            <div
                                key={cat.id}
                                className="bg-[#101118]/70 hover:bg-[#141620] border border-[#1b1d28] hover:border-[#2c3247] rounded-2xl p-6 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base font-mono font-bold" style={{ color: cat.color }}>{cat.icon}</span>
                                            <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                {cat.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-[#6c7087] font-mono font-bold">
                                            {cat.solved} solved
                                        </span>
                                    </div>

                                    {/* Progress line */}
                                    <div className="w-full h-1.5 bg-[#181a24] rounded-full overflow-hidden mb-4">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                backgroundColor: cat.color,
                                                width: `${cat.total > 0 ? Math.round((cat.practiced / cat.total) * 100) : 0}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-[#181a24]">
                                    <span className="text-xs text-[#6c7087]">
                                        {cat.practiced} trained
                                    </span>
                                    <button
                                        onClick={() => handleDrillCategory(cat.id)}
                                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                        <span>Drill Pattern</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Recent Performance Feed */}
                <div className="bg-[#101118]/70 border border-[#1b1d28] rounded-2xl p-7 mb-8">
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#181a24]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Recent Drills
                        </h3>
                        {recent.length > 0 && (
                            <button onClick={() => onBrowse('all')} className="text-xs text-primary hover:underline font-bold">
                                Full History
                            </button>
                        )}
                    </div>

                    {recent.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-white text-base font-bold mb-1">No drills logged yet</p>
                            <p className="text-[#6c7087] text-xs max-w-sm mx-auto mb-4">
                                Click "Start Random Drill" above or pick any problem to start tracking your WPM.
                            </p>
                            <button
                                onClick={() => onSelectProblem(getRandomSolved())}
                                className="text-xs px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl font-bold transition-colors cursor-pointer"
                            >
                                Take your first drill →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            {recent.map((r, i) => (
                                <div
                                    key={i}
                                    onClick={() => onSelectProblem(r.problem)}
                                    className="flex items-center justify-between p-4 rounded-xl bg-[#09090d]/70 hover:bg-[#141620] border border-[#1b1d28] hover:border-[#2d3348] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4 min-w-0 pr-4">
                                        <span className="text-xs text-[#6c7087] font-mono w-10 text-right shrink-0">
                                            {r.problem.leetcodeNum > 0 ? `#${r.problem.leetcodeNum}` : ''}
                                        </span>
                                        <span className="text-sm text-white group-hover:text-primary transition-colors font-bold truncate">
                                            {r.problem.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-8 shrink-0 font-mono">
                                        <span className="text-xs text-[#00ff88] font-bold">{r.accuracy}% acc</span>
                                        <span className="text-sm text-primary font-bold">{r.wpm} WPM</span>
                                        <span className="text-[#6c7087] group-hover:text-primary text-sm">→</span>
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
