import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid'
import { GRID_LOCALE_TEXT } from '../../configs/GridLocaleTranslate';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import axios from 'axios';
import { MOVIEINFO, UPDATEMOVIEINFO } from '../../configs/api';
import FormDialog from '../../components/FormDialog/FormDialog';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MediaCard from '../../components/MediaCard/MediaCard';

function MovieManage() {
  const useStyle = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none'
      },
    }
  })
  const formEditText = {
    title: '修改电影详细信息',
    text: '请修改电影的类别，将原有类别修改成其他类别，唯一ID不变',
    textfield: ['影片名称', '影片类别', '上映年度', '导演'],
    defaultValueNames: ['mname', 'mcategory', 'myear', 'mauthor']
  }

  const actionButton = {
    field: "action",
    headerName: "操作",
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <>
          <FormDialog
            label={null}
            form={formEditText}
            startIcon={null}
            icon={<Edit />}
            action={updateRow}
            defaultValues={cellValues.row}
          >
          </FormDialog>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              removeRow(cellValues.id)
            }}
          >
            <Delete></Delete>
          </IconButton>
        </>
      );
    }
  }
  const thumbnail = {
    field: "overview",
    headerName: "预览",
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Box sx={{
          ":hover": {
            cursor: 'pointer'
          }
        }}
          component="img"
          alt="缩略图"
          height='50px'
          src={cellValues.row.img_url}
          onClick={(e) => handleVideo(cellValues)}
        >
        </Box>
      )
    }
  }
  const classes = useStyle()
  const columns = [
    thumbnail,
    { field: 'mname', headerName: '影片名称', width: 130, sortable: false },
    { field: 'mcategory', headerName: '影片类别', width: 130, sortable: false },
    {
      field: 'myear',
      headerName: '上映年度',
      type: 'number',
      width: 100,
    },
    {
      field: 'mauthor',
      headerName: '导演',
      description: '只记录导演，编剧等作者不记录',
      sortable: false,
      width: 160
    },
    actionButton
  ];
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [video, setVideo] = useState({
    show: false,
    url: ''
  })

  useEffect(() => {
    axios.get(MOVIEINFO.URL).then((res) => {
      console.log(res.data)
      setRows(res.data.data)
    })
  }, [])

  function removeRow(data) {
    axios.post(UPDATEMOVIEINFO.URL, {
      id: data,
      mcategory: '暂无',
      myear: '暂无',
      mauthor: '暂无',
    }).then((res) => {
      if (res.data.state === '修改成功') {
        setOpen(true)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
    })
  }

  function updateRow(data) {
    console.log(data)
    axios.post(UPDATEMOVIEINFO.URL, {
      id: data.id,
      mname: data.dom[0].value,
      mcategory: data.dom[1].value,
      myear: data.dom[2].value,
      mauthor: data.dom[3].value,
    }).then((res) => {
      console.log(res.data)
      if (res.data.state === '修改成功') {
        setOpen(true)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
    })
  }

  function handleClose() {
    setOpen(false)
  }
  function handleVideo(cellValues) {
    setVideo({
      show: true,
      url: cellValues.row.movie_url,
      close: setVideo
    })
  }

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <DataGrid
        localeText={GRID_LOCALE_TEXT}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <MediaCard
        show={video.show}
        url={video.url}
        close={video.close}
      ></MediaCard>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          操作成功
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MovieManage
