import BackendError from "./backendError.js";

class AuthError extends BackendError {
    constructor(message: string) {
        super(message, 401);
        this.name = 'AuthError';
    }
}

export default AuthError;