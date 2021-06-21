import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Navbar } from 'react-bootstrap';


import './todo.scss';

function ToDo() {

  const [list, setList] = useState([]);

  console.log(typeof list);
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let toDoList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(toDoList);
    }

  };

  const deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let newList = list.filter(listItem => listItem._id !== id);
      setList(newList);
    }
  };

  const updateItem = (id, itemObj) => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.text = itemObj.newTask;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  };

  // this will happen after the initial render ONLY
  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(list);
  }, []);

  return (
    <div className="todoDiv">
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >To Do List Manager ({list.filter(item => !item.complete).length})</Navbar.Brand>
        </Navbar>
      </header>

      <section className="todo">

        <div>
          <TodoForm addItem={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
      </section>
    </div>
  );
}

export default ToDo;