import { connectEndpoint } from 'fetch-plus';
import Cookies from 'js-cookie';
import plusJson from 'fetch-plus-json';
import plusCsrf from 'fetch-plus-csrf';
import cookie from './middleware/cookie';

let api = connectEndpoint('/api')
  .addMiddleware(cookie)
  .addMiddleware(plusJson())
  .addMiddleware(plusCsrf('X-CSRF-TOKEN', Cookies.get('csrf-token')));

export default api;
