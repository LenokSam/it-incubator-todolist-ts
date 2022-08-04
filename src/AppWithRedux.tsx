import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';
import Input from './components/Input';
import ButtonAppBar from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodolistAC,
  changeFilterAC,
  editTodoListAC,
  removeTodolistAC,
  todolistReducer
} from './redux/todolistsReducer';
import {
  addTaskAC,
  changeStatusAC, editTaskAC,
  removeTaskAC,
  tasksReducer
} from './redux/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';

type AppRootStateType={
  tasks:TasksStateType
  todolists:Array<TodolistType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  const dispatch=useDispatch()
  let todolistId1 = v1();
  let todolistId2 = v1();

  const todolists=useSelector<AppRootStateType, Array<TodolistType>>(state=>state.todolists)
  const tasks=useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)

  const removeTask =useCallback((id: string, todolistId: string)=> {
    dispatch(removeTaskAC(todolistId, id))
  },[dispatch])

  const addTask = useCallback((title: string, todolistId: string)=> {
    dispatch(addTaskAC(todolistId, title))
  },[dispatch])

  const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string)=> {
    dispatch(changeStatusAC(id, isDone, todolistId))
  },[dispatch])

  const changeFilter =  useCallback((value: FilterValuesType, todolistId: string) =>{
    dispatch(changeFilterAC(value,todolistId))
  },[dispatch])

  const removeTodolist = useCallback((todolistId: string) =>{
    dispatch(removeTodolistAC(todolistId))
    dispatch(removeTodolistAC(todolistId))
  },[dispatch])

  const addTodolist =useCallback((newTitle: string) => {
    let newTodolistID = v1()
    dispatch(addTodolistAC(newTitle))
    dispatch(addTodolistAC(newTitle))
  },[dispatch])

  const editTask = useCallback((todoListId: string, taskId: string, newTitle: string) => {
    dispatch(editTaskAC(todoListId, taskId, newTitle))
  },[dispatch])

  const editTodoList = useCallback((todoListId: string, newTitle: string) => {
    dispatch(editTodoListAC(todoListId,newTitle ))
  },[dispatch])


  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <Input callBack={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    editTask={editTask}
                    editTodoList={editTodoList}
                  />
                </Paper>
              </Grid>
            })
          }

        </Grid>


      </Container>

    </div>
  );
}

export default AppWithRedux;
