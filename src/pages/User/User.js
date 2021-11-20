import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName as setUser } from '../../reducers/user'
import InputWithIcon from '../../components/InputWithIcon/InputWithIcon'
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { LOGIN } from '../../configs/api'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core';

export default function User() {
  const navigate = useNavigate()
  const user = useSelector(state => { return state.user.username })
  const dispatch = useDispatch()
  const [UserName, setUserName] = useState('')
  const [UserPassword, setUserPassword] = useState('')

  function login() {
    axios.post(LOGIN.URL, {
      username: UserName,
      password: UserPassword
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(setUser(UserName.toString()))
        navigate('/')
      }
    })
  }
  function logout() {
    dispatch(setUser('Anonymous'))

  }

  return (
    <div>
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
          <Button onClick={login} sx={{ mt: 2 }} variant="contained">登录</Button>
        </>
        :
        <>
          <Typography variant="h3">您好，{user}</Typography>
          <br />
          <Button onClick={logout} variant="contained">登出</Button>
        </>
      }
    </div>
  )
}
