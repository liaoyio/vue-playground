import { useUnityModal } from './hooks/use-unity-modal'

const { onToggleComponent } = useUnityModal()

export function useShowModal() {
  const modal = {
    modal1: {
      title: '弹窗1',
      component: () => import('../modal-1.vue')
    },
    modal2: {
      title: '弹窗2',
      component: () => import('../modal-2.vue')
    },
    modal3: {
      title: '弹窗2',
      component: () => import('../modal-3.vue')
    }
  }

  function showModal<N extends keyof typeof modal>(modalName: N, attrs?: Record<string, any>) {
    onToggleComponent(modal[modalName], {
      title: modal[modalName].title,
      ...(attrs ? attrs : {})
    })
  }

  return { showModal }
}
