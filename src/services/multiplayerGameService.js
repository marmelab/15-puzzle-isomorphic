import fetch from 'isomorphic-fetch';
import fetchErrorsHandler from './fetchErrorsHandler';
import config from '../config';

const DEFAULT_BASE_URL = config.apiUrl.multiplayer;

const DEFAULT_HEADER_JSON = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const newGameFactory = (baseUrl = DEFAULT_BASE_URL) => (
    mode = 'multi',
) => {
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
        .then(fetchErrorsHandler)
        .then(res => res.json());
};

export const gameFactory = (baseUrl = DEFAULT_BASE_URL) => (id, token) => {
    const url = `${baseUrl}/game/${id}`;
    const method = 'GET';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};

export const moveFactory = (baseUrl = DEFAULT_BASE_URL) => (
    id,
    token,
    tile,
) => {
    const url = `${baseUrl}/game/${id}/move/${tile}`;
    const method = 'PUT';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};

export const cancelFactory = (baseUrl = DEFAULT_BASE_URL) => (id, token) => {
    const url = `${baseUrl}/game/${id}`;
    const method = 'DELETE';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON, {
        Authorization: `Bearer ${token}`,
    });

    return fetch(url, {
        method,
        headers,
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};

export const joinFactory = (baseUrl = DEFAULT_BASE_URL) => id => {
    const url = `${baseUrl}/game/${id}/join`;
    const method = 'POST';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON);

    return fetch(url, {
        method,
        headers,
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};

export const gamesFactory = (baseUrl = DEFAULT_BASE_URL) => () => {
    const url = `${baseUrl}/games/open`;
    const method = 'GET';
    const headers = Object.assign({}, DEFAULT_HEADER_JSON);

    return fetch(url, {
        method,
        headers,
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};
