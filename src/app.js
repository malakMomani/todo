import React from 'react';

import ToDo from './components/todo/todo';
import Header from './components/header/header';
import SettingsProvider from './context/settingContext';
import PaginationProvider from './context/paginationContext';

export default function App() {
  return (
    <>
      <SettingsProvider>
        <PaginationProvider>
          <Header />
          <ToDo />
        </PaginationProvider>
      </SettingsProvider>
    </>
  );
}