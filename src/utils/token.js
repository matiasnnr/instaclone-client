import { TOKEN } from './constants';
import jwtDecode from 'jwt-decode';

export default function setToken(tokenValue) {
    localStorage.setItem(TOKEN, tokenValue);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
    return jwtDecode(token);
}

export function removeToken() {
    localStorage.removeItem(TOKEN);
}