'use strict';

module.exports = app => {
  class ErrorController extends app.Controller {
    * index() {
      const title = 'patsnap';
      const pageName = 'error';
      yield this.ctx.render('../view/layout.njk', { title, pageName });
    }
  }
  return ErrorController;
};
