import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import React from 'react'
import type { TaskModel } from '../models/TaskModel'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'
import { Tips } from '../Tips'
import { showMessage } from '../../adapters/showMessage'

export function MainForm() {
  const { state, dispatch } = useTaskContext()
  const [taskNameInput, setTaskNameInput] = React.useState('')

  // Ciclos
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showMessage.dismiss()
    const taskName = taskNameInput.trim()
    if (taskName === '') {
      showMessage.warn('Digite o nome da Tarefa')
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

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })
    showMessage.sucess('Tarefa iniciada.')
  }

  function handleInterruptTask() {
    showMessage.dismiss()
    showMessage.error('Tarefa interrompida.')
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
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
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton type="submit" icon={<PlayCircleIcon />} key="botao_submit" />
        ) : (
          <DefaultButton type="button" icon={<StopCircleIcon />} color="red" onClick={handleInterruptTask} key="botao_button" />
        )}
      </div>
    </form>
  )
}
