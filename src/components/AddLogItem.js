import React, { useState } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const AddLogItem = ({ addItem }) => {
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  const [priority, setPriority] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addItem({ text, user, priority });

    setText('');
    setUser('');
    setPriority('');
  }

  return (
    <Card className='mt-5, mb-3'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className='my-3'>
            <Col>
              <Form.Control placeholder='Log' value={text}
                onChange={e => setText(e.target.value)} />
            </Col>
            <Col>
              <Form.Control placeholder='User' value={user}
                onChange={e => setUser(e.target.value)} />
            </Col>
            <Col>
              <Form.Control as='select' value={priority}
                onChange={e => setPriority(e.target.value)}>
                  <option value='0'>Select Priority</option>
                  <option value='low'>Low</option>
                  <option value='moderate'>Moderate</option>
                  <option value='high'>High</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type='submit' variant='secondary' block>Add Log</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddLogItem
