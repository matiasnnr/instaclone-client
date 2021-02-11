import { TOKEN } from './constants';

export default function setToken(tokenValue) {
    localStorage.setItem(TOKEN, tokenValue);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}