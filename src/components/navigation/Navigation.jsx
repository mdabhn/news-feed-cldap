import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to={'/'}>Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/us'}>US</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/world'}>World</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/science'}>Science</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/arts'}>Arts</Link>
            </Nav.Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
