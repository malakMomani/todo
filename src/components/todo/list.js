import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList(props) {

  let [show, setShow] = useState(false);
  let [id, setId] = useState();
  let [newTask, setNewTask] = useState();
  let [difficulty, setDif] = useState();
  let [assignee , setAssignee] = useState();

  function handleShow(id) {
    console.log('-----1',show)
    setShow(!show);
    setId(id);
  }

  function handleUpdate(e){
    e.preventDefault();
    props.updateItem(id, {
      newTask, 
      difficulty,
      assignee
    })
  }

  function handleTaskChange(e) {
    setNewTask(e.target.value);
  }

  function handleDifChange(e) {
    setDif(e.target.value);
  }

  function handleAssChange(e) {
    setAssignee(e.target.value);
  }
  return (
    <>
      <ListGroup className="list">
        {props.list.map(item => (

          <ListGroup.Item
            className={`complete-${item.complete.toString()} listItem`}
            key={item._id}
            variant="warning"
          >
            <div>
              <Button variant="danger" onClick={() => props.deleteItem(item._id)} >X</Button>
            </div>
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
            <Button variant="outline-success" onClick={() => handleShow(item._id)}>Update</Button>

            <Form id="updateForm" style={{display: show ? 'block' : 'none' }} onSubmit={handleUpdate}>
              <Form.Control placeholder="update task" onChange={handleTaskChange}/>
              <Form.Control placeholder="update dificulty" onChange={handleDifChange} />
              <Form.Control placeholder="update Assignee"onChange={handleAssChange} />
              <Button type ="submit">update</Button>
            </Form>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
export default TodoList;