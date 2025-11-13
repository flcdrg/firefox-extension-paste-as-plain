export default {
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    'icons/*.svg',
    'package.json',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    'scripts',
    'my-config.mjs',
    'README.md',
  ],
};