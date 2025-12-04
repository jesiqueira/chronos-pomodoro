import type { TaskModel } from '../../components/models/TaskModel'

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
} as const // O 'as const' diz ao TS para tratar as propriedades como literais exatos.

export type TaskActionTypes = (typeof TaskActionTypes)[keyof typeof TaskActionTypes]

export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK
      payload: TaskModel
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN
      payload: { secondsRemaining: number }
    }

export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK
    }

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload
