import HeadTag from 'ember-cli-meta-tags/components/head-tag';

import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | head tag', function (hooks) {
  setupRenderingTest(hooks);

  test('it render correct tagName', async function (assert) {
    assert.expect(1);

    const headTag = { type: 'link' };

    await render(<template><HeadTag @headTag={{headTag}} /></template>);

    assert.strictEqual(this.element.querySelectorAll('link').length, 1);
  });

  test('it can render content', async function (assert) {
    assert.expect(1);

    const headTag = {
      type: 'script',
      attrs: {
        type: 'application/ld+json',
      },
      content: 'foo-bar',
    };

    await render(<template><HeadTag @headTag={{headTag}} /></template>);

    assert.strictEqual(
      this.element.querySelector('script').textContent.trim(),
      'foo-bar'
    );
  });

  test('it renders attributes', async function (assert) {
    assert.expect(18);
    let attrs = {};
    A([
      'href',
      'target',
      'charset',
      'crossorigin',
      'hreflang',
      'media',
      'rel',
      'rev',
      'sizes',
      'type',
      'content',
      'http-equiv',
      'name',
      'scheme',
      'src',
      'property',
      'itemprop',
      'id',
    ]).forEach(function (attr) {
      attrs[attr] = `the-${attr}`;
    });

    const headTag = {
      type: 'meta',
      attrs,
    };

    await render(<template><HeadTag @headTag={{headTag}} /></template>);
    let elem = this.element.querySelector('meta');
    Object.keys(attrs).forEach(function (key) {
      assert.strictEqual(elem.getAttribute(key), attrs[key]);
    });
  });
});
