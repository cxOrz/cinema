import React, { useState, createContext, useContext } from "react";
import { Navigate } from 'react-router';

const AuthContext = createContext();

/**
 * 自定义hook，函数返回 Context 值，包括 authed状态、login、logout函数来修改authed状态
 */
function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    }
  };
}

// 封装 Provider HOC
export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// 返回 Context 值
export default function AuthConsumer() {
  return useContext(AuthContext);
}

/**
 * @description
 * 封装拦截组件,如果已登录，返回包括的children组件；
 * 未登录，返回跳转组件。
 * 
 * @example
 * <RequireAuth>
 *   <MovieUpload />
 * </RequireAuth>
 */
export function RequireAuth({ children }) {
  // const { authed } = AuthConsumer();
  const authed = localStorage.getItem('login')

  return authed !== '' ? (
    children
  ) : (
    <Navigate to="/user" replace />
  );
}