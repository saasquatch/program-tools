import { b as bootstrapLazy } from './index-e41e2aef.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-e9cad3f0.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["sq-code",[[0,"sq-code",{"open":[4],"syntax":[1],"tabname":[1],"copied":[4],"highlightedCode":[32],"text":[32],"loaded":[32],"newElement":[32]}]]],["sq-code-example",[[4,"sq-code-example",{"tabs":[32],"code":[32],"clipboard":[32],"copied":[32]}]]],["sq-docs",[[4,"sq-docs"]]]], options);
});
