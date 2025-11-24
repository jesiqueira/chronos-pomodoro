import React from 'react'
import type { TaskStateModel } from '../../components/models/TaskStateModel'

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
}

type TaskContextProps = {
  state: TaskStateModel
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>
}

export const TaskContext = React.createContext<TaskContextProps>({
  state: initialState,
  setState: () => {},
})

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  return <TaskContext.Provider value={{ outraCoisa: 321 }}>{children}</TaskContext.Provider>
}
