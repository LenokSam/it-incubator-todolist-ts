import {FilterValuesType, TodolistType} from '../App';

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const EDIT_TODOLIST = 'EDIT_TODOLIST'
const CHANGE_FILTER = 'CHANGE_FILTER'


export const todolistReducer = (state: Array<TodolistType>, action: todolistsACType) => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(t=>t.id!==action.payload.todolistId)
    case ADD_TODOLIST:

      return [...state,{id:action.payload.newId, title:action.payload.newTitle, filter:'all'}]
    case EDIT_TODOLIST:
      return state
    case CHANGE_FILTER:
      return state
    default:
      return state
  }
}

export type todolistsACType = removeTodolistACType | addTodolistACType | editTodoListACType | changeFilterACType


//REMOVE_TODOLIST
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: REMOVE_TODOLIST,
    payload: {todolistId}
  } as const
}

//ADD_TODOLIST
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newId:string, newTitle: string) => {
  return {
    type: ADD_TODOLIST,
    payload: {newId, newTitle}
  } as const
}

//EDIT_TODOLIST

type editTodoListACType = ReturnType<typeof editTodoListAC>
export const editTodoListAC = (id: string, newTitle: string) => {
  return {
    type: EDIT_TODOLIST,
    payload: {id, newTitle}
  } as const
}

//CHANGE_FILTER

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, id: string) => {
  return {
    type: CHANGE_FILTER,
    payload: {value, id}
  } as const
}
