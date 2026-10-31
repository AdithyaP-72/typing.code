import { useSettings } from '../context/SettingsContext';

export default function SettingsModal({ isOpen, onClose }) {
    const { settings, updateSetting } = useSettings();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in font-mono">
            <div className="bg-[#101118] border border-[#232738] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#1f2230]">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>⚙️</span> Practice Settings
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-[#6c7087] hover:text-white text-lg font-mono px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6 py-5">
                    {/* Typing Mode */}
                    <div>
                        <label className="text-white font-bold text-xs uppercase tracking-wider block mb-1">Typing Mode</label>
                        <p className="text-[#6c7087] text-xs mb-3">
                            Lenient marks mistakes in red without halting cursor. Strict forces you to fix errors before advancing.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => updateSetting('mode', 'lenient')}
                                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                    settings.mode === 'lenient'
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'bg-[#09090d] border-[#1b1d28] text-[#6c7087] hover:text-white'
                                }`}
                            >
                                🟢 Lenient (Default)
                            </button>
                            <button
                                onClick={() => updateSetting('mode', 'strict')}
                                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                    settings.mode === 'strict'
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'bg-[#09090d] border-[#1b1d28] text-[#6c7087] hover:text-white'
                                }`}
                            >
                                🔴 Strict
                            </button>
                        </div>
                    </div>

                    {/* Auto Indent */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-bold text-xs">LeetCode Auto-Indent</div>
                            <div className="text-[#6c7087] text-[11px]">Enter auto-positions cursor at next line's code</div>
                        </div>
                        <button
                            onClick={() => updateSetting('autoIndent', !settings.autoIndent)}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                                settings.autoIndent ? 'bg-primary' : 'bg-[#2b2f42]'
                            }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                    settings.autoIndent ? 'left-6' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Auto Close Brackets */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-bold text-xs">Auto-Close Brackets</div>
                            <div className="text-[#6c7087] text-[11px]">Auto generates and steps over () {'{}'} [] ""</div>
                        </div>
                        <button
                            onClick={() => updateSetting('autoCloseBrackets', !settings.autoCloseBrackets)}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                                settings.autoCloseBrackets ? 'bg-primary' : 'bg-[#2b2f42]'
                            }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                    settings.autoCloseBrackets ? 'left-6' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Mechanical Sound */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-bold text-xs">Mechanical Key Audio</div>
                            <div className="text-[#6c7087] text-[11px]">Tactile click audio feedback</div>
                        </div>
                        <button
                            onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                                settings.soundEnabled ? 'bg-primary' : 'bg-[#2b2f42]'
                            }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                    settings.soundEnabled ? 'left-6' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Font Size */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-white font-bold text-xs">Code Font Size</label>
                            <span className="text-primary text-xs font-mono font-bold">{settings.fontSize}px</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {[14, 16, 18].map(size => (
                                <button
                                    key={size}
                                    onClick={() => updateSetting('fontSize', size)}
                                    className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                                        settings.fontSize === size
                                            ? 'bg-primary/20 border-primary text-primary'
                                            : 'bg-[#09090d] border-[#1b1d28] text-[#6c7087] hover:text-white'
                                    }`}
                                >
                                    {size}px
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-[#1f2230] flex items-center justify-between">
                    <span className="text-[11px] text-[#6c7087]">Cross-Device Cloud: Auto-syncs</span>
                    <button
                        onClick={onClose}
                        className="bg-primary hover:bg-[#20dbff] text-[#07090e] px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
}
