import type { Directive, DirectiveBinding } from 'vue'

const highlight: Directive = {
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!binding.value) {
      el.style.backgroundColor = '#fff'
    }
    else if (binding.value < 10) {
      el.style.backgroundColor = 'aqua'
    }
    else if (binding.value > 10 && binding.value < 21) {
      el.style.backgroundColor = 'pink'
    }
    else {
      el.style.backgroundColor = 'greenyellow'
    }
  },
}

export default highlight
