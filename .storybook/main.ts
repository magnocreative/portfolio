import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/nextjs-vite",
  // Only the brand folder, not all of /public: Storybook is published on its
  // own, and /public also holds the résumé PDF, which should not be reachable
  // from a second domain while the site is behind its password.
  "staticDirs": [
    { "from": "../public/brand", "to": "/brand" }
  ],
  // Vite copies /public into the build on its own, staticDirs or not, so it
  // is switched off here; the brand folder above is the only thing served.
  viteFinal: async (config) => ({ ...config, publicDir: false }),
};
export default config;