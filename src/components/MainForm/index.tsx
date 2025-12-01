import { PlayCircleIcon } from 'lucide-react'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import React from 'react'

export function MainForm() {
  const [taskNameInput, setTaskNameInput] = React.useState('')

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log('Deu certo')
    if (taskNameInput.trim() === '') return

    console.log(taskNameInput.trim());
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
      <div className="formRow">
        <Cycles />
      </div>
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  )
}
