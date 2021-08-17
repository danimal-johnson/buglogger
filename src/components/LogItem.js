import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const LogItem = ({ log }) => {
  const { priority, text, user, created } = log;

  const setVariant = () => {
    if (priority === 'high') return 'danger';
    if (priority === 'moderate') return 'warning';
    if (priority === 'low') return 'success';
  }
  return (
    <tr>
      <td>
        <Button variant={setVariant()} className='p-2'>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Button>
        {/* <Badge bg={setVariant()}>{priority}</Badge> */}
        {/* {priority} */}
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>{created}</td>
      <td>
        <Button variant='danger' size='sm'>
          x
        </Button>
      </td>
    </tr>
  )
}

export default LogItem;

						// <tr key={log._id}>
						// 	<td>{log.priority}</td>
						// 	<td>{log.text}</td>
						// 	<td>{log.user}</td>
						// 	<td>{log.created}</td>
						// </tr>