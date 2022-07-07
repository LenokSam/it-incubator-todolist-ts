import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from './components/Input';
import {EditableSpan} from './components/EditableSpan';
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

export function Todolist(props: PropsType) {


  const removeTodolist = () => props.removeTodolist(props.id)

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

  const addTaskHandler = (newTitle: string) => {
    props.addTask(newTitle, props.id)
  }
  const editableSpanHandler = (taskId: string, newTitle: string) => {
    props.editTask(props.id, taskId, newTitle)
  }

  const editaTodoListHandler = (newTitle: string) => {
    props.editTodoList(props.id, newTitle)
  }

  return <div>
    <h3>
      <EditableSpan oldTitle={props.title} callback={editaTodoListHandler}/>

      <IconButton aria-label="delete">
        <Delete onClick={removeTodolist}/>
      </IconButton>

      {/*<button onClick={removeTodolist}>x</button>*/}
    </h3>

    <Input callBack={addTaskHandler}/>

    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }

          return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox
              onChange={onChangeHandler}
              checked={t.isDone}
            />
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <EditableSpan oldTitle={t.title} callback={(newTitle: string) => editableSpanHandler(t.id, newTitle)}/>
            <IconButton aria-label="delete">
              <Delete onClick={onClickHandler}/>
            </IconButton>

            {/*<button onClick={onClickHandler}>x</button>*/}
          </li>
        })
      }
    </ul>
    <div>
      {/*<button className={props.filter === 'all' ? 'active-filter' : ''}*/}
      {/*        onClick={onAllClickHandler}>All*/}
      {/*</button>*/}
      {/*<button className={props.filter === 'active' ? 'active-filter' : ''}*/}
      {/*        onClick={onActiveClickHandler}>Active*/}
      {/*</button>*/}
      {/*<button className={props.filter === 'completed' ? 'active-filter' : ''}*/}
      {/*        onClick={onCompletedClickHandler}>Completed*/}
      {/*</button>*/}

      <Button
        variant={props.filter === 'all' ? 'outlined' : 'contained'} color="secondary" onClick={onAllClickHandler}
        size={'small'}>
        All
      </Button>
      <Button
        variant={props.filter === 'active' ? 'outlined' : 'contained'} color="success" onClick={onActiveClickHandler}
        size={'small'}>
        Active
      </Button>
      <Button
        variant={props.filter === 'completed' ? 'outlined' : 'contained'} color="error"
        onClick={onCompletedClickHandler} size={'small'}>
        Completed
      </Button>
    </div>
  </div>
}


