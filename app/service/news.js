module.exports = app => {
  class NewsService extends app.Service {
    
    * latest() {
      const url = `https://news-at.zhihu.com/api/4/news/latest`;
      const { data: newsList } = yield this.ctx.curl(url, {
        dataType: 'json',
      });
      
      return newsList;
    }
    
    * list(date) {
      const url = `https://news-at.zhihu.com/api/4/news/before/` + date;
      const { data: newsList } = yield this.ctx.curl(url, {
        dataType: 'json',
      });
      
      return newsList;
    }

    * detail(id) {
      const url = `https://news-at.zhihu.com/api/4/news/` + id;
      const { data: news } = yield this.ctx.curl(url, {
        dataType: 'json',
      });
      
      return news;
    }
  }
  return NewsService;
};
