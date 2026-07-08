import Component from '@glimmer/component';
import HeadTag from './head-tag.gjs';

export default class HeadTags extends Component {
  HeadTag = HeadTag;

  <template>
    {{#each @headTags as |headTag|}}
      <this.HeadTag @headTag={{headTag}} />
    {{/each}}
  </template>
}
