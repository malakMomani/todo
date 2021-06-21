
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import useForm from '../hooks/form';


function TodoForm(props) {

  const [handleSubmit , handleInputChange] = useForm(props.addItem);

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