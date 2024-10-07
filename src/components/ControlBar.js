
import React from 'react';

const ControlBar = () => {
    return (
        <div className="control-bar">
            <button className="start-session">Start session</button>
            <select className="microphone-select">
                <option>Microphone 1</option>
                <option>Microphone 2</option>
            </select>
            <button className="toggle-logs">Logs</button>
            <button className="toggle-settings">Settings</button>
        </div>
    );
};

export default ControlBar;
