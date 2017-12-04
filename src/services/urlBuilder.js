function addParam(index, key, value) {
    return (index === 0 ? '&' : '') + `${key}=${value}`;
}

export function addGetParams(url, params = {}) {
    if (typeof url !== 'string') {
        throw 'The url param should be a string';
    }
    const keys = Object.keys(params);
    return keys.length === 0
        ? url
        : keys.reduce(
              (acc, cur, index) =>
                  acc + addParam(index, cur, String(params[cur])),
              `${url}?`,
          );
}
