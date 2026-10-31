import { useSettings } from '../context/SettingsContext';

export default function SettingsModal({ isOpen, onClose }) {
    const { settings, updateSetting } = useSettings();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                    <h3 className="text-xl font-bold text-text flex items-center gap-2">
                        <span>⚙️</span> Practice Settings
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-dimmed hover:text-text text-xl font-mono px-2 py-1 rounded transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6 py-6">
                    {/* Typing Mode */}
                    <div>
                        <label className="text-text font-bold text-sm block mb-1">Typing Mode</label>
                        <p className="text-dimmed text-xs mb-3">
                            Lenient marks mistakes in red but lets you keep typing. Strict forces you to fix errors before advancing.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => updateSetting('mode', 'lenient')}
                                className={`py-2 px-3 rounded-lg text-sm font-bold border transition-colors ${
                                    settings.mode === 'lenient'
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'bg-bg border-border text-dimmed hover:text-text'
                                }`}
                            >
                                🟢 Lenient (Default)
                            </button>
                            <button
                                onClick={() => updateSetting('mode', 'strict')}
                                className={`py-2 px-3 rounded-lg text-sm font-bold border transition-colors ${
                                    settings.mode === 'strict'
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'bg-bg border-border text-dimmed hover:text-text'
                                }`}
                            >
                                🔴 Strict
                            </button>
                        </div>
                    </div>

                    {/* Auto Indent */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-text font-bold text-sm">LeetCode Auto-Indent</div>
                            <div className="text-dimmed text-xs">Pressing Enter auto-positions cursor at the next line's code</div>
                        </div>
                        <button
                            onClick={() => updateSetting('autoIndent', !settings.autoIndent)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                settings.autoIndent ? 'bg-primary' : 'bg-dimmed/40'
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.autoIndent ? 'left-6.5' : 'left-0.5'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Auto Close Brackets */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-text font-bold text-sm">Auto-Close Brackets</div>
                            <div className="text-dimmed text-xs">Auto generates and steps over () {'{}'} [] ""</div>
                        </div>
                        <button
                            onClick={() => updateSetting('autoCloseBrackets', !settings.autoCloseBrackets)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                settings.autoCloseBrackets ? 'bg-primary' : 'bg-dimmed/40'
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.autoCloseBrackets ? 'left-6.5' : 'left-0.5'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Mechanical Sound */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-text font-bold text-sm">Mechanical Key Audio</div>
                            <div className="text-dimmed text-xs">Subtle tactile click feedback for each keystroke</div>
                        </div>
                        <button
                            onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                settings.soundEnabled ? 'bg-primary' : 'bg-dimmed/40'
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                    settings.soundEnabled ? 'left-6.5' : 'left-0.5'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Font Size */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-text font-bold text-sm">Code Font Size</label>
                            <span className="text-primary text-xs font-mono font-bold">{settings.fontSize}px</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {[14, 16, 18].map(size => (
                                <button
                                    key={size}
                                    onClick={() => updateSetting('fontSize', size)}
                                    className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                                        settings.fontSize === size
                                            ? 'bg-primary/20 border-primary text-primary'
                                            : 'bg-bg border-border text-dimmed hover:text-text'
                                    }`}
                                >
                                    {size}px
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-primary hover:bg-primary/80 text-black px-5 py-2 rounded-xl font-bold text-sm transition-colors"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
}

