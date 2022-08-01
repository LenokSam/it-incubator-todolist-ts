import React, {ChangeEvent, useState} from 'react';
import {findByTitle} from '@testing-library/react';

export type EditableSpanType = {
  oldTitle: string
  callback: (newTitle: string) => void
}


export const EditableSpan: React.FC<EditableSpanType> = ({oldTitle, callback}) => {

  const [edit, setEdit] = useState<boolean>(false)
  let [newTitle, setNewTitle] = useState<string>(oldTitle)
  const changeEditHandler = () => {
    setEdit(!edit)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    addTask()
  }
  const addTask = () => {

    if (newTitle !== '') {
      callback(newTitle);
      // setTitle("");
    }
  }


  return (
    edit
      ? <input
        autoFocus
        onChange={onChangeHandler}
        onBlur={changeEditHandler}
        value={newTitle}
      />
      : <span
        onDoubleClick={changeEditHandler}

      >{oldTitle}    </span>
  );
};

