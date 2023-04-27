export function useTemplateChildren(parent, callback) {
  const parentObserver = new MutationObserver(listenForTemplateChanges);
  const childTemplateObserver = new MutationObserver(callback);

  parentObserver.observe(parent, {
    childList: true,
    // We only care about immediate children templates
    subtree: false,
  });
  listenForTemplateChanges({ addedNodes: parent.querySelectorAll('template') });

  function listenForTemplateChanges(mutationList) {
    // Be smart, only look at the mutation list
    mutationList.addedNodes.forEach((t, idx) => {
      console.log('Subscribe child template', idx);
      childTemplateObserver.observe(t.content, {
        childList: true,
        attributes: true,
        // Look deep into the templates for re-rendering
        subtree: true,
      });
    });
  }
}
