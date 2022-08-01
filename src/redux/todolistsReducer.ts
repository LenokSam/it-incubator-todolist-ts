import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';
import {useReducer} from 'react';
import {todolistId1, todolistId2} from './tasksReducer';

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const EDIT_TODOLIST = 'EDIT_TODOLIST'
const CHANGE_FILTER = 'CHANGE_FILTER'

let initialState:Array<TodolistType>= [
  {id: todolistId1, title: 'What to learn', filter: 'all'},
  {id: todolistId2, title: 'What to buy', filter: 'all'}
]

export const todolistReducer = (state: Array<TodolistType>=initialState, action: todolistsACType) => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(t => t.id !== action.payload.todolistId)
    case ADD_TODOLIST:
      let newTodoList:TodolistType = {id: action.payload.newId, title: action.payload.newTitle, filter: 'all'}
      return [newTodoList,...state]
    case EDIT_TODOLIST:
      return state.map(el=> el.id===action.payload.id ? {...el, title:action.payload.newTitle} : el)
    case CHANGE_FILTER:
      return state.map(el=>el.id=== action.payload.id ? {...el, filter:action.payload.value}: el)
    default:
      return state
  }
}

export type todolistsACType = removeTodolistACType | addTodolistACType | editTodoListACType | changeFilterACType


//REMOVE_TODOLIST
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: REMOVE_TODOLIST,
    payload: {todolistId}
  } as const
}

//ADD_TODOLIST
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
  return {
    type: ADD_TODOLIST,
    payload: {newId:v1(), newTitle}
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
