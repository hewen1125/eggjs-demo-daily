'use strict';

module.exports = app => {
  class ImageController extends app.Controller {
    * index() {
      console.log(this.ctx.query.img);
      var imgUrl = this.ctx.query.img;

      this.ctx.set('Content-Type', 'image/jpeg');
      if (imgUrl) {
        const data = yield this.ctx.curl(imgUrl, {
            dataType:'image/jpeg'
        });
        this.ctx.body = data.data;
      }else {
        this.ctx.body = '';
      }
    }
  }
  return ImageController;
};
