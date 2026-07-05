import localDb from '../services/localDb';

export const isAuthenticated = () => {
    return !!localDb.getSession();
};

export const getCurrentUser = () => localDb.getSession();
