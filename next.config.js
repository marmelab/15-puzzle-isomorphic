const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    webpack: config => {
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                verbose: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                staticFileGlobs: ['static/styles/**.css', 'static/images/**.*'],
                runtimeCaching: [
                    {
                        handler: 'networkFirst',
                        urlPattern: /^https?.*/,
                    },
                ],
            }),
        );

        return config;
    },
};
