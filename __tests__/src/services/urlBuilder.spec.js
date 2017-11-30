import * as UrlBuilder from '../../../src/services/urlBuilder';

describe('urlBuilder', () => {
    describe('addGetParams', () => {
        test('should not change the url when there is no params', async () => {
            const url = 'http://my.url';

            const expectedUrl = 'http://my.url';
            const result = UrlBuilder.addGetParams(url);

            expect(result).toEqual(expectedUrl);
        });

        test('should add one param to the url', async () => {
            const url = 'http://my.url';
            const params = {
                param1: 'test',
            };

            const expectedUrl = 'http://my.url?param1=test';
            const result = UrlBuilder.addGetParams(url, params);

            expect(result).toEqual(expectedUrl);
        });

        test('should add multiple params to the url', async () => {
            const url = 'http://my.url';
            const params = {
                param1: 'test',
                param2: JSON.stringify([[1, 2, 3], [4, 5, 6], [7, 8, 0]]),
            };

            const expectedUrl =
                'http://my.url?param1=test&param2=[[1,2,3],[4,5,6],[7,8,0]]';
            const result = UrlBuilder.addGetParams(url, params);

            expect(result).toEqual(expectedUrl);
        });

        test('should only accept string urls', async () => {
            const url = 42;
            const params = {
                param: 'test',
            };

            expect(() => UrlBuilder.addGetParams(url, params)).toThrow(
                'The url param should be a string',
            );
        });
    });
});
