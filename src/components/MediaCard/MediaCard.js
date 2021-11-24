import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function MediaCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    props.close({ show: false })
  };

  useEffect(() => {
    if (props.show === true) {
      setOpen(true)
    }
  }, [props.show])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="视频播放"
        open={open}
      >
        <DialogContent dividers>
          <video width='100%' src={props.url} controls autoPlay></video>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
