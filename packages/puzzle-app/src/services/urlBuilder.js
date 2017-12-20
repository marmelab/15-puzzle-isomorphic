import qs from 'qs';

export function addGetParams(url, params = {}) {
    if (typeof url !== 'string') {
        throw 'The url param should be a string';
    }

    const keys = Object.keys(params);
    return keys.length === 0
        ? url
        : url + qs.stringify(params, { addQueryPrefix: true, encode: false });
}
