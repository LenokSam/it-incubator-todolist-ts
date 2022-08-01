import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodolistACType, removeTodolistACType} from './todolistsReducer';

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const EDIT_TASK = 'EDIT_TASK'

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState:TasksStateType={

  [todolistId1]: [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true}
  ],
  [todolistId2]: [
    {id: v1(), title: 'Milk', isDone: true},
    {id: v1(), title: 'React Book', isDone: true}
  ],
}

export const tasksReducer = (state: TasksStateType=initialState, action: tasksACType): TasksStateType => {
  switch (action.type) {

    case REMOVE_TASK:
      let todolistId = action.payload.todolistId
      let taskId = action.payload.taskId
      return {...state, [todolistId]: state[todolistId].filter(t => t.id !== taskId)}

    case ADD_TASK:
      let title = action.payload.title

      return {
        ...state,
        [action.payload.todolistId]: [{id: v1(), title: title, isDone: false},  ...state[action.payload.todolistId]]
      }

    case REMOVE_TODOLIST:
      delete state[action.payload.todolistId]
      return {...state}

    case CHANGE_TASK_STATUS:
      let listId = action.payload.todolistId
      let changedTaskId = action.payload.id
      let isDone = action.payload.isDone
      return {
        ...state,
        [listId]: state[listId].map(t => t.id === changedTaskId ? {...t, isDone: isDone} : t)
      }

    case ADD_TODOLIST:
      return {...state, [action.payload.newId]: []}

    case EDIT_TASK:
      let editTaskId = action.payload.taskId
      let newTitle = action.payload.newTitle
      let editListId = action.payload.todoListId
      return {
        ...state,
        [editListId]: state[editListId].map(t => t.id === editTaskId ? {...t, title: newTitle} : t)
      }
    default:
      return state
  }
}

export type tasksACType =
  removeTaskACType
  | addTaskACType
  | removeTodolistACType
  | changeStatusACType
  | editTaskACType
  | addTodolistACType


//REMOVE_TASK
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: REMOVE_TASK,
    payload: {todolistId, taskId}
  } as const
}


//ADD_TASK
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: ADD_TASK,
    payload: {todolistId, title}
  } as const
}


//REMOVE_TODOLIST
// type removeTodolistACType = ReturnType<typeof removeTodolistAC>
// export const removeTodolistAC = (todolistId: string) => {
//   return {
//     type: REMOVE_TODOLIST,
//     payload: {todolistId}
//   } as const
// }


//CHANGE_TASK_STATUS
type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: CHANGE_TASK_STATUS,
    payload: {id, isDone, todolistId}

  } as const
}


//EDIT_TASK
type editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todoListId: string, taskId: string, newTitle: string) => {
  return {
    type: EDIT_TASK,
    payload: {todoListId, taskId, newTitle}
  } as const
}


//ADD_TODOLIST
// type addTodolistACType = ReturnType<typeof addTodolistAC>
// export const addTodolistAC = (newId: string, newTitle: string) => {
//   return {
//     type: ADD_TODOLIST,
//     payload: {newId, newTitle}
//
//   } as const
// }
//
//

