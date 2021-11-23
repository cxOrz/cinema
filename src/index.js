import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import User from './pages/User/User'
import Main from './pages/Main/Main'
import MovieUpload from './pages/MovieUpload/MovieUpload'
import { Provider } from 'react-redux'
import store from './store'
import { AuthProvider, RequireAuth } from './components/Auth/Auth'
import News from './pages/News/News'
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer'

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
