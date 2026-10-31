import { formatTime } from '../utils/metrics';

export default function ResultsScreen({
    problem,
    wpm,
    accuracy,
    time,
    wpmHistory = [],
    prevBest,
    isEarlyFinish,
    progress,
    charsTyped,
    totalChars,
    onRetry,
    onNext,
    onBack
}) {
    const wpmDelta = prevBest ? wpm - prevBest.bestWpm : null;
    const accDelta = prevBest ? accuracy - prevBest.bestAccuracy : null;

    const maxWpm = Math.max(...(wpmHistory.map(h => h.wpm) || [1]), 1);
    const sparklineHeight = 50;

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4 animate-fade-in font-mono">
            <div className="bg-surface/90 border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl backdrop-blur-md">
                {/* Header Badge */}
                <div className="text-center mb-6">
                    <div className="text-3xl mb-2">{isEarlyFinish ? '⏱️' : '🏆'}</div>
                    <h2 className="text-2xl font-black text-text tracking-tight">
                        {isEarlyFinish ? 'Session Ended' : 'Completed!'}
                    </h2>
                    <p className="text-dimmed text-xs mt-1">
                        {problem.title} {problem.leetcodeNum > 0 ? `(#${problem.leetcodeNum})` : ''}
                    </p>
                    {isEarlyFinish && (
                        <div className="inline-block mt-2 px-2.5 py-0.5 bg-warning/15 border border-warning/30 rounded-full text-warning text-[11px] font-bold">
                            {progress}% completed ({charsTyped}/{totalChars} chars)
                        </div>
                    )}
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-bg/70 border border-border/60 rounded-xl p-3.5 text-center">
                        <div className="text-dimmed text-[10px] uppercase tracking-wider font-bold mb-0.5">Speed</div>
                        <div className="text-primary font-black text-2xl">{wpm}</div>
                        <div className="text-[10px] text-dimmed">WPM</div>
                        {wpmDelta !== null && wpmDelta !== 0 && (
                            <div className={`text-[10px] font-bold mt-1 ${wpmDelta > 0 ? 'text-success' : 'text-error'}`}>
                                {wpmDelta > 0 ? '↑+' : '↓'}{wpmDelta} vs PB
                            </div>
                        )}
                    </div>

                    <div className="bg-bg/70 border border-border/60 rounded-xl p-3.5 text-center">
                        <div className="text-dimmed text-[10px] uppercase tracking-wider font-bold mb-0.5">Accuracy</div>
                        <div className={`font-black text-2xl ${
                            accuracy >= 95 ? 'text-success' : accuracy >= 85 ? 'text-warning' : 'text-error'
                        }`}>
                            {accuracy}%
                        </div>
                        <div className="text-[10px] text-dimmed">Precision</div>
                        {accDelta !== null && accDelta !== 0 && (
                            <div className={`text-[10px] font-bold mt-1 ${accDelta > 0 ? 'text-success' : 'text-error'}`}>
                                {accDelta > 0 ? '↑+' : '↓'}{accDelta.toFixed(1)}%
                            </div>
                        )}
                    </div>

                    <div className="bg-bg/70 border border-border/60 rounded-xl p-3.5 text-center">
                        <div className="text-dimmed text-[10px] uppercase tracking-wider font-bold mb-0.5">Time</div>
                        <div className="text-text font-black text-2xl">{formatTime(time)}</div>
                        <div className="text-[10px] text-dimmed">Elapsed</div>
                    </div>
                </div>

                {/* Rolling WPM Sparkline */}
                {wpmHistory.length > 1 && (
                    <div className="bg-bg/50 border border-border/50 rounded-xl p-3.5 mb-6">
                        <div className="flex justify-between items-center text-[10px] text-dimmed font-bold uppercase tracking-wider mb-2">
                            <span>Speed Curve</span>
                            <span className="text-primary">{maxWpm} WPM peak</span>
                        </div>
                        <svg viewBox={`0 0 ${wpmHistory.length * 10} ${sparklineHeight}`} className="w-full h-14">
                            <polyline
                                fill="none"
                                stroke="#00d4ff"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={wpmHistory.map((h, i) =>
                                    `${i * 10},${sparklineHeight - (h.wpm / maxWpm) * (sparklineHeight - 10)}`
                                ).join(' ')}
                            />
                        </svg>
                    </div>
                )}

                {/* Personal Record Comparison */}
                {prevBest && prevBest.bestWpm > 0 && (
                    <div className="bg-bg/50 border border-border/40 rounded-xl p-2.5 mb-6 text-center text-xs text-dimmed">
                        Personal Best: <strong className="text-primary font-bold">{prevBest.bestWpm} WPM</strong> · Attempt #{prevBest.attempts}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2.5">
                    <button
                        onClick={onRetry}
                        className="flex-1 bg-surface-hover hover:bg-border text-text py-3 rounded-xl font-bold text-sm transition-all border border-border"
                    >
                        ↻ Retry
                    </button>
                    {onNext && (
                        <button
                            onClick={onNext}
                            className="flex-1 bg-primary hover:bg-primary/90 text-black py-3 rounded-xl font-bold text-sm transition-all shadow-[0_0_12px_rgba(0,212,255,0.25)]"
                        >
                            Next Problem →
                        </button>
                    )}
                    <button
                        onClick={onBack}
                        className="px-4 bg-surface hover:bg-surface-hover text-dimmed hover:text-text py-3 rounded-xl font-bold text-sm transition-all border border-border"
                    >
                        Library
                    </button>
                </div>
            </div>
        </div>
    );
}
