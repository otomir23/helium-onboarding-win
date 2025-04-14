declare const chrome: {
    send(message: string, params?: any[]): void,
    getVariableValue(variable: string): string,
};
