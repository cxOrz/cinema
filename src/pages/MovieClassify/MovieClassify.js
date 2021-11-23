import React, { useEffect, useReducer, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { GRID_LOCALE_TEXT } from '../../configs/GridLocaleTranslate';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import axios from 'axios';
import { ADDCATEGORY, DELETECATEGORY, SELECTCATEGORY, UPDATECATEGORY } from '../../configs/api';
import FormDialog from '../../components/FormDialog/FormDialog';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';

function MovieClassify() {
  const useStyle = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none'
      },
    }
  })
  const formAddText = {
    title: '添加电影类别',
    text: '根据需要添加电影的类别填写，例如科幻类、爱情、惊悚、喜剧...',
    textfield: ['类别名称'],
  }
  const formEditText = {
    title: '修改电影类别',
    text: '请修改电影的类别，将原有类别修改成其他类别，唯一ID不变',
    textfield: ['类别名称'],
    defaultValueNames: ['category']
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
    { field: 'id', headerName: 'ID', width: 280, sortable: false },
    { field: 'category', headerName: '影片类型', width: 130, sortable: false },
    actionButton
  ];
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios.get(SELECTCATEGORY.URL).then((res) => {
      setRows(res.data.data)
    })
  }, [])

  // 添加数据
  function addRow(data) {
    axios.get(ADDCATEGORY.URL, {
      params: {
        category: data.dom[0].value
      }
    }).then((res) => {
      if (res.data.code === 1) {
        setRows((state) => {
          return [{
            id: res.data.id,
            category: data.dom[0].value
          }, ...state]
        })
        setOpen(true)
      }
    })
  }

  function removeRow(data) {
    axios.get(DELETECATEGORY.URL, {
      params: {
        id: data
      }
    }).then((res) => {
      if (res.data.code === 1) {
        setRows((state) => {
          const arr = [...state]
          return arr.filter((obj) => {
            if (obj.id !== data) return obj
            return false
          })
        })
        setOpen(true)
      }
    })
  }

  function updateRow(data) {
    console.log(data)
    axios.get(UPDATECATEGORY.URL, {
      params: {
        id: data.id,
        category: data.dom[0].value
      }
    }).then((res) => {
      console.log(res.data)
      if (res.data.code === 1) {
        setRows((state) => {
          const arr = [...state]
          return arr.map((obj) => {
            if (obj.id !== data.id) {
              return obj
            } else {
              return ({
                id: data.id,
                category: data.dom[0].value
              })
            }
          })
        })
        setOpen(true)
        // window.location.reload()/
      }
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
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbar }}
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

export default MovieClassify
