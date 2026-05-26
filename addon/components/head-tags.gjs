import HeadTag from 'ember-cli-meta-tags/components/head-tag';

<template>
  {{#each @headTags as |headTag|}}
    <HeadTag @headTag={{headTag}} />
  {{/each}}
</template>
