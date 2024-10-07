
import React from 'react';

const LogsPanel = ({ logs }) => {
    return (
        <div className="logs-panel">
            <h2>Logs</h2>
            {logs.length === 0 ? (
                <p>Logs will appear here</p>
            ) : (
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LogsPanel;
