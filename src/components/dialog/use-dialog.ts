import { inject } from 'vue'
import { dialogKey } from './inject'

export function useDialog() {
  const dialogService = inject(dialogKey)
  if (!dialogService) {
    throw new Error('Dialog service not provided!')
  }
  return dialogService
}
