import React from 'react'
import { initialTaskState } from './initialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/TimerWorkerManager'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = React.useReducer(taskReducer, initialTaskState)

  const worker = TimerWorkerManager.getInstance()

  worker.onmessage((e) => {
    const countDownSeconds = e.data
    console.log(countDownSeconds)

    if (countDownSeconds <= 0) {
      console.log('Worker COMPLETED')
      worker.terminate()
    }
  })

  React.useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask')
      worker.terminate()
    }

    worker.postMessage(state)
  }, [state, worker])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
