import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { NETEASENEWS } from '../../configs/api'

function Main() {
  const [data, setData] = useState({})
  const [open, setOpen] = useState(true)

  useEffect(() => {
    axios.get(NETEASENEWS.URL).then((res) => {
      setData(res.data)
    }).then(() => {
      setOpen(false)
    })
  }, [])

  return (
    <Box>
      <Card hidden={open} sx={{ maxWidth: 345, zIndex: 20 }}>
        <CardMedia
          component="img"
          alt="新闻"
          height="140"
          image={data.img_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.note}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.content}
          </Typography>
        </CardContent>
      </Card>
      <div style={{
        zIndex: -1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.img_url})`
      }}></div>
    </Box>
  );
}

export default Main
