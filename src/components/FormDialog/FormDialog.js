import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const refs = useRef([])
  const listIndexes = useRef([])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.icon ?
        <IconButton variant="contained" color="primary" onClick={handleClickOpen}>
          {props.icon}
        </IconButton>
        :
        <Button startIcon={props.startIcon} variant="outlined" onClick={handleClickOpen}>
          {props.label}
        </Button>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.form.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.form.text}
          </DialogContentText>
          {props.form.textfield.map((value, index) => {
            return (
              <TextField
                key={index}
                inputRef={(r) => {
                  if (!listIndexes.current.includes(index)) {
                    listIndexes.current.push(index)
                    refs.current.push(r)
                  }
                }}
                margin="dense"
                id="name"
                label={value}
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.defaultValues && props.defaultValues[props.form.defaultValueNames[index]]}
              />
            )
          })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={() => { props.action({ dom: refs.current, id: props.defaultValues ? props.defaultValues['id'] : null }); handleClose(); }}>确定</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}