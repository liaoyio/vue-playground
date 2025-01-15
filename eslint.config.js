import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  rules: {
    'no-console': 'warn',
    'no-extend-native': 'warn',
    'eqeqeq': 'warn',
    'ts/ban-ts-comment': 'off',
  },
})
