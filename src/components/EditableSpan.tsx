import React, {ChangeEvent, useCallback, useState} from 'react';
import {findByTitle} from '@testing-library/react';

export type EditableSpanType = {
  oldTitle: string
  callback: (newTitle: string) => void
}


const EditableSpan: React.FC<EditableSpanType> = ({oldTitle, callback}) => {

  const [edit, setEdit] = useState<boolean>(false)
  let [newTitle, setNewTitle] = useState<string>(oldTitle)
  const changeEditHandler = useCallback(() => {
    setEdit(!edit)
  },[])

  const addTask = useCallback(() => {
    if (newTitle !== '') {
      callback(newTitle);
    }
  },[newTitle])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    addTask()
  },[addTask])



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

export default React.memo(EditableSpan)