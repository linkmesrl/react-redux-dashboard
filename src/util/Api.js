import { fetchUrl } from 'util/helpers';

export const appConfigs = {
  apiHost: 'http://localhost:3001',
  refreshInterval: 15000
};

export const Api = {
  fetchData: (params) => {
    const { apiHost } = appConfigs;
    const { endpoint } = params;
    return fetchUrl(`${apiHost}${endpoint}`)
    .then(result => ({result}))
    .catch(error => ({error}));
  }
}
