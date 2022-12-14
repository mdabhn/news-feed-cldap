import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
import { ContextApi } from '../../App'

const Navigation = () => {
  const { pathname } = useLocation()

  const { searchContext, setSearchContext } = useContext(ContextApi)

  useEffect(() => {
    setSearchContext('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>News Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='mx-auto my-2 my-lg-0'
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to={'/'} style={{ color: pathname === '/' && 'green' }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/us'} style={{ color: pathname === '/us' && 'green' }}>
                US
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={'/world'}
                style={{ color: pathname === '/world' && 'green' }}
              >
                World
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={'/science'}
                style={{ color: pathname === '/science' && 'green' }}
              >
                Science
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={'/arts'}
                style={{ color: pathname === '/arts' && 'green' }}
              >
                Arts
              </Link>
            </Nav.Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              value={searchContext}
              onChange={(text) => setSearchContext(text.target.value)}
            />
            {/* <Button variant='outline-success'>Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
