import {TasksStateType} from '../App';
import {v1} from 'uuid';

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const REMOVE_TODOLIST= 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const EDIT_TASK = 'EDIT_TASK'

export const tasksReducer = (state: TasksStateType, action: tasksACType) => {
  switch (action.type) {

    case REMOVE_TASK:
      let todolistId=action.payload.todolistId
      let taskId=action.payload.taskId
      return {...state,[todolistId]:state[todolistId].filter(t=> t.id!==taskId)}

    case ADD_TASK:
      let title=action.payload.title
      return {...state,
        [action.payload.todolistId]:[...state[action.payload.todolistId], {id:v1(), title:title, isDone:false}]}

    case REMOVE_TODOLIST:
      delete state[action.payload.todolistId]
      return {...state}

    case CHANGE_TASK_STATUS:
      let listId=action.payload.todolistId
      let changedTaskId=action.payload.id
      let isDone=action.payload.isDone
      return {
        ...state,
        [listId]:state[listId].map(t=>t.id === changedTaskId ?{...t,isDone:isDone }: t)
      }

    case ADD_TODOLIST:
      return {...state, [action.payload.newId]:[]}

    case EDIT_TASK:
      return state

    default:
      return state
  }
}

export type tasksACType = removeTaskACType | addTaskACType | removeTodolistACType |changeStatusACType |addTodolistACType |editTaskACType


//REMOVE_TASK
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId:string) => {
  return {
    type: REMOVE_TASK,
    payload: {todolistId, taskId}
  } as const
}


//ADD_TASK
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title:string) => {
  return {
    type: ADD_TASK,
    payload: {todolistId, title}
  } as const
}


//REMOVE_TODOLIST
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: REMOVE_TODOLIST,
    payload:{todolistId}
  } as const
}


//CHANGE_TASK_STATUS
type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: CHANGE_TASK_STATUS,
    payload:{id,isDone,todolistId }

  } as const
}



//EDIT_TASK
type editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todoListId: string, taskId: string, newTitle: string) => {
  return {
    type: EDIT_TASK,
    payload:{todoListId,taskId,newTitle }
  } as const
}




//ADD_TODOLIST
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC =(newId:string, newTitle: string) => {
  return {
    type: ADD_TODOLIST,
    payload:{newId,newTitle}

  } as const
}



