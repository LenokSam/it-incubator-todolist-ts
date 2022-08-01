import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from './components/Input';
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

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(todolistId, id))
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(todolistId, title))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeStatusAC(id, isDone, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeFilterAC(value,todolistId))

  }

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
    dispatch(removeTodolistAC(todolistId))
  }

  const addTodolist = (newTitle: string) => {
    let newTodolistID = v1()
    dispatch(addTodolistAC(newTitle))
    dispatch(addTodolistAC(newTitle))
  }

  const editTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatch(editTaskAC(todoListId, taskId, newTitle))
  }

  const editTodoList = (todoListId: string, newTitle: string) => {
    dispatch(editTodoListAC(todoListId,newTitle ))
  }
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
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === 'active') {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
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
