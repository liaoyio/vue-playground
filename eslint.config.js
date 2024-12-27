import { sxzz } from '@sxzz/eslint-config'

export default sxzz(
  [
    {
      name: 'global-ignores',
      ignores: ['src/types/auto-imports.d.ts', 'src/types/typed-router.d.ts']
    },
    {
      files: ['src/**/*.ts', '*.config.js', '*.config.ts'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            semi: false,
            singleQuote: true,
            printWidth: 100,
            trailingComma: 'none'
          }
        ],
        'comma-dangle': ['error', 'never']
      }
    }
  ],
  {
    prettier: true,
    vue: true,
    unocss: false
  }
)