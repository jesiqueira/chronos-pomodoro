import React from 'react'
import { TaskContext } from './TaskContext'

export function useTaskContext() {
  return React.useContext(TaskContext)
}
