import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName as setUser } from '../../reducers/user'
import InputWithIcon from '../../components/InputWithIcon/InputWithIcon'
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import axios from 'axios';
import { LOGIN } from '../../configs/api'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material';
import useAuth from '../../components/Auth/Auth'

export default function User() {
  const navigate = useNavigate()
  const user = useSelector(state => { return state.user.username })
  const dispatch = useDispatch()
  const [UserName, setUserName] = useState('')
  const [UserPassword, setUserPassword] = useState('')
  const { login: Login } = useAuth()

  function login(kbd = { key: '' }) {
    if (kbd.key === '' || kbd.key === 'Enter') {
      axios.post(LOGIN.URL, {
        username: UserName,
        password: UserPassword
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 1) {
          dispatch(setUser(UserName.toString()))
          console.log(user)
          Login().then(() => {
            console.log(1)
          })
          navigate('/')
        }
      })
    }
  }
  function logout() {
    dispatch(setUser('Anonymous'))
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {user === 'Anonymous' ?
        <>
          <InputWithIcon title="账号"
            type="text"
            value={UserName}
            onChange={(e) => { setUserName(e.target.value) }}
          >
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </InputWithIcon>
          <InputWithIcon title="密码"
            type="password"
            value={UserPassword}
            onEnter={login}
            onChange={(e) => { setUserPassword(e.target.value) }}
          >
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}></LockIcon>
          </InputWithIcon>
          <Button onClick={() => login()} sx={{ mt: 2, width: '1rem', alignSelf: 'center' }} variant="contained">登录</Button>
        </>
        :
        <>
          <Typography variant="h3">您好，{user}</Typography>
          <br />
          <Button sx={{
            width: '1rem',
            alignSelf: 'center'
          }} onClick={logout} variant="contained">登出</Button>
        </>
      }
    </div>
  )
}
