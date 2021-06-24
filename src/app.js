import React from 'react';

import ToDo from './components/todo/todo';
import Header from './components/header/header';
import SettingsProvider from './context/settingContext';
import PaginationProvider from './context/paginationContext';
import AuthProvider from './context/authContext';

export default function App() {
  return (
    <>
      {/* 
            <Login/>
            <Auth action="delete">
                <button>Fake Delete</button>
            </Auth>
            <Auth action="update">
                <button>Fake Update</button>
            </Auth>
            <Auth action="create">
                <button>+ Create a new item</button>
            </Auth>
            <Auth action="read">
                <div>Fake List ..</div>
            </Auth> */}
      <AuthProvider>
        <SettingsProvider>
          <PaginationProvider>
            <Header />
            <ToDo />
          </PaginationProvider>
        </SettingsProvider>
      </AuthProvider>

    </>
  );
}