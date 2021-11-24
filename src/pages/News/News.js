import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { GRID_LOCALE_TEXT } from '../../configs/GridLocaleTranslate';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import axios from 'axios';
import { AllNEWS, ADDNEWS, UPDATENEWS, DELETENEWS } from '../../configs/api';
import FormDialog from '../../components/FormDialog/FormDialog';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Add from '@mui/icons-material/Add';

function News() {
  const useStyle = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none'
      },
    }
  })
  const formAddText = {
    title: '添加新闻',
    text: '请填写新闻标题、内容、新闻分区',
    textfield: ['标题', '内容', '分区']
  }
  const formEditText = {
    title: '修改新闻信息',
    text: '可以修改新闻标题、内容、新闻分区，想咋改咋改',
    textfield: ['标题', '内容', '分区'],
    defaultValueNames: ['title', 'content', 'mcategory']
  }
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <FormDialog label="添加" form={formAddText} startIcon={<Add />} action={addRow} >
        </FormDialog>
      </GridToolbarContainer>
    )
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

  const classes = useStyle()
  const columns = [
    { field: 'title', headerName: '标题', flex: 0.4, sortable: false },
    { field: 'content', headerName: '内容', flex: 1, sortable: false },
    {
      field: 'mcategory',
      headerName: '分区',
      width: 100,
      sortable: false
    },
    {
      field: 'date',
      headerName: '创建日期',
      width: 160
    },
    actionButton
  ];
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios.get(AllNEWS.URL).then((res) => {
      console.log(res.data)
      setRows(res.data.data)
    })
  }, [])

  function addRow(data) {
    const date = new Date()
    axios.post(ADDNEWS.URL, {
      "title": data.dom[0].value,
      "content": data.dom[1].value,
      "mcategory": data.dom[2].value,
      "date": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }).then((res) => {
      if (res.data.code === 1) {
        setRows((state) => {
          return [{
            id: res.data.id,
            "title": data.dom[0].value,
            "content": data.dom[1].value,
            "mcategory": data.dom[2].value,
            "date": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
          }, ...state]
        })
        setOpen(true)
      }
    })
  }

  function removeRow(data) {
    axios.post(DELETENEWS.URL, {
      ids: [data]
    }).then((res) => {
      if (res.data.code === 1) {
        setOpen(true)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
    })
  }

  function updateRow(data) {
    console.log(data)
    axios.post(UPDATENEWS.URL, {
      "id": data.id,
      "title": data.dom[0].value,
      "content": data.dom[1].value,
      "mcategory": data.dom[2].value
    }).then((res) => {
      console.log(res.data)
      if (res.data.code === 1) {
        setOpen(true)
      }
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    })
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <DataGrid
        localeText={GRID_LOCALE_TEXT}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: CustomToolbar }}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
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

export default News
