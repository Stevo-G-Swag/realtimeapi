
import React, { useState, useEffect } from 'react';

const SettingsPanel = () => {
    const [systemInstructions, setSystemInstructions] = useState('');
    const [voice, setVoice] = useState('Alloy');
    const [turnDetection, setTurnDetection] = useState('Voice activity');
    const [threshold, setThreshold] = useState(0);
    const [prefixPadding, setPrefixPadding] = useState(0);
    const [silenceDuration, setSilenceDuration] = useState(0);
    const [temperature, setTemperature] = useState(0.8);
    const [maxTokens, setMaxTokens] = useState(4096);

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('settings'));
        if (savedSettings) {
            setSystemInstructions(savedSettings.systemInstructions);
            setVoice(savedSettings.voice);
            setTurnDetection(savedSettings.turnDetection);
            setThreshold(savedSettings.threshold);
            setPrefixPadding(savedSettings.prefixPadding);
            setSilenceDuration(savedSettings.silenceDuration);
            setTemperature(savedSettings.temperature);
            setMaxTokens(savedSettings.maxTokens);
        }
    }, []);

    useEffect(() => {
        const settings = {
            systemInstructions,
            voice,
            turnDetection,
            threshold,
            prefixPadding,
            silenceDuration,
            temperature,
            maxTokens
        };
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [systemInstructions, voice, turnDetection, threshold, prefixPadding, silenceDuration, temperature, maxTokens]);

    return (
        <div className="settings-panel">
            <h2>Settings</h2>
            <div>
                <label>System Instructions:</label>
                <textarea
                    value={systemInstructions}
                    onChange={(e) => setSystemInstructions(e.target.value)}
                    placeholder="Assist a real-time software developer..."
                ></textarea>
            </div>
            <div>
                <label>Voice Settings:</label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)}>
                    <option>Alloy</option>
                    <option>Echo</option>
                    <option>Shimmer</option>
                </select>
                <button>Preview</button>
            </div>
            <div>
                <label>Server Turn Detection:</label>
                <select value={turnDetection} onChange={(e) => setTurnDetection(e.target.value)}>
                    <option>Voice activity</option>
                    <option>Disabled</option>
                </select>
            </div>
            <div>
                <label>Threshold:</label>
                <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            </div>
            <div>
                <label>Prefix padding:</label>
                <input type="number" value={prefixPadding} onChange={(e) => setPrefixPadding(e.target.value)} />
            </div>
            <div>
                <label>Silence duration:</label>
                <input type="number" value={silenceDuration} onChange={(e) => setSilenceDuration(e.target.value)} />
            </div>
            <div>
                <label>Temperature:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                />
            </div>
            <div>
                <label>Max Tokens:</label>
                <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(e.target.value)} />
            </div>
        </div>
    );
};

export default SettingsPanel;
