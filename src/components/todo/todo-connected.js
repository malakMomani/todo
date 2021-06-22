import React, { useEffect, useState } from 'react';
import TodoList from './list.js'
import TodoForm from './form.js';
import { Navbar } from 'react-bootstrap';
import './todo.scss';

const todoAPI = 'https://api-server-malak.herokuapp.com/task';


const ToDo = () => {

  const [list, setList] = useState([]);
  const _addItem = (item) => {

    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      // mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await _getTodoItems();
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  const _getTodoItems = async () => {
    // axios.get(todoAPI)
    // .then(response => response.json)
    // .then(data => console.log(data))
    // .catch(err => console.log(err))

    await fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => {
        data.json();
      }).then(data => setList(data))
      .catch(console.error);
  };

  const _deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      fetch(`${todoAPI}/${id}`, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(() => {
          let newList = list.filter(listItem => listItem._id !== id);
          setList(newList);
        })
        .catch(console.error);
    }
  };

  const _updateItem = (id, value) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      fetch(`${todoAPI}/${id}`, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      })
        .then(response => response.json())
        .then(() => {
          item.text = value;
          let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
          setList(newList);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    document.title = `TO DO ${list.filter(item => !item.complete).length} / ${list.length}`;
  }, [list]);

  // useEffect(_getTodoItems, []);

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
};

export default ToDo;