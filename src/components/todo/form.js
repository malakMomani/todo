
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function TodoForm(props) {

  let [item, setItem] = useState();

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    e.target.reset();
    props.addItem(item);
    const item1 = {};
    setItem(item1);
  };

  return (
    <>
      <h1>Add To Do Item</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Add To Do item
            <Form.Control
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </Form.Group>

        <Button variant="secondary" type="submit">Add Item</Button>
      </Form>
    </>
  );
}

export default TodoForm;