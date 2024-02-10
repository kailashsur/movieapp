'use client'

const storeInSession = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const lookInSession = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
}

const removeFromSession = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

const logOutUser = () => {
    if (typeof window !== 'undefined') {
        localStorage.clear();
    }
}

export { storeInSession, lookInSession, removeFromSession, logOutUser }
