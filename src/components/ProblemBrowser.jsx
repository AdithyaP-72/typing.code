import { useState, useMemo } from 'react';
import { problems } from '../data/problems';
import { categories } from '../data/categories';
import { getAllProgress } from '../utils/metrics';

export default function ProblemBrowser({ onSelectProblem, initialFilter = 'solved' }) {
    const [sheetFilter, setSheetFilter] = useState(initialFilter); // 'solved' | 'all' | 'blind75' | 'striver' | 'neetcode'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('number');
    const progress = getAllProgress();

    const filtered = useMemo(() => {
        let list = [...problems];

        // Sheet / Solved filter
        if (sheetFilter === 'solved') {
            list = list.filter(p => p.solved);
        } else if (sheetFilter === 'striver') {
            list = list.filter(p => p.sheet === 'striver-a2z');
        } else if (sheetFilter === 'neetcode') {
            list = list.filter(p => p.sheet === 'neetcode-150');
        } else if (sheetFilter === 'blind75') {
            list = list.filter(p => !p.sheet || p.sheet === 'blind75');
        }

        // Category filter
        if (selectedCategory !== 'all') {
            list = list.filter(p => p.category === selectedCategory);
        }

        // Difficulty filter
        if (selectedDifficulty !== 'all') {
            list = list.filter(p => p.difficulty === selectedDifficulty);
        }

        // Search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.leetcodeNum > 0 && p.leetcodeNum.toString().includes(q)) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Sorting
        if (sortBy === 'number') {
            list.sort((a, b) => (a.leetcodeNum || 9999) - (b.leetcodeNum || 9999));
        } else if (sortBy === 'difficulty') {
            const order = { easy: 0, medium: 1, hard: 2 };
            list.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        } else if (sortBy === 'wpm') {
            list.sort((a, b) => (progress[b.id]?.bestWpm || 0) - (progress[a.id]?.bestWpm || 0));
        } else if (sortBy === 'category') {
            list.sort((a, b) => a.category.localeCompare(b.category));
        }

        return list;
    }, [sheetFilter, selectedCategory, selectedDifficulty, searchQuery, sortBy, progress]);

    const getCategoryInfo = (catId) => categories.find(c => c.id === catId);

    const solvedCount = problems.filter(p => p.solved).length;

    return (
        <div className="min-h-screen bg-bg text-text pb-16">
            {/* Header */}
            <div className="px-8 py-8 max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text flex items-center gap-3">
                            <span className="text-primary font-mono">⚡</span> Problem Library
                        </h1>
                        <p className="text-dimmed text-sm mt-1">
                            Select any problem to start muscle memory training. Solutions formatted in human-style C++.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-dimmed uppercase tracking-wider font-bold">Your Solved Pool</div>
                        <div className="text-xl font-bold text-success font-mono">
                            {solvedCount} <span className="text-xs text-dimmed font-normal">/ {problems.length} total</span>
                        </div>
                    </div>
                </div>

                {/* Main Filter Tabs */}
                <div className="flex gap-2 mt-6 border-b border-border pb-3">
                    <button
                        onClick={() => setSheetFilter('solved')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                            sheetFilter === 'solved'
                                ? 'bg-success/20 text-success border border-success/40 shadow-[0_0_12px_rgba(0,255,136,0.15)]'
                                : 'bg-surface text-dimmed hover:text-text border border-transparent'
                        }`}
                    >
                        <span>✓</span> My Solved Only ({solvedCount})
                    </button>
                    <button
                        onClick={() => setSheetFilter('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            sheetFilter === 'all'
                                ? 'bg-primary/20 text-primary border border-primary/40'
                                : 'bg-surface text-dimmed hover:text-text border border-transparent'
                        }`}
                    >
                        All Problems ({problems.length})
                    </button>
                    <button
                        onClick={() => setSheetFilter('blind75')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            sheetFilter === 'blind75'
                                ? 'bg-accent/20 text-accent border border-accent/40'
                                : 'bg-surface text-dimmed hover:text-text border border-transparent'
                        }`}
                    >
                        Blind 75
                    </button>
                    <button
                        onClick={() => setSheetFilter('striver')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            sheetFilter === 'striver'
                                ? 'bg-warning/20 text-warning border border-warning/40'
                                : 'bg-surface text-dimmed hover:text-text border border-transparent'
                        }`}
                    >
                        Striver A2Z
                    </button>
                    <button
                        onClick={() => setSheetFilter('neetcode')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            sheetFilter === 'neetcode'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                                : 'bg-surface text-dimmed hover:text-text border border-transparent'
                        }`}
                    >
                        NeetCode 150
                    </button>
                </div>
            </div>

            {/* Sub-Filters: Search, Category, Difficulty, Sort */}
            <div className="px-8 max-w-6xl mx-auto mb-6">
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[240px]">
                        <input
                            type="text"
                            placeholder="Search by name, # or category..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-text text-sm outline-none focus:border-primary font-mono transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-dimmed hover:text-text text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category */}
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="bg-surface border border-border rounded-xl px-3.5 py-2.5 text-text text-sm outline-none focus:border-primary font-mono cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>

                    {/* Difficulty */}
                    <select
                        value={selectedDifficulty}
                        onChange={e => setSelectedDifficulty(e.target.value)}
                        className="bg-surface border border-border rounded-xl px-3.5 py-2.5 text-text text-sm outline-none focus:border-primary font-mono cursor-pointer"
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="bg-surface border border-border rounded-xl px-3.5 py-2.5 text-text text-sm outline-none focus:border-primary font-mono cursor-pointer"
                    >
                        <option value="number">Sort: LC #</option>
                        <option value="wpm">Sort: Highest WPM</option>
                        <option value="difficulty">Sort: Difficulty</option>
                        <option value="category">Sort: Category</option>
                    </select>

                    <span className="text-dimmed text-xs font-mono ml-auto">
                        Showing <strong className="text-text">{filtered.length}</strong> problems
                    </span>
                </div>

                {/* Category Quick Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {categories.map(cat => {
                        const count = filtered.filter(p => p.category === cat.id).length;
                        if (count === 0 && selectedCategory !== cat.id) return null;
                        const isSelected = selectedCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                                    isSelected
                                        ? 'bg-primary/20 text-primary border border-primary/40 font-bold'
                                        : 'bg-surface/60 text-dimmed hover:text-text border border-border/40'
                                }`}
                            >
                                <span style={{ color: cat.color }}>{cat.icon}</span>
                                <span>{cat.name}</span>
                                <span className="text-[10px] opacity-60">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Problem List */}
            <div className="px-8 max-w-6xl mx-auto">
                <div className="grid gap-2">
                    {filtered.map(problem => {
                        const prog = progress[problem.id];
                        const catInfo = getCategoryInfo(problem.category);

                        return (
                            <div
                                key={problem.id}
                                onClick={() => onSelectProblem(problem)}
                                className="flex items-center gap-4 bg-surface hover:bg-surface-hover border border-border hover:border-primary/50 rounded-xl px-5 py-3.5 transition-all cursor-pointer group shadow-sm"
                            >
                                {/* Solved Checkmark */}
                                <div className="w-5 text-center shrink-0">
                                    {problem.solved ? (
                                        <span className="text-success text-base" title="In your solved list">✓</span>
                                    ) : (
                                        <span className="text-dimmed/30 text-xs">○</span>
                                    )}
                                </div>

                                {/* LC number */}
                                <span className="text-dimmed font-mono text-xs w-12 text-right shrink-0">
                                    {problem.leetcodeNum > 0 ? `#${problem.leetcodeNum}` : 'Algo'}
                                </span>

                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-text group-hover:text-primary transition-colors font-bold text-sm truncate">
                                            {problem.title}
                                        </span>
                                    </div>
                                </div>

                                {/* Category badge */}
                                <span
                                    className="text-xs px-2.5 py-0.5 rounded-full shrink-0 font-mono border"
                                    style={{
                                        backgroundColor: catInfo ? catInfo.color + '15' : '#333',
                                        borderColor: catInfo ? catInfo.color + '30' : '#444',
                                        color: catInfo?.color || '#888'
                                    }}
                                >
                                    {catInfo?.icon} {catInfo?.name}
                                </span>

                                {/* Difficulty */}
                                <span className={`text-[11px] uppercase tracking-wider font-bold w-16 text-center shrink-0 ${
                                    problem.difficulty === 'easy' ? 'text-success' :
                                    problem.difficulty === 'medium' ? 'text-warning' :
                                    'text-error'
                                }`}>
                                    {problem.difficulty}
                                </span>

                                {/* Practice Stats */}
                                <div className="w-32 shrink-0 text-right font-mono">
                                    {prog && prog.bestWpm > 0 ? (
                                        <div className="text-xs">
                                            <span className="text-primary font-bold">{prog.bestWpm} WPM</span>
                                            <span className="text-dimmed text-[10px] ml-1.5">({prog.bestAccuracy}%)</span>
                                        </div>
                                    ) : (
                                        <span className="text-dimmed/40 text-xs">unpracticed</span>
                                    )}
                                </div>

                                {/* Attempt pill */}
                                <div className="w-10 shrink-0 text-right">
                                    {prog && prog.attempts > 0 ? (
                                        <span className="text-[11px] font-mono text-dimmed px-1.5 py-0.5 bg-bg rounded">
                                            ×{prog.attempts}
                                        </span>
                                    ) : null}
                                </div>

                                {/* Start Arrow */}
                                <span className="text-dimmed group-hover:text-primary transition-colors text-sm pl-2">
                                    →
                                </span>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="text-center py-16 bg-surface/30 rounded-2xl border border-border">
                            <p className="text-text font-bold mb-1">No problems match your filter</p>
                            <p className="text-dimmed text-xs">Try clearing search or switching categories</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
