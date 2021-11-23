import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { GRID_LOCALE_TEXT } from '../../configs/GridLocaleTranslate';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import axios from 'axios';
import { MOVIEINFO } from '../../configs/api';

function MovieManage() {
  const useStyle = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none'
      },
    }
  })
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <IconButton onClick={() => { console.log('!') }}>
          <Add></Add>
        </IconButton>
      </GridToolbarContainer>
    )
  }
  const editButton = {
    field: "action",
    headerName: "操作",
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            variant="contained"
            color="primary"
            onClick={(event) => {
              console.log(cellValues)
            }}
          >
            <Edit></Edit>
          </IconButton>
          <IconButton
            variant="contained"
            color="primary"
            onClick={(event) => {
              console.log(cellValues)
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
          src="http://172.30.86.195:8080/imgsave/不得不爱.jpg"
          onClick={() => { console.log('!') }}
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
    editButton,
  ];
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get(MOVIEINFO.URL).then((res) => {
      console.log(res.data)
      setRows(res.data.data)
    })
  }, [])


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
    </Box>
  )
}

export default MovieManage
