import React from 'react';
import { Nav, Button } from 'react-bootstrap';

const Pagination = (props) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(props.totalItems/props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log('pages' , pageNumbers)

  return(
    <Nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Button onClick={() => props.paginate(number)} className="page-link" >
              {number}
            </Button>
          </li>
        ))}
      </ul>

    </Nav>
  )
}

export default Pagination;