import { useState, useCallback, useRef, useEffect } from 'react';
import { sound } from '../utils/sound';

const BRACKET_PAIRS = {
    '(': ')',
    '{': '}',
    '[': ']',
    '"': '"',
};

const CLOSING_BRACKETS = new Set([')', '}', ']', '"']);

export function useTyping(targetCode, settings = {}) {
    const {
        mode = 'lenient', // 'lenient' | 'strict'
        autoIndent = true,
        autoCloseBrackets = true,
        soundEnabled = true,
    } = settings;

    const [typed, setTyped] = useState('');
    const [errors, setErrors] = useState(new Set());
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isEarlyFinish, setIsEarlyFinish] = useState(false);
    const [wpmHistory, setWpmHistory] = useState([]);
    const wpmIntervalRef = useRef(null);

    const reset = useCallback(() => {
        setTyped('');
        setErrors(new Set());
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
        setStartTime(null);
        setEndTime(null);
        setIsComplete(false);
        setIsEarlyFinish(false);
        setWpmHistory([]);
        if (wpmIntervalRef.current) {
            clearInterval(wpmIntervalRef.current);
            wpmIntervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        reset();
    }, [targetCode, reset]);

    // Live rolling WPM sampling
    useEffect(() => {
        if (startTime && !isComplete) {
            wpmIntervalRef.current = setInterval(() => {
                const elapsedMin = (Date.now() - startTime) / 60000;
                if (elapsedMin > 0) {
                    const currentWpm = Math.round((typed.length / 5) / elapsedMin);
                    setWpmHistory(prev => [...prev, { time: Date.now() - startTime, wpm: currentWpm }]);
                }
            }, 1000);
            return () => {
                if (wpmIntervalRef.current) {
                    clearInterval(wpmIntervalRef.current);
                }
            };
        }
    }, [startTime, isComplete, typed.length]);

    // End session at any point
    const finishEarly = useCallback(() => {
        if (!startTime && typed.length === 0) return;
        setEndTime(Date.now());
        setIsComplete(true);
        setIsEarlyFinish(true);
        if (soundEnabled) sound.playSuccess();
    }, [startTime, typed.length, soundEnabled]);

    const handleKeyDown = useCallback((e) => {
        if (isComplete) return;

        // Allow Ctrl+Enter to finish early at any point
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            finishEarly();
            return;
        }

        if (e.ctrlKey || e.metaKey || e.altKey) return;

        // Prevent default browser scrolling, tab focus hopping, enter submit
        if (e.key === 'Tab' || e.key === ' ' || e.key === 'Enter' || e.key === 'Backspace' || e.key.length === 1) {
            e.preventDefault();
        } else {
            return;
        }

        const currentPos = typed.length;
        if (!startTime) {
            setStartTime(Date.now());
        }

        // BACKSPACE HANDLING
        if (e.key === 'Backspace') {
            if (typed.length > 0) {
                let deleteCount = 1;
                const lastChar = typed[typed.length - 1];
                if (lastChar === ' ') {
                    let spacesCount = 0;
                    for (let i = typed.length - 1; i >= 0 && typed[i] === ' '; i--) {
                        spacesCount++;
                    }
                    if (spacesCount > 0 && (typed[typed.length - spacesCount - 1] === '\n' || typed.length === spacesCount)) {
                        deleteCount = Math.min(spacesCount, 4);
                    }
                }

                const newLength = typed.length - deleteCount;
                const newTyped = typed.slice(0, newLength);
                setTyped(newTyped);
                setErrors(prev => {
                    const next = new Set(prev);
                    for (let i = newLength; i < typed.length; i++) {
                        next.delete(i);
                    }
                    return next;
                });
                if (soundEnabled) sound.playKey();
            }
            return;
        }

        // TAB KEY (LeetCode: indents 4 spaces)
        if (e.key === 'Tab') {
            let newTyped = typed;
            let newCorrect = correctKeystrokes;
            let newTotal = totalKeystrokes;
            const newErrors = new Set(errors);

            for (let i = 0; i < 4; i++) {
                const pos = newTyped.length;
                if (pos >= targetCode.length) break;
                const expected = targetCode[pos];
                newTotal++;
                if (expected === ' ') {
                    newCorrect++;
                } else if (mode === 'lenient') {
                    newErrors.add(pos);
                } else {
                    break;
                }
                newTyped += ' ';
            }

            setTyped(newTyped);
            setCorrectKeystrokes(newCorrect);
            setTotalKeystrokes(newTotal);
            setErrors(newErrors);
            if (soundEnabled) sound.playKey();

            if (newTyped.length >= targetCode.length) {
                setEndTime(Date.now());
                setIsComplete(true);
                if (soundEnabled) sound.playSuccess();
            }
            return;
        }

        // ENTER KEY (LeetCode Auto-Indent)
        if (e.key === 'Enter') {
            if (currentPos >= targetCode.length) return;

            let newTyped = typed;
            let newCorrect = correctKeystrokes;
            let newTotal = totalKeystrokes + 1;
            const newErrors = new Set(errors);

            // Eat any remaining spaces on the current line if user pressed enter at end of code
            let pos = newTyped.length;
            while (pos < targetCode.length && targetCode[pos] === ' ') {
                const nextNewline = targetCode.indexOf('\n', pos);
                const nextNonSpace = targetCode.slice(pos).search(/\S/);
                if (nextNonSpace === -1 || (nextNewline !== -1 && pos + nextNonSpace > nextNewline)) {
                    newTyped += ' ';
                    newCorrect++;
                    pos++;
                } else {
                    break;
                }
            }

            // Match newline
            if (pos < targetCode.length && targetCode[pos] === '\n') {
                newTyped += '\n';
                newCorrect++;
            } else {
                newTyped += '\n';
                if (mode === 'lenient') {
                    newErrors.add(pos);
                } else {
                    if (soundEnabled) sound.playError();
                    return;
                }
            }

            // AUTO-INDENT: automatically insert the leading spaces of the next line
            if (autoIndent) {
                let nextPos = newTyped.length;
                let indentCount = 0;
                while (nextPos < targetCode.length && targetCode[nextPos] === ' ') {
                    indentCount++;
                    nextPos++;
                }
                if (indentCount > 0) {
                    for (let i = 0; i < indentCount; i++) {
                        newTyped += ' ';
                    }
                    newCorrect += indentCount;
                    newTotal += indentCount;
                }
            }

            setTyped(newTyped);
            setCorrectKeystrokes(newCorrect);
            setTotalKeystrokes(newTotal);
            setErrors(newErrors);
            if (soundEnabled) sound.playKey();

            if (newTyped.length >= targetCode.length) {
                setEndTime(Date.now());
                setIsComplete(true);
                if (soundEnabled) sound.playSuccess();
            }
            return;
        }

        // REGULAR CHARACTER
        if (e.key.length === 1) {
            if (currentPos >= targetCode.length) return;

            const expected = targetCode[currentPos];
            let newTyped = typed;
            let newCorrect = correctKeystrokes;
            let newTotal = totalKeystrokes + 1;
            const newErrors = new Set(errors);

            // AUTO-CLOSE BRACKET OVERTYPE
            if (CLOSING_BRACKETS.has(e.key) && expected === e.key) {
                newTyped += e.key;
                newCorrect++;
                setTyped(newTyped);
                setCorrectKeystrokes(newCorrect);
                setTotalKeystrokes(newTotal);
                if (soundEnabled) sound.playKey();

                if (newTyped.length >= targetCode.length) {
                    setEndTime(Date.now());
                    setIsComplete(true);
                    if (soundEnabled) sound.playSuccess();
                }
                return;
            }

            // MATCH OR MISMATCH
            if (e.key === expected) {
                newTyped += e.key;
                newCorrect++;

                // AUTO-CLOSE BRACKET GENERATION
                if (autoCloseBrackets && BRACKET_PAIRS[e.key]) {
                    const closing = BRACKET_PAIRS[e.key];
                    const nextTargetPos = newTyped.length;
                    if (nextTargetPos < targetCode.length && targetCode[nextTargetPos] === closing) {
                        newTyped += closing;
                        newCorrect++;
                        newTotal++;
                    }
                }

                if (soundEnabled) sound.playKey();
            } else {
                if (mode === 'strict') {
                    setTotalKeystrokes(newTotal);
                    if (soundEnabled) sound.playError();
                    return;
                } else {
                    newTyped += e.key;
                    newErrors.add(currentPos);
                    if (soundEnabled) sound.playError();
                }
            }

            setTyped(newTyped);
            setCorrectKeystrokes(newCorrect);
            setTotalKeystrokes(newTotal);
            setErrors(newErrors);

            if (newTyped.length >= targetCode.length) {
                setEndTime(Date.now());
                setIsComplete(true);
                if (soundEnabled) sound.playSuccess();
            }
        }
    }, [typed, targetCode, errors, correctKeystrokes, totalKeystrokes, startTime, isComplete, mode, autoIndent, autoCloseBrackets, soundEnabled, finishEarly]);

    const elapsed = startTime
        ? ((endTime || Date.now()) - startTime) / 60000
        : 0;
    const wpm = elapsed > 0 ? Math.round((typed.length / 5) / elapsed) : 0;
    const accuracy = totalKeystrokes > 0
        ? Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10
        : 100;
    const progress = targetCode.length > 0
        ? Math.min(100, Math.round((typed.length / targetCode.length) * 100))
        : 0;
    const elapsedSeconds = startTime
        ? Math.round(((endTime || Date.now()) - startTime) / 1000)
        : 0;

    return {
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
        reset,
    };
}
