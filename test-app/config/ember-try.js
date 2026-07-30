/* eslint-disable n/no-unpublished-require */
'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function () {
  return {
    packageManager: 'pnpm',
    // The default `ember test` cannot serve a Vite app; it needs the built output.
    command: 'pnpm run test:ember',
    scenarios: [
      {
        name: 'ember-lts-6.8',
        npm: {
          devDependencies: {
            'ember-source': '~6.8.4',
          },
        },
      },
      {
        name: 'ember-lts-6.12',
        npm: {
          devDependencies: {
            'ember-source': '~6.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
    ],
  };
};
