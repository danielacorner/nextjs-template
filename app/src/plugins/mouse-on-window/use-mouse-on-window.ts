import { useMitt } from 'react-mitt'
import { useEffectOnce, useRafState } from 'react-use'
import { EMITTER } from '../../constants/emitter'
import useStore, { Mouse } from '../../store'

type Callback = (mouse: Mouse) => void

const useMouseEvent = (emitterType: 'mouseDown' | 'mouseMove' | 'mouseUp', callback?: Callback) => {
  const { emitter } = useMitt()
  const initialMouse = useStore((state) => state.mutation.mouse)
  const [mouse, set] = useRafState(initialMouse)
  useEffectOnce(() => {
    const handle = (mouse: Mouse) => {
      set(mouse)
      callback?.(mouse)
    }
    emitter.on(EMITTER[emitterType], handle)
    return () => void emitter.off(EMITTER[emitterType], handle)
  })
  return mouse
}

const useMouseDown = (callback?: Callback): Mouse => {
  return useMouseEvent('mouseDown', callback)
}

const useMouseMove = (callback?: Callback): Mouse => {
  return useMouseEvent('mouseMove', callback)
}

const useMouseUp = (callback?: (mouse: Mouse) => void): Mouse => {
  return useMouseEvent('mouseUp', callback)
}

export { useMouseDown, useMouseMove, useMouseUp }
