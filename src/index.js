import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './components/Auth/Auth'
import './index.css'
import store from './store'
import User from './pages/User/User'
import Main from './pages/Main/Main'
import News from './pages/News/News'
import MovieUpload from './pages/MovieUpload/MovieUpload'
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer'
import MovieManage from './pages/MovieManage/MovieManage'
import MovieClassify from './pages/MovieClassify/MovieClassify'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ResponsiveDrawer />}>
              <Route index element={<Main />} />
              <Route path="user" element={<User />} />
              <Route path="news" element={<News />} />
              <Route path="movie-manage" element={<MovieManage />} />
              <Route path="movie-classify" element={<MovieClassify />} />
              <Route path="upload" element={
                <RequireAuth>
                  <MovieUpload />
                </RequireAuth>
              }
              />
              <Route path="*" element={<Main />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
