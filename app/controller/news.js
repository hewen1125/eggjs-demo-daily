'use strict';

module.exports = app => {
  class NewsController extends app.Controller {

    * index() {
      const title = 'patsnap';
      const pageName = 'latest';
      const newsList = yield this.ctx.service.news.latest();
      yield this.ctx.render('../view/layout.njk', { title, pageName, newsList });
    }

    * list(ctx) {
      var date = ctx.params.date;
      if (!date) {
        const now = new Date();
        date = now.toISOString().slice(0,10).replace(/-/g,"");
      }
      
      const year = parseInt(date.substr(0, 4));
      const month = parseInt(date.substr(4, 2));
      const day = parseInt(date.substr(6, 2));
      const nextDate = new Date(year, month-1, day + 2).toISOString().slice(0,10).replace(/-/g,"");
      const previousDate = new Date(year, month-1, day).toISOString().slice(0,10).replace(/-/g,"");

      const title = 'patsnap';
      const pageName = 'list';
      const newsList = yield ctx.service.news.list(nextDate);

      yield ctx.render('../view/layout.njk', { title, pageName, newsList, previousDate, nextDate });
    }

    * detail(ctx) {
      var id = ctx.params.id;
      if (!id || isNaN(parseInt(id))) {
        app.redirect = '/error';
        return;
      }

      const title = 'patsnap';
      const pageName = 'detail';
      const news = yield ctx.service.news.detail(id);
      news.body = news.body.replace(/<div class="img-place-holder"><\/div>/g, "<div class=\"img-responsive\"><img src=\"" + news.image + "\"></div>");
      news.body = news.body.replace(/http:\/\/pic/g, "/image?img=http://pic");
      news.body = news.body.replace(/https:\/\/pic/g, "/image?img=https://pic");
      
      yield ctx.render('../view/detail_layout.njk', { title, pageName, news });
    }
  }
  return NewsController;
};
