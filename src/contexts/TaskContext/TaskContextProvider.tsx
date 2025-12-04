import React from 'react'
import { initialTaskState } from './initialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/TimerWorkerManager'
import { TaskActionTypes } from './taskActions'
import { loadBeep } from '../../utils/loadBeep'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = React.useReducer(taskReducer, initialTaskState)
  const playBeepRef = React.useRef<ReturnType<typeof loadBeep> | null>(null)

  const worker = TimerWorkerManager.getInstance()

  React.useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log('Carregando áudio')
      playBeepRef.current = loadBeep()
    } else {
      playBeepRef.current = null
    }
  }, [state.activeTask])

  React.useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask')
      worker.terminate()
    }

    worker.postMessage(state)
  }, [state, worker])

  worker.onmessage((e) => {
    const countDownSeconds = e.data

    if (countDownSeconds <= 0) {
      dispatch({ type: TaskActionTypes.COMPLETE_TASK })
    } else {
      dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } })
    }
  })

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
