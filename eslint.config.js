import { recommended } from '@drupal-canvas/eslint-config';

export default [
  ...recommended,
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    // docs/_explorer holds browser-only templates for the standalone HTML index,
    // not Canvas components, so the component ruleset does not apply to them.
    ignores: ['dist/**', 'docs/**'],
  },
];
