import api from '../services/api.js';

// API uploads live on the Express server, not on the Vite/Netlify frontend origin.
const apiOrigin = (api.defaults.baseURL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
export function mediaUrl(value) {
  if (!value) return '';
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return `${apiOrigin}${value.startsWith('/') ? value : `/${value}`}`;
}
