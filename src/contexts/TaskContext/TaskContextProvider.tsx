import React from 'react'
import { initialTaskState } from './initialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = React.useReducer(taskReducer, initialTaskState)

  React.useEffect(() => {
    console.log(state)
  }, [state])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
