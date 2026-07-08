import Component from '@glimmer/component';
import HeadTags from './head-tags.gjs';
import { service } from '@ember/service';

export default class HeadContent extends Component {
  @service headData;

  HeadTags = HeadTags;

  <template><this.HeadTags @headTags={{this.headData.headTags}} /></template>
}
