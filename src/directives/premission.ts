import type { Directive, DirectiveBinding } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  // 在实际项目中，根据后端返回的用户权限进行判断
  const userRole = ['view', 'edit']
  const permission = binding.value // 获取到 v-permission的值

  if (!permission) {
    throw new TypeError(`need roles! Like v-permiss"'view'"`)
  }
  const hasPermission = userRole.includes(permission)

  if (!hasPermission) {
    // 没有权限 移除Dom元素
    el.parentNode && el.remove()
  }
}

/**
 * vue-permission
 * @example
 * <!-- 显示 -->
  <button v-permission="'view'">View</button>
  <!-- 不显示 -->
  <button v-permission="'delete'">Delete</button>
 */
export const permiss: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}
