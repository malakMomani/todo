
import React, { useState } from 'react';
import React, { useContext, useState } from 'react';
import { ListGroup, Button, Form, Badge, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SettingsContext } from '../../context/settingContext.js';
import { PaginationContext } from '../../context/paginationContext';
import Pagination from './pagination.js';
import quickSort from '../../helper/quick-sort.js';

function TodoList(props) {

  let settingContext = useContext(SettingsContext);
  let pagenationContext = useContext(PaginationContext);

  // console.log('context', context);

  console.log(props.list);

  let items = quickSort(props.list, 0 , props.list.length-1);

  console.log(items);
  if(settingContext.hideCompletedItems){
    items = items.filter(item => !item.complete)
  }

  const indexOfLastItem = pagenationContext.currentPage * pagenationContext.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagenationContext.itemsPerPage;
  items = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => pagenationContext.setCurrentPage(pageNumber);

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
        <Button variant="outline-primary" onClick={() => settingContext.setHideCompletedItems(!settingContext.hideCompletedItems)}>
          Hide Completed Items
        </Button>
        <Modal.Dialog>
          {items.map((item, index) => (
            <Card key={`${item}${index}`} >


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

                <Form className="updateForm" style={{ display: show ? 'block' : 'none' }} onSubmit={handleUpdate}>
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

      <Pagination
            itemsPerPage={pagenationContext.itemsPerPage}
            totalItems={props.list.length}
            paginate={paginate}>
      </Pagination>
    </>
  );
}
export default TodoList;