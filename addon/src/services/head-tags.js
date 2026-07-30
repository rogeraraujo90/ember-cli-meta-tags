import { guidFor } from '@ember/object/internals';
import Service, { service } from '@ember/service';
import { getOwner } from '@ember/owner';

const VALID_HEAD_TAGS = new Set([
  'base',
  'link',
  'meta',
  'script',
  'noscript',
  'title',
]);

export default class HeadTags extends Service {
  @service router;
  @service headData;

  // crawl up the active route stack and collect head tags
  collectHeadTags() {
    let tags = {};
    let currentHandlerInfos = this.allActiveRoutes;

    currentHandlerInfos.forEach((handlerInfo) => {
      Object.assign(tags, this._extractHeadTagsFromRoute(handlerInfo));
    });
    let tagArray = Object.keys(tags).map((id) => tags[id]);
    this.headData.set('headTags', tagArray);
  }

  _extractHeadTagsFromRoute(route) {
    if (!route) {
      return {};
    }

    let routeInstance = getOwner(this).lookup(`route:${route.name}`);
    let { headTags } = routeInstance ?? {};
    if (!headTags) {
      return {};
    }
    if (typeof headTags === 'function') {
      headTags = headTags.apply(routeInstance);
    } else if (typeof headTags !== 'object') {
      // not recognized construct
      return {};
    }
    // convert headTags to object
    return this._buildTags(headTags);
  }

  // ensure all tags have a tagId and build object keyed by id
  _buildTags(headTagsArray) {
    let tagMap = {};
    headTagsArray.forEach(function (tagDefinition) {
      if (!tagDefinition || !VALID_HEAD_TAGS.has(tagDefinition.type)) {
        return;
      }
      let tagId = tagDefinition.tagId;
      if (!tagId) {
        tagId = guidFor(tagDefinition);
      }
      tagMap[tagId] = tagDefinition;
    });
    return tagMap;
  }

  get allActiveRoutes() {
    let routes = [];
    let current = this.router.currentRoute;

    while (current) {
      routes.unshift(current);
      current = current.parent;
    }

    return routes;
  }
}
