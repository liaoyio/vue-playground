import AttributifyJsx from '@unocss/transformer-attributify-jsx'
import Directives from '@unocss/transformer-directives'
import VariantGroup from '@unocss/transformer-variant-group'

import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify({ strict: true }),
    presetIcons({
      autoInstall: true,
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    })
  ],
  transformers: [Directives(), VariantGroup(), AttributifyJsx()]
})
