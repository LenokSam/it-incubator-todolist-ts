import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import Input from './components/Input';
import EditableSpan from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
  editTask: (todoListId: string, taskId: string, newTitle: string) => void
  editTodoList: (todoListId: string, newTitle: string) => void
}

const Todolist:React.FC<PropsType> =({id, title, tasks,removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, filter,editTask, editTodoList}) =>{

  let allTodolistTasks = tasks;
  let tasksForTodolist = allTodolistTasks;

  if (filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone );
  }
  if (filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
  }


  const removeTodolistHandler = useCallback(() => {
      removeTodolist(id)
    }, [])

  const onAllClickHandler = useCallback(() =>{
      changeFilter('all', id);
  },[id])


  const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id]);
  const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id])

  const addTaskHandler = useCallback((newTitle: string) => {
    addTask(newTitle, id)
  },[id])
  const editableSpanHandler = useCallback((taskId: string, newTitle: string) => {
    editTask(id, taskId, newTitle)
  },[id])

  const editaTodoListHandler = useCallback((newTitle: string) => {
   editTodoList(id, newTitle)
  },[id])

  return <div>
    <h3>
      <EditableSpan oldTitle={title} callback={editaTodoListHandler}/>

      <IconButton aria-label="delete" onClick={removeTodolistHandler}>
        <Delete/>
      </IconButton>

    </h3>

    <Input callBack={addTaskHandler}/>
    {tasks &&
        <ul>
          {
            tasksForTodolist.map(t => {
              const onClickHandler = () => removeTask(t.id, id)
              const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                changeTaskStatus(t.id, newIsDoneValue, id);
              }

              return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                  onChange={onChangeHandler}
                  checked={t.isDone}
                />
                <EditableSpan oldTitle={t.title} callback={(newTitle: string) => editableSpanHandler(t.id, newTitle)}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                  <Delete/>
                </IconButton>

              </li>
            })
          }
        </ul>}
    <div>

      <Button
        variant={filter === 'all' ? 'outlined' : 'contained'} color="secondary" onClick={onAllClickHandler}
        size={'small'}>
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'contained'} color="success" onClick={onActiveClickHandler}
        size={'small'}>
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'contained'} color="error"
        onClick={onCompletedClickHandler} size={'small'}>
        Completed
      </Button>
    </div>
  </div>
}


export default React.memo(Todolist)