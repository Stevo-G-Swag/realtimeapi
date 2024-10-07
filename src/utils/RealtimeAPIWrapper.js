
class RealtimeAPIWrapper {
    constructor(apiKey, model = 'gpt-4o-realtime-preview-2024-10-01') {
        this.apiKey = apiKey;
        this.model = model;
        this.ws = null;
        this.isConnected = false;
        this.eventListeners = {
            open: [],
            message: [],
            error: [],
            close: []
        };
    }

    connect() {
        const url = `wss://api.openai.com/v1/realtime?model=${this.model}`;
        this.ws = new WebSocket(url, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'OpenAI-Beta': 'realtime=v1'
            }
        });

        this.ws.on('open', () => {
            this.isConnected = true;
            this._triggerEvent('open');
        });

        this.ws.on('message', (message) => {
            const parsedMessage = JSON.parse(message.toString());
            this._triggerEvent('message', parsedMessage);
        });

        this.ws.on('error', (error) => {
            this._triggerEvent('error', error);
        });

        this.ws.on('close', () => {
            this.isConnected = false;
            this._triggerEvent('close');
        });
    }

    sendMessage(eventType, content) {
        if (!this.isConnected) {
            console.error('WebSocket is not connected.');
            return;
        }

        const event = {
            type: eventType,
            ...content
        };

        this.ws.send(JSON.stringify(event));
    }

    sendTextMessage(text) {
        this.sendMessage('conversation.item.create', {
            item: {
                type: 'message',
                role: 'user',
                content: [
                    {
                        type: 'input_text',
                        text: text
                    }
                ]
            }
        });
    }

    sendAudioMessage(base64Audio) {
        this.sendMessage('conversation.item.create', {
            item: {
                type: 'message',
                role: 'user',
                content: [
                    {
                        type: 'input_audio',
                        audio: base64Audio
                    }
                ]
            }
        });
    }

    requestResponse() {
        this.sendMessage('response.create', {});
    }

    on(eventType, callback) {
        if (this.eventListeners[eventType]) {
            this.eventListeners[eventType].push(callback);
        } else {
            console.error(`Unsupported event type: ${eventType}`);
        }
    }

    _triggerEvent(eventType, data) {
        if (this.eventListeners[eventType]) {
            this.eventListeners[eventType].forEach(callback => callback(data));
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default RealtimeAPIWrapper;
