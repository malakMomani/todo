import React from 'react';

import ToDo from './components/todo/todo-connected';
import Header from './components/header/header';

export default function App() {
    return (
      <>
        <Header />
        <ToDo />
      </>
    );
}