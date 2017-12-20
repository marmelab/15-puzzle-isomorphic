const TYPE_AUTHORIZATION = 'Bearer';

export const getToken = headers => {
    const tokenArray = headers.authorization.split(' ');
    return tokenArray.length === 2 && tokenArray[0] === TYPE_AUTHORIZATION
        ? tokenArray[1]
        : '';
};
