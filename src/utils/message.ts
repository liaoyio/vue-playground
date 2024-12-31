import { ElMessage, type MessageHandler } from 'element-plus'

type Options = {
  message: string
  type: 'success' | 'warning' | 'info' | 'error'
  duration?: number
}

class MessageSingleton {
  instance: null | MessageHandler
  timer: null | NodeJS.Timeout
  constructor() {
    this.instance = null // 当前消息实例
    this.timer = null // 定时器防止重复弹窗
  }
  // 显示消息方法
  showMessage(options: Options) {
    const { message, type = 'info', duration = 3000 } = options

    // 如果当前有正在显示的消息，直接返回
    if (this.instance) {
      return
    }
    // 显示新消息
    this.instance = ElMessage({
      message,
      type,
      duration,
      onClose: () => {
        this.instance = null // 清除实例引用
      }
    })
    // 定时清除，防止重复提交
    this.timer = setTimeout(() => {
      this.instance = null
    }, duration)
  }
  destory() {
    if (this.instance) {
      this.instance.close()
      this.instance = null
    }
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}

// 创建单实例对象
const _MessageSingleton = new MessageSingleton()

export const Message = {
  info: (message: string, options = {}) => {
    _MessageSingleton.showMessage({ message, type: 'info', ...options })
  },
  success: (message: string, options = {}) => {
    _MessageSingleton.showMessage({ message, type: 'success', ...options })
  },
  warning: (message: string, options = {}) => {
    _MessageSingleton.showMessage({ message, type: 'warning', ...options })
  },
  error: (message: string, options = {}) => {
    _MessageSingleton.showMessage({ message, type: 'error', ...options })
  }
}

/**在 axios 响应拦截器使用 ->
 * error?.response?.status !== 403
 if(error.status === 401){
    Message.error(error.status)
 }
 */
