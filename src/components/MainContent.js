
import React from 'react';

const MainContent = ({ messages }) => {
    return (
        <div className="main-content">
            <h2>Conversation</h2>
            {messages.length === 0 ? (
                <p>Conversation will appear here</p>
            ) : (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{JSON.stringify(message)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MainContent;
