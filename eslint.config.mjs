import { readFileSync } from 'fs';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const reactVersion = pkg.dependencies?.react ?? pkg.devDependencies?.react ?? 'detect';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierConfig,
  {
    settings: {
      react: {
        version: reactVersion,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          printWidth: 100,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
