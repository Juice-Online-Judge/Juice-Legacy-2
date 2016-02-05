import { connectEndpoint } from 'fetch-plus';
import plusJson from 'fetch-plus-json';

let api = connectEndpoint('/api')
  .addMiddleware(plusJson());

export default api;
