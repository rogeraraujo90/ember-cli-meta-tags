import Component from '@glimmer/component';
import { service } from '@ember/service';
import HeadContent from './head-content.gjs';

export default class HeadLayout extends Component {
  @service('-document') document;

  HeadContent = HeadContent;

  /**
   * The element to render into. Defaults to <head> in `init`, overridable for our own tests only.
   * @private
   */
  headElement = this.args.headElement || this.document.head;

  <template>
    {{#in-element this.headElement insertBefore=null}}
      {{! template-lint-disable no-forbidden-elements }}
      <meta name="ember-cli-meta-tags-start" content="" /><this.HeadContent /><meta
        name="ember-cli-meta-tags-head-end"
        content=""
      />
    {{/in-element}}
  </template>
}
