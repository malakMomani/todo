import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList(props) {
  /* <ListGroup>
  <ListGroup.Item>No style</ListGroup.Item>
  <ListGroup.Item variant="primary">Primary</ListGroup.Item>
  <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
  <ListGroup.Item variant="success">Success</ListGroup.Item>
  <ListGroup.Item variant="danger">Danger</ListGroup.Item>
  <ListGroup.Item variant="warning">Warning</ListGroup.Item>
  <ListGroup.Item variant="info">Info</ListGroup.Item>
  <ListGroup.Item variant="light">Light</ListGroup.Item>
  <ListGroup.Item variant="dark">Dark</ListGroup.Item>
</ListGroup> */

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
            {/* <Button variant="outline-success" onClick={() => props.updateItem(item._id)}>Update</Button> */}

          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default TodoList;