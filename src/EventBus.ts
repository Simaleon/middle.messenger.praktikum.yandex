type eventCallback = (...args: any[]) => any | void;

export default class EventBus {
    private readonly listeners: Record<string, eventCallback[]> = {};

    on(event: string, callback: eventCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: eventCallback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(
                listener => listener !== callback
            );
        }
    }

    emit(event: string, ...args: any[]) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener: eventCallback) => {
                listener(...args);
            });
        }
    }
}
