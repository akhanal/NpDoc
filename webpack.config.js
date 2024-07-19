// webpack.config.js
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            'react-native-webrtc': 'react-native-webrtc-web-shim'
        },
    },
};
