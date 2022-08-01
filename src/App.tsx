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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();


  let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}

  ])


  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ],
  });


  function removeTask(id: string, todolistId: string) {
    dispatchTasks(removeTaskAC(todolistId, id))
  }

  function addTask(title: string, todolistId: string) {
    dispatchTasks(addTaskAC(todolistId, title))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchTasks(changeStatusAC(id, isDone, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolists(changeFilterAC(value,todolistId))

  }

  function removeTodolist(todolistId: string) {
    dispatchTasks(removeTodolistAC(todolistId))
    dispatchTodolists(removeTodolistAC(todolistId))
  }

  const addTodolist = (newTitle: string) => {
    let action = addTodolistAC(newTitle)
    dispatchTasks(action)
    dispatchTodolists(action)
  }

  const editTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatchTasks(editTaskAC(todoListId, taskId, newTitle))
  }

  const editTodoList = (todoListId: string, newTitle: string) => {
    dispatchTodolists(editTodoListAC(todoListId,newTitle ))
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

              return <Grid item>
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

export default App;
