import localDb from './localDb';

/**
 * Handles login against the local (in-browser) data store. Accepts either a
 * username or an email as the identifier — the local db resolves both.
 */
class LoginFilter {
    static async login({ identifier, password }) {
        return localDb.login({ identifier, password });
    }
}

export default LoginFilter;
