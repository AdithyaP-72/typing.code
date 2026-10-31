import { useState, useEffect } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import Dashboard from './components/Dashboard';
import ProblemBrowser from './components/ProblemBrowser';
import TypingArena from './components/TypingArena';
import SettingsModal from './components/SettingsModal';
import { problems } from './data/problems';

function MainApp() {
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'browser' | 'arena'
    const [currentProblem, setCurrentProblem] = useState(null);
    const [browserFilter, setBrowserFilter] = useState('solved');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSelectProblem = (problem) => {
        setCurrentProblem(problem);
        setView('arena');
    };

    const handleBrowse = (filter = 'all') => {
        setBrowserFilter(filter);
        setView('browser');
    };

    const handleNextProblem = () => {
        if (!currentProblem) return;
        const currentIdx = problems.findIndex(p => p.id === currentProblem.id);
        const nextIdx = (currentIdx + 1) % problems.length;
        setCurrentProblem(problems[nextIdx]);
    };

    // Global keyboard listener for Esc key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isSettingsOpen) {
                    setIsSettingsOpen(false);
                } else if (view === 'arena') {
                    setView('browser');
                } else if (view === 'browser') {
                    setView('dashboard');
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [view, isSettingsOpen]);

    if (view === 'arena' && currentProblem) {
        return (
            <TypingArena
                problem={currentProblem}
                onBack={() => setView('browser')}
                onNext={handleNextProblem}
            />
        );
    }

    return (
        <div className="min-h-screen bg-bg flex flex-col font-mono text-text">
            {/* Top Global Navbar */}
            <header className="border-b border-border bg-surface/70 backdrop-blur-md sticky top-0 z-30 px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setView('dashboard')}
                        className="text-left group cursor-pointer"
                    >
                        <span className="font-black text-xl tracking-tight text-text group-hover:text-primary transition-colors">
                            DSA <span className="text-primary font-mono">TypeRacer</span>
                        </span>
                    </button>

                    <nav className="flex items-center gap-1.5">
                        <button
                            onClick={() => setView('dashboard')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                view === 'dashboard'
                                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                                    : 'text-dimmed hover:text-text border border-transparent'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => handleBrowse('all')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                view === 'browser'
                                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                                    : 'text-dimmed hover:text-text border border-transparent'
                            }`}
                        >
                            Library
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            const solvedList = problems.filter(p => p.solved);
                            const random = solvedList[Math.floor(Math.random() * solvedList.length)];
                            handleSelectProblem(random);
                        }}
                        className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                    >
                        Quick Drill
                    </button>

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-2 rounded-xl bg-surface hover:bg-surface-hover border border-border text-dimmed hover:text-text transition-colors cursor-pointer"
                        title="Settings"
                    >
                        ⚙️
                    </button>
                </div>
            </header>

            {/* View body */}
            <main className="flex-1">
                {view === 'dashboard' ? (
                    <Dashboard
                        onSelectProblem={handleSelectProblem}
                        onBrowse={handleBrowse}
                    />
                ) : (
                    <ProblemBrowser
                        initialFilter={browserFilter}
                        onSelectProblem={handleSelectProblem}
                    />
                )}
            </main>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
}

export default function App() {
    return (
        <SettingsProvider>
            <MainApp />
        </SettingsProvider>
    );
}
