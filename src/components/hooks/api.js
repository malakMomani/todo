import { useEffect, useState } from 'react';

const todoAPI = 'https://api-server-malak.herokuapp.com/task';


const useApi = () => {

  const [list, setList] = useState([]);
  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
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

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => {
        data.json();
      }).then(data =>{
        console.log('data' , data);
      })
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


  useEffect(_getTodoItems, []);

  return [_addItem, _toggleComplete, list, setList, _deleteItem ,_updateItem , _getTodoItems];
  // return (
  //   <>
  //     <header>
  //       <h2>
  //         There are {list.filter(item => !item.complete).length} Items To Complete
  //       </h2>
  //     </header>

  //     <section className="todo">

  //       <div>
  //         <TodoForm handleSubmit={_addItem} />
  //       </div>

  //       <div>
  //         <TodoList
  //           list={list}
  //           handleComplete={_toggleComplete}
  //           deleteItem={_deleteItem}
  //           updateItem={_updateItem}
  //         />
  //       </div>
  //     </section>
  //   </>
  // );
};

export default useApi;