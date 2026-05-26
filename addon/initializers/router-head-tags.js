import Router from '@ember/routing/router';
import { service } from '@ember/service';

export function initialize() {
  Router.reopen({
    headTags: service(),

    init() {
      this._super(...arguments);

      this.headTags.router = this;

      this.on('routeDidChange', () => {
        this.headTags.collectHeadTags();
      });
    },
  });
}

export default {
  initialize,
};
