export function initialize(application) {
  const routerService = application.lookup('service:router');
  const headTagsService = application.lookup('service:head-tags');

  routerService.on('routeDidChange', () => {
    headTagsService.collectHeadTags();
  });
}

export default {
  initialize,
};
