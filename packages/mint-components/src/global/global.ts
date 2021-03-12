import 'babel-polyfill';
import {useHost} from "@saasquatch/stencil-hooks";
import * as stencilHooks from "@saasquatch/stencil-hooks";
import {setUseHostImplementation} from "@saasquatch/component-boilerplate";
import {setImplementation} from "@saasquatch/universal-hooks"
setUseHostImplementation(useHost);
setImplementation(stencilHooks)