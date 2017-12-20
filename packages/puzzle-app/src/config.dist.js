module.exports = {
    apiUrl: {
        multiplayer: 'http://your.multiplayer.api/api',
        suggest: 'http://your.suggest.api',
    },
    defaultImageUrl: '/static/images/puzzle-default.jpg',
    imageUrls: ['/static/images/img1.jpg', '/static/images/img2.jpg'],
    puzzleSize: {
        default: 4,
        max: 7,
        min: 3,
    },
    refreshDuration: 3000,
    translateDuration: 200,
    useCache: true,
};