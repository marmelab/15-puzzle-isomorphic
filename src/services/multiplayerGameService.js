import config from '../config';

const DEFAULT_HEADER_JSON = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const DEFAULT_BASE_URL = config.apiUrl;

function handleErrors(res) {
    if (!res.ok) {
        return Promise.reject(res.statusText);
    }
    return res;
}

export const newGame = (baseUrl = DEFAULT_BASE_URL) => (mode = 'multi') => {
    const url = `${baseUrl}/game`;
    const method = 'POST';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON);

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify({
            mode,
        }),
    })
        .then(handleErrors)
        .then(res => res.json());
};

export const game = (baseUrl = DEFAULT_BASE_URL) => (id, token) => {
    const url = `${baseUrl}/game/${id}`;
    const method = 'GET';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json());
};

export const move = (baseUrl = DEFAULT_BASE_URL) => (id, token, tile) => {
    const url = `${baseUrl}/game/${id}/move/${tile}`;
    const method = 'PUT';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json());
};

export const cancel = (baseUrl = DEFAULT_BASE_URL) => (id, token) => {
    const url = `${baseUrl}/game/${id}`;
    const method = 'DELETE';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json());
};

export const join = (baseUrl = DEFAULT_BASE_URL) => id => {
    const url = `${baseUrl}/game/${id}/join`;
    const method = 'POST';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON);

    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json());
};

export const games = (baseUrl = DEFAULT_BASE_URL) => () => {
    const url = `${baseUrl}/games/open`;
    const method = 'GET';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON);

    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json());
};
