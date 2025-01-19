import type { App, InjectionKey } from 'vue'
import { closeDialog, openDialog } from './dialog-service'

export const dialogKey: InjectionKey<{
  openDialog: typeof openDialog
  closeDialog: typeof closeDialog
}> = Symbol('dialog')

export function setGlobeProvide(app: App) {
  app.provide(dialogKey, { openDialog, closeDialog })
}
