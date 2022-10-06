import { useHost } from '@saasquatch/stencil-hooks';
import { setUseHostImplementation } from '@saasquatch/component-boilerplate';
import { createIntl, createIntlCache } from '@formatjs/intl';
const cache = createIntlCache();
export const intl = createIntl(
  {
    locale: 'en',
  },
  cache,
);

setUseHostImplementation(useHost);
