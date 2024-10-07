
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SettingsPanel from './components/SettingsPanel';
import LogsPanel from './components/LogsPanel';
import ControlBar from './components/ControlBar';
import RealtimeAPIWrapper from './utils/RealtimeAPIWrapper';
import './App.css';

const App = () => {
    const [logs, setLogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const realtimeAPI = new RealtimeAPIWrapper(apiKey);

    useEffect(() => {
        realtimeAPI.connect();

        realtimeAPI.on('open', () => {
            setLogs(prevLogs => [...prevLogs, 'WebSocket connection opened']);
        });

        realtimeAPI.on('message', (message) => {
            setLogs(prevLogs => [...prevLogs, `Received message: ${JSON.stringify(message)}`]);
            setMessages(prevMessages => [...prevMessages, message]);
        });

        realtimeAPI.on('error', (error) => {
            setLogs(prevLogs => [...prevLogs, `WebSocket error: ${error.message}`]);
        });

        realtimeAPI.on('close', () => {
            setLogs(prevLogs => [...prevLogs, 'WebSocket connection closed']);
        });

        return () => {
            realtimeAPI.disconnect();
        };
    }, []);

    return (
        <div className="app">
            <Sidebar />
            <MainContent messages={messages} />
            <SettingsPanel />
            <LogsPanel logs={logs} />
            <ControlBar />
        </div>
    );
};

export default App;
