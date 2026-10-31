import { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/sound';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
    mode: 'lenient', // 'lenient' | 'strict'
    autoIndent: true, // LeetCode / Monaco style
    autoCloseBrackets: true, // Auto close () {} [] ""
    soundEnabled: true,
    fontSize: 16,
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('dsa-typeracer-settings');
            return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('dsa-typeracer-settings', JSON.stringify(settings));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
        sound.enabled = settings.soundEnabled;
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSetting }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
    return ctx;
}

