import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import User from './pages/User/User'
import Main from './pages/Main/Main'
import MovieUpload from './pages/MovieUpload/MovieUpload'
import { Provider } from 'react-redux'
import store from './store'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="user" element={<User />} />
            <Route path="upload" element={<MovieUpload />} />
            <Route path="*" element={<Main />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
