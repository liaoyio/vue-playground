import type { Directive, DirectiveBinding } from 'vue'

function addWaterMarker(str: string, parentNode: HTMLElement, font: string, textColor: string) {
  // 水印文字，父元素，字体，文字颜色
  const can = document.createElement('canvas')
  parentNode.append(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  const cans = can.getContext('2d')
  cans!.rotate((-20 * Math.PI) / 180)
  cans!.font = font ?? '16px Microsoft JhengHei'
  cans!.fillStyle = textColor ?? 'rgba(180, 180, 180, 0.3)'
  cans!.textAlign = 'left'
  cans!.textBaseline = 'middle'
  cans!.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}

/**
 * v-water-marker（水印）
 * @example
 *  <div v-waterMarker="{text:'liaoyi版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
 */
export const marker: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const str = binding.value.text
    const font = binding.value.font
    const textColor = binding.value.textColor
    addWaterMarker(str, el, font, textColor)
  },
}
