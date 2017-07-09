module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      this.app.emit('error', err, this);
      
      const title = 'patsnap';
      const pageName = 'error';
      yield this.ctx.render('../view/layout.njk', { title, pageName });
    }
  };
};
