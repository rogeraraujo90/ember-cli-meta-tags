import HeadTags from 'ember-cli-meta-tags/components/head-tags';

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | head tags', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders no self tag', async function (assert) {
    const headTags = [
      {
        type: 'meta',
      },
      {
        type: 'link',
      },
    ];

    await render(<template><HeadTags @headTags={{headTags}} /></template>);

    assert.ok(this.element.querySelector('meta'), 'meta tag is present');
    assert.ok(this.element.querySelector('link'), 'link tag is present');
  });
});
