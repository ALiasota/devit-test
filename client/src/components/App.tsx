import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { useFetchUserQuery } from '../redux/auth/authSlice';

function App() {
  const { data, isLoading } = useFetchUserQuery();
  
  const isLogged = data ? true : false;
  return (
    <div
      style={{ maxWidth: '500px' }}
    >
      {isLoading ? (
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">User loadings</span>
        </div>
      ) : (
        <>
          {/* <Suspense fallback={<h1>Loading....</h1>}>
            <Routes>
              <Route path="/" element={<PublicRoute isLogged={isLogged} />}>
                <Route path="/" element={<Navigate replace to="login" />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>

              <Route path="/" element={<PrivateRoute isLogged={isLogged} />}>
                <Route path="/" element={<Navigate replace to="posts" />} />
                <Route path="posts" element={<Contacts />} />
              </Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Suspense> */}
        </>
      )}
    </div>
  );
}

export default App;
