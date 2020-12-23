const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

function pathResolve() {
    return path.resolve.apply(this, arguments);
}

/*
process.env.extend:
    SERVER_MODE: 'local', 'localdev', 'dev', 'stg', 'prd'
*/
const serverConfigRepo = {
    local: {
        extend: {
            onMockApi: true
        },
        webpack: {}
    },
    localdev: {
        extend: {},
        webpack: {
            devServer: {
                proxy: {
                    '/v1': {
                        target: "https://dev-api.chalcak.kr",
                        changeOrigin: true,
                        secure: false
                    }
                }
            }
        }
    },
    dev: {
        extend: {},
        webpack: {}
    },
    stg: {
        extend: {},
        webpack: {}
    },
    prd: {
        extend: {},
        webpack: {}
    }
}

const SERVER_MODE = (process.env.SERVER_MODE || 'dev').toLowerCase();
const serverConfig = serverConfigRepo[SERVER_MODE];

module.exports = {
    webpack: config => {
        // devServer
        config.devServer = { ...config.devServer, ...serverConfig.webpack.devServer }
        // plugins
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.extend': serverConfig.extend || {},
        }));
        if (!serverConfig.extend.onMockApi) {
            config.plugins.push(new webpack.IgnorePlugin(/mock\/.*/));
        }
        if (serverConfig.webpack.plugins) {
            config.plugins = [...config.plugins, ...serverConfig.webpack.plugins]
        }
        return config;
    }
};