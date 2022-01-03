// Downshift needs help when rendered in a shadow dom, fix courtesey of https://github.com/downshift-js/downshift/pull/588

// this check is borrowed from react
// const isProxySupported =
//   typeof Proxy === "function" &&
//   // https://github.com/facebook/react/issues/12011
//   !Object.isSealed(new Proxy({}, {}));

// export function createProxyEnvironment(shadowRoot: Node) {
//   const doc = shadowRoot.ownerDocument;
//   const properties = {
//     document: doc,
//     addEventListener: doc?.addEventListener.bind(shadowRoot),
//     removeEventListener: doc?.removeEventListener.bind(shadowRoot),
//   };
//   // check if Proxy is supported because of IE and older Safari versions
//   if (isProxySupported) {
//     return new Proxy(shadowRoot, {
//     });
//   }
//   // fallback for es5-compatible environments (can be removed if it's unnecessary)
//   return Object.create(
//     shadowRoot,
//     Object.keys(properties).reduce((res, key) => {
//       res[key] = {
//         get: () => properties[key],
//       };
//       return res;
//     }, {})
//   );
// }

export function createProxyEnvironment(shadowRoot: Node) {
  return {
    addEventListener: shadowRoot.addEventListener.bind(shadowRoot),
    removeEventListener: shadowRoot.removeEventListener.bind(shadowRoot),
    document: shadowRoot.ownerDocument!,
  };
}
