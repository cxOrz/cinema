import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputWithIcon(props) {
  const onEnter = props.onEnter ? props.onEnter : () => { }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {props.children}
        <TextField
          onChange={props.onChange}
          value={props.value}
          label={props.title}
          type={props.type}
          variant="standard"
          onKeyDown={onEnter}
        />
      </Box>
    </Box>
  );
}

