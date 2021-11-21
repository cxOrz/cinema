import { createHashHistory } from 'history'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function AuthRouter(props) {
  const history = createHashHistory()
  const user = useSelector(state => state.user.username)
  const navigate = useNavigate()

  useEffect(() => {
    const distroy = history.listen((o) => {
      if (user === 'Anonymous' && o.location.pathname !== '/user') {
        navigate('user')
        console.log(o.location)
      }
    })
    return () => { distroy() }
  }, [])

  return (
    <div>
      {props.children}
    </div>
  )
}

export default AuthRouter
