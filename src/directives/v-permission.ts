import type { DirectiveBinding } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding

  const orgRole = ['admin']
  const projectRole = ['user']

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value
      const type = value[0]
      const _org = permissionValues.includes(orgRole)
      const _project = permissionValues.includes(projectRole)

      let hasPermission = _project

      if (type === 'project') {
        hasPermission = _project
      }
      if (type === 'org') {
        hasPermission = _org
      }

      if (!hasPermission && el.parentNode) {
        el.remove()
      }
    }
  } else {
    throw new TypeError(`need roles! Like v-permission="['member','owner']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}

/*
<div class="btn">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
</div>
*/
