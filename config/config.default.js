'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1492418843442_9346';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks',
    },
  };

  config.notfound = {
    pageUrl: '/error',
  };
  return config;
};
