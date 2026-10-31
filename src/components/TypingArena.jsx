import { useEffect, useRef, useState, useMemo } from 'react';
import { useTyping } from '../hooks/useTyping';
import { useSettings } from '../context/SettingsContext';
import { tokenizeCpp, getTokenClass } from '../utils/highlighting';
import { formatTime, saveProgress, getProgressData } from '../utils/metrics';
import ResultsScreen from './ResultsScreen';
import SettingsModal from './SettingsModal';

export default function TypingArena({ problem, onBack, onNext }) {
    const { settings } = useSettings();
    const {
        typed,
        errors,
        wpm,
        accuracy,
        progress,
        elapsedSeconds,
        isComplete,
        isEarlyFinish,
        startTime,
        wpmHistory,
        handleKeyDown,
        finishEarly,
        reset
    } = useTyping(problem.code, settings);

    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [savedResult, setSavedResult] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const prevProgress = getProgressData(problem.id);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, [problem]);

    useEffect(() => {
        if (isComplete && !savedResult) {
            // Save progress if at least some characters were typed
            if (typed.length >= 5) {
                const result = { wpm, accuracy, time: elapsedSeconds };
                saveProgress(problem.id, result);
            }
            setSavedResult(true);
            setTimeout(() => setShowResults(true), 250);
        }
    }, [isComplete, typed.length]);

    useEffect(() => {
        if (cursorRef.current) {
            cursorRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [typed]);

    const handleRetry = () => {
        reset();
        setShowResults(false);
        setSavedResult(false);
        if (containerRef.current) {
            containerRef.current.focus();
        }
    };

    const tokens = useMemo(() => tokenizeCpp(problem.code), [problem.code]);

    const charTokenMap = useMemo(() => {
        const map = [];
        tokens.forEach(token => {
            for (let i = 0; i < token.value.length; i++) {
                map.push(token.type);
            }
        });
        return map;
    }, [tokens]);

    const lines = problem.code.split('\n');

    if (showResults) {
        return (
            <ResultsScreen
                problem={problem}
                wpm={wpm}
                accuracy={accuracy}
                time={elapsedSeconds}
                wpmHistory={wpmHistory}
                prevBest={prevProgress}
                isEarlyFinish={isEarlyFinish}
                progress={progress}
                charsTyped={typed.length}
                totalChars={problem.code.length}
                onRetry={handleRetry}
                onNext={onNext}
                onBack={onBack}
            />
        );
    }

    let charIndex = 0;

    return (
        <div
            className="min-h-screen bg-bg flex flex-col font-mono select-none"
            onClick={() => containerRef.current?.focus()}
        >
            {/* Top Navigation & Live HUD */}
            <div className="flex items-center justify-between px-8 py-3.5 border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="text-dimmed hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-border"
                    >
                        <span>←</span>
                        <span>Back</span>
                    </button>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2.5">
                        <span className="text-dimmed text-xs font-bold">
                            {problem.leetcodeNum > 0 ? `#${problem.leetcodeNum}` : ''}
                        </span>
                        <h2 className="text-text font-bold text-sm tracking-tight">{problem.title}</h2>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            problem.difficulty === 'easy' ? 'bg-success/15 text-success border border-success/30' :
                            problem.difficulty === 'medium' ? 'bg-warning/15 text-warning border border-warning/30' :
                            'bg-error/15 text-error border border-error/30'
                        }`}>
                            {problem.difficulty}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Live Timer */}
                    <div className="text-center">
                        <div className="text-[10px] uppercase tracking-wider text-dimmed font-bold">Time</div>
                        <div className="text-text font-bold text-sm">{formatTime(elapsedSeconds)}</div>
                    </div>

                    {/* Live WPM */}
                    <div className="text-center">
                        <div className="text-[10px] uppercase tracking-wider text-dimmed font-bold">Speed</div>
                        <div className="text-primary font-bold text-sm">
                            {wpm} <span className="text-[10px] text-dimmed font-normal">WPM</span>
                        </div>
                    </div>

                    {/* Live Accuracy */}
                    <div className="text-center">
                        <div className="text-[10px] uppercase tracking-wider text-dimmed font-bold">Accuracy</div>
                        <div className={`font-bold text-sm ${
                            accuracy >= 95 ? 'text-success' : accuracy >= 85 ? 'text-warning' : 'text-error'
                        }`}>
                            {accuracy}%
                        </div>
                    </div>

                    {/* End Session Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            finishEarly();
                        }}
                        disabled={typed.length === 0}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
                            typed.length > 0
                                ? 'bg-warning/15 hover:bg-warning/25 text-warning border-warning/40 shadow-[0_0_10px_rgba(255,165,2,0.15)] cursor-pointer'
                                : 'bg-surface/40 text-dimmed/40 border-border cursor-not-allowed'
                        }`}
                        title="End session now and view stats (or Ctrl+Enter)"
                    >
                        <span>⏹</span>
                        <span>End Session</span>
                    </button>

                    {/* Quick Settings */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsSettingsOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-dimmed hover:text-text transition-colors"
                        title="Settings"
                    >
                        ⚙️
                    </button>
                </div>
            </div>

            {/* Glowing progress bar */}
            <div className="h-1 bg-surface w-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,212,255,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Code Typing Area - Pure and distraction-free */}
            <div
                ref={containerRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="flex-1 flex justify-center outline-none cursor-text py-8 px-6 overflow-y-auto"
            >
                <div className="w-full max-w-4xl">
                    <pre
                        className="leading-7 whitespace-pre font-mono transition-all"
                        style={{ fontSize: `${settings.fontSize}px` }}
                    >
                        {lines.map((line, lineIdx) => {
                            const lineStart = charIndex;
                            const lineChars = line.split('');

                            const renderedChars = lineChars.map((char, ci) => {
                                const globalIdx = lineStart + ci;
                                const tokenType = charTokenMap[globalIdx] || '';
                                const tokenClass = getTokenClass(tokenType);
                                const isTyped = globalIdx < typed.length;
                                const isCurrent = globalIdx === typed.length;
                                const isError = errors.has(globalIdx);

                                let className = tokenClass;
                                let style = {};

                                if (isTyped && !isError) {
                                    style.opacity = 0.35;
                                } else if (isTyped && isError) {
                                    className += ' bg-error/30 text-error rounded-xs';
                                }

                                return (
                                    <span
                                        key={globalIdx}
                                        ref={isCurrent ? cursorRef : null}
                                        className={`${className} relative inline-block`}
                                        style={style}
                                    >
                                        {isCurrent && (
                                            <span className="absolute -left-[1px] top-0 bottom-0 w-[2.5px] bg-primary cursor-blink rounded-full shadow-[0_0_8px_#00d4ff]" />
                                        )}
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                );
                            });

                            charIndex += line.length;
                            if (lineIdx < lines.length - 1) {
                                charIndex += 1;
                            }

                            const newlineIdx = lineStart + line.length;
                            const isCursorAtNewline = newlineIdx === typed.length && lineIdx < lines.length - 1;

                            return (
                                <div key={lineIdx} className="flex hover:bg-surface/10 rounded px-1 transition-colors">
                                    <span className="inline-block w-12 text-right pr-6 text-dimmed/40 select-none text-xs leading-7 font-mono">
                                        {lineIdx + 1}
                                    </span>
                                    <span className="flex-1">
                                        {renderedChars}
                                        {isCursorAtNewline && (
                                            <span ref={cursorRef} className="relative inline-block">
                                                <span className="absolute -left-[1px] top-0 bottom-0 w-[2.5px] bg-primary cursor-blink rounded-full shadow-[0_0_8px_#00d4ff]" />
                                                {'\u00A0'}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </pre>
                </div>
            </div>

            {/* Bottom Status & Key Hints Bar */}
            <div className="py-2.5 px-8 border-t border-border/60 bg-surface/20 flex items-center justify-between text-xs text-dimmed">
                <div className="flex items-center gap-4">
                    <span><kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] text-text font-bold">Ctrl+Enter</kbd> End & view stats</span>
                    <span>•</span>
                    <span><kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] text-text font-bold">Esc</kbd> Exit</span>
                    <span>•</span>
                    <button onClick={handleRetry} className="hover:text-primary transition-colors flex items-center gap-1">
                        <span>↻</span> Reset
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    {prevProgress && prevProgress.bestWpm > 0 && (
                        <span>PB: <strong className="text-primary">{prevProgress.bestWpm} WPM</strong> ({prevProgress.bestAccuracy}%)</span>
                    )}
                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
}
