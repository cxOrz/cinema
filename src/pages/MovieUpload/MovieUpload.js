import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { UPLOAD } from '../../configs/api'
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel'

function MovieUpload() {
  const [open, setOpen] = useState(false)
  const [ProgressCircle, setProgressCircle] = useState(true)
  const [Progress, setProgress] = useState(0)
  const fileInput = useRef(null)

  function upload() {
    const formData = new FormData()
    formData.append('file', fileInput.current.files[0])
    setProgressCircle(false)
    axios({
      method: 'POST',
      url: UPLOAD.URL,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        // 计算进度
        setProgress(e.loaded / e.total * 100)
      },
      data: formData
    }).then((res) => {
      handleComlpete()
      console.log(res.data)
    })
  }

  function handleComlpete() {
    // 启用提示
    setOpen(true)
    // 关闭进度圈
    setProgressCircle(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <div>
      <input ref={fileInput}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={upload}
      />
      <Button
        sx={{ display: ProgressCircle ? 'inherit' : 'none' }}
        onClick={() => { fileInput.current.click() }}
        variant="contained"
      >上传</Button>
      <CircularProgressWithLabel hidden={ProgressCircle} value={Progress}></CircularProgressWithLabel>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          上传成功
        </Alert>
      </Snackbar>
    </div>
  )
}

export default MovieUpload
