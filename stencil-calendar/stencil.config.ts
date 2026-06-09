import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-calendar',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
