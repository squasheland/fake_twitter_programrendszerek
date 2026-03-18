class BackendError extends Error {
    constructor(message: string = 'Internal server error', public statusCode: number = 500) {
        super(message);
        this.name = 'BackendError';
    }
}

export default BackendError;