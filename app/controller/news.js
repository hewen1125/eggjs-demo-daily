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
      var year, month, day;
      if (!date) {
        const now = new Date();
        year = now.getFullYear();
        month = now.getMonth() + 1;
        day = now.getDate();
      } else {
        year = parseInt(date.substr(0, 4));
        month = parseInt(date.substr(4, 2));
        day = parseInt(date.substr(6, 2));
      }
      
      const nextDate = this.dateToString(new Date(year, month-1, day + 1));
      const previousDate = this.dateToString(new Date(year, month-1, day - 1));

      const title = 'patsnap';
      const pageName = 'list';
      const newsList = yield ctx.service.news.list(nextDate);

      yield ctx.render('../view/layout.njk', { title, pageName, newsList, previousDate, nextDate });
    }

    * detail(ctx) {
      var id = ctx.params.id;
      if (!id || isNaN(parseInt(id))) {
        app.redirect = '/error';
      }

      const title = 'patsnap';
      const pageName = 'detail';
      const news = yield ctx.service.news.detail(id);
      news.body = news.body.replace(/<div class="img-place-holder"><\/div>/g, "<div class=\"img-responsive\"><img src=\"" + news.image + "\"></div>");
      news.body = news.body.replace(/http:\/\/pic/g, "/image?img=http://pic");
      news.body = news.body.replace(/https:\/\/pic/g, "/image?img=https://pic");
      
      yield ctx.render('../view/detail_layout.njk', { title, pageName, news });
    }

    dateToString(date){
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day; 
      }

      return year + month + day;
    }
  }
  return NewsController;
};
