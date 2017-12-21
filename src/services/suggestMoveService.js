import fetch from 'isomorphic-fetch';
import fetchErrorsHandler from './fetchErrorsHandler';
import { addGetParams } from './urlBuilder';

import config from '../config';
const DEFAULT_BASE_URL = config.apiUrl.suggest;

export const suggestFactory = (baseUrl = DEFAULT_BASE_URL) => (
    grid,
    resolvedGrid,
) => {
    const url = addGetParams(`${baseUrl}/suggest`, {
        grid: JSON.stringify(grid),
        initial_grid: JSON.stringify(resolvedGrid),
    });
    return fetch(url, {
        method: 'GET',
    })
        .then(fetchErrorsHandler)
        .then(res => res.json());
};
