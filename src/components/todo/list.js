import React, { useState } from 'react';
import { ListGroup, Button, Form, Badge, Card, Modal } from 'react-bootstrap';
import useForm from '../hooks/form';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList(props) {

  let [show, setShow] = useState(false);
  let [id, setId] = useState('');
  let [newTask, setNewTask] = useState('');
  let [difficulty, setDif] = useState();
  let [assignee, setAssignee] = useState();

  function handleShow(id) {
    console.log('-----1', show)
    setShow(!show);
    setId(id);
  }

  function handleUpdate(e) {
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
        <Modal.Dialog>
          {props.list.map(item => (
            <Card>


              <Modal.Header>
                <Modal.Title>

                  <Button variant="danger" onClick={() => props.deleteItem(item._id)} id="deleteButton" >X</Button>

                  <div id="top">
                    <Badge
                      className={`complete-${item.complete.toString()} budge`}
                      key={item._id}
                      onClick={() => props.handleComplete(item._id)}
                      type="submit"
                      pill
                      variant={item.complete === true ? 'danger' : 'success'}
                    >
                      {item.complete === true ? 'complete' : 'pending'}
                    </Badge><span id="assignee">{item.assignee}</span>
                  </div>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <span>
                  {item.text}
                </span>
              </Modal.Body>

              <Modal.Footer>
                <small id="difficulty">Difficulty: {item.difficulty}</small>
                <Button variant="outline-success" onClick={() => handleShow(item._id)}>Update</Button>

                <Form id="updateForm" style={{ display: show ? 'block' : 'none' }} onSubmit={handleUpdate}>
                  <Form.Control placeholder="update task" onChange={handleTaskChange} />
                  <Form.Control placeholder="update dificulty" onChange={handleDifChange} />
                  <Form.Control placeholder="update Assignee" onChange={handleAssChange} />
                  <Button type="submit">update</Button>
                </Form>
              </Modal.Footer>
            </Card>
          ))}
        </Modal.Dialog>
      </ListGroup>
    </>
  );
}
export default TodoList;