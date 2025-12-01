import { PlayCircleIcon } from 'lucide-react'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import React from 'react'
import type { TaskModel } from '../models/TaskModel'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycle } from '../utils/getNextCycle'
import { getNextCycleType } from '../utils/getNextCycleType'
import { formatSecondsToMinutes } from '../utils/formatSecondsToMinutes'

export function MainForm() {
  const { state, setState } = useTaskContext()
  const [taskNameInput, setTaskNameInput] = React.useState('')

  // Ciclos
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const taskName = taskNameInput.trim()
    if (taskName === '') {
      alert('Digite o nome da Tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    const secondsRemaining = newTask.duration * 60

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      }
    })
  }

  return (
    <form className="form" onSubmit={handleCreateNewTask}>
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite algo"
          value={taskNameInput}
          onChange={(e) => setTaskNameInput(e.target.value)}
        />
      </div>
      <div className="formRow">
        <p>Nesse ciclo foque por 25 min.</p>
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  )
}
