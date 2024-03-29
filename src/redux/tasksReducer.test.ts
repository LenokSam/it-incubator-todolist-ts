import {v1} from 'uuid';
import {TasksStateType, TodolistType} from '../App';

import {addTaskAC, changeStatusAC, editTaskAC, removeTaskAC, tasksReducer} from './tasksReducer';
import {addTodolistAC, removeTodolistAC, todolistReducer} from './todolistsReducer';

let startState: TasksStateType


beforeEach(() => {
  startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
})


test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC('todolistId2', '2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
})


test('correct task should be added to correct array', () => {


  const action = addTaskAC('todolistId2', 'newTitle')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('newTitle')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {

  const action = changeStatusAC('2', false, 'todolistId2');

  const endState = tasksReducer(startState, action)
  expect(endState['todolistId2'][1].isDone).toBe(false);
  expect(endState['todolistId1'][1].isDone).toBe(true);
  expect(endState['todolistId2'][0].isDone).toBe(false);

})


test('task title should be changed', () => {

  const action = editTaskAC('todolistId2', '2', 'newTitle');

  const endState = tasksReducer(startState, action);
  expect(endState['todolistId2'][1].title).toBe('newTitle');
  expect(endState['todolistId2'][0].title).toBe('bread');

});


test('new array should be added when new todolist is added', () => {


  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.newId)
  expect(idFromTodolists).toBe(action.payload.newId)
})

