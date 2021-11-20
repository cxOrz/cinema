import Button from '@material-ui/core/Button'
import axios from 'axios'
import React, { useRef } from 'react'
import { UPLOAD } from '../../configs/api'

function MovieUpload() {
  const fileInput = useRef(null)

  function upload() {
    const formData = new FormData()
    formData.append('file', fileInput.current.files[0])
    axios({
      method: 'POST',
      url: UPLOAD.URL,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div>
      <input ref={fileInput}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={upload}
      />
      <Button onClick={() => { fileInput.current.click() }} variant="contained">上传</Button>
    </div>
  )
}

export default MovieUpload
