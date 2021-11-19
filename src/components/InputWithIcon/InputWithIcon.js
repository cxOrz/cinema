import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function InputWithIcon(props) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {props.children}
        <TextField label={props.title} type={props.type} variant="standard" />
      </Box>
    </Box>
  );
}

