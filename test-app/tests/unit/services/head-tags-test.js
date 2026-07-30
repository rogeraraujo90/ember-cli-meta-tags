import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Route from '@ember/routing/route';

module('Unit | Service | head tags', function (hooks) {
  setupTest(hooks);

  test('it collects head tags from function', function (assert) {
    const routeName = 'test-route';
    this.owner.register(
      `route:${routeName}`,
      class extends Route {
        headTags() {
          return [
            {
              type: 'link',
              attrs: {
                rel: 'canonical',
              },
            },
          ];
        }
      },
    );
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        currentRoute: {
          name: routeName,
          parent: null,
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects head tags from CP', function (assert) {
    const routeName = 'test-route';

    this.owner.register(
      `route:${routeName}`,
      class extends Route {
        get headTags() {
          return [
            {
              type: 'link',
              attrs: {
                rel: 'canonical',
              },
            },
          ];
        }
      },
    );

    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        currentRoute: {
          name: routeName,
          parent: null,
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects head tags from property array', function (assert) {
    const routeName = 'test-route';

    this.owner.register(
      `route:${routeName}`,
      class extends Route {
        headTags = [
          {
            type: 'link',
            attrs: {
              rel: 'canonical',
            },
          },
        ];
      },
    );

    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        currentRoute: {
          name: routeName,
          parent: null,
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects nested tags', function (assert) {
    const rootRouteName = 'root-route';
    const nestedRouteName = 'nested-route';

    this.owner.register(
      `route:${rootRouteName}`,
      class extends Route {
        headTags = [
          {
            type: 'link',
            tagId: 'canonical-link',
            attrs: {
              rel: 'canonical',
              href: 'root-canonical',
            },
          },
          {
            type: 'meta',
            tagId: 'meta-name',
            attrs: {
              name: 'foo',
              content: 'root-meta',
            },
          },
        ];
      },
    );

    this.owner.register(
      `route:${nestedRouteName}`,
      class extends Route {
        headTags() {
          return [
            {
              type: 'link',
              tagId: 'canonical-link',
              attrs: {
                rel: 'canonical',
                href: 'nested-canonical',
              },
            },
            {
              type: 'meta',
              tagId: 'meta-title',
              attrs: {
                title: 'foo',
                content: 'nested-meta',
              },
            },
          ];
        }
      },
    );

    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        currentRoute: {
          name: nestedRouteName,
          parent: {
            name: rootRouteName,
            parent: null,
          },
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        tagId: 'canonical-link',
        attrs: {
          rel: 'canonical',
          href: 'nested-canonical',
        },
      },
      {
        type: 'meta',
        tagId: 'meta-name',
        attrs: {
          name: 'foo',
          content: 'root-meta',
        },
      },
      {
        type: 'meta',
        tagId: 'meta-title',
        attrs: {
          title: 'foo',
          content: 'nested-meta',
        },
      },
    ]);
  });
});
