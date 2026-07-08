import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
import HeadLayout from 'ember-cli-meta-tags/components/head-layout';

<template>
  <HeadLayout />

  {{pageTitle "Dummy"}}

  <h2 id="title">Welcome to Ember</h2>

  <ul>
    <li><LinkTo @route="route-1">route-1</LinkTo></li>
    <li><LinkTo @route="route-2">route-2</LinkTo></li>
    <li><LinkTo @route="route-object-1">route-object-1</LinkTo></li>
    <li><LinkTo @route="route-object-2">route-object-2</LinkTo></li>
    <li><LinkTo @route="resource">resource</LinkTo></li>
    <li><LinkTo @route="sub">sub</LinkTo></li>
    <li><LinkTo @route="sub.deep">resource/sub/deep</LinkTo></li>
  </ul>

  {{outlet}}
</template>
