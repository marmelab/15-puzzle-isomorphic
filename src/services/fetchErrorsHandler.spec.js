import fetchErrorsHandler from './fetchErrorsHandler';

describe('HandleFetchErrors', () => {
    test('should return a resolved promise containing the response if ok', async () => {
        const response = {
            ok: true,
        };

        expect.assertions(1);
        return fetchErrorsHandler(response).then(result =>
            expect(result).toEqual(response),
        );
    });

    test('should return a rejected promise if not ok', async () => {
        const response = {
            ok: false,
            statusText: 'Request failed',
        };

        expect.assertions(1);
        return fetchErrorsHandler(response).catch(err => {
            expect(err).toEqual('Request failed');
        });
    });
});
