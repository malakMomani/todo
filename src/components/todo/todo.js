import React, { useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Navbar } from 'react-bootstrap';
import useApi from '../hooks/api';

import './todo.scss';

function ToDo() {

  const [_addItem , _toggleComplete, list , _deleteItem, _updateItem ] = useApi();

  console.log('-----',list);
  
  useEffect(() => {
    document.title = `TO DO ${list.filter(item => !item.complete).length} / ${list.length}`;
  }, [list]);

  
  return (
    <div className="todoDiv">
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >To Do List Manager ({list.filter(item => !item.complete).length})</Navbar.Brand>
        </Navbar>
      </header>

      <section className="todo">

        <div>
          <TodoForm addItem={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            deleteItem={_deleteItem}
            updateItem={_updateItem}
          />
        </div>
      </section>
    </div>
  );
}

export default ToDo;