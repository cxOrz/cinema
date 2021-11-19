import React from 'react'
import { useSelector } from 'react-redux'
import InputWithIcon from '../../components/InputWithIcon/InputWithIcon'
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

export default function User() {
  const user = useSelector(state => { return state.user.username })
  return (
    <div>
      <InputWithIcon title="账号" type="text">
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </InputWithIcon>
      <InputWithIcon title="密码" type="password">
        <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}></LockIcon>
      </InputWithIcon>
    </div>
  )
}
