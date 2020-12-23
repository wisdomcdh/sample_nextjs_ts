import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';

function MockApi() {
    const mock = new MockAdapter(axios);
    mock.onAny().reply(config => {
        const jsonUrl = config.method.toUpperCase() + config.url.replace(/\//gi, '_') + '.json';
        return new Promise(function (resolve, reject) {
            import('./api/' + jsonUrl).then(module => {
                console.warn('api was mocked: ' + config.url + ' => /mock/api/' + jsonUrl);
                resolve([200, module.default]);
            }).catch(() => {
                console.error('404 - not found: ' + config.url);
                resolve([404, 'not found']);
            });
        });
    });
}
MockApi();
export default MockApi;