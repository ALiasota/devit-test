import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isLogged: boolean;
}

export default function PublicRoute({ isLogged }: Props) {
    return (
        <>
            {isLogged ? <Navigate to="contacts" /> : <Outlet />}
        </>
    );
}
