import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {AddBox, Delete} from '@mui/icons-material';

type InputPropsType = {
  callBack: (newTitle: string) => void
}

const Input = (props: InputPropsType) => {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }


  const addTask = useCallback(() => {
    let newTitle = title.trim();
    if (newTitle !== '') {
      props.callBack(newTitle);
      setTitle('');
    } else {
      setError('Title is required');
    }
  },[props.callBack, title])

  return (
    <div>
      <TextField
        size={'small'}
        value={title}
        id="outlined-basic"
        label={error}
        variant="outlined"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
      />

      <Button
        variant="contained"
        onClick={addTask}
        style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', backgroundColor: 'black'}}
      >
        +
      </Button>

    </div>
  );
};

export default React.memo(Input)