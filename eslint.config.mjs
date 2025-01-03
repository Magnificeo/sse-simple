import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/* node_modules игнорируется по умолчанию */

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'prisma'] },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}', 'tests/**/*.{js,mjs,cjs,ts}'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'arrow-body-style': ['error', 'always'],
    },
  },
];
