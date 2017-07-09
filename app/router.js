'use strict';

module.exports = app => {
  app.get('/', 'news.index');
  app.get('/list/', 'news.list');
  app.get('/list/:date', 'news.list');
  app.get('/news/:id', 'news.detail');
  app.get('/image', 'image.index');
  app.get('/error', 'error.index');
};
