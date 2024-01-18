import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="#">
          MERN App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/login'>
              <Nav.Link >
                <FaUser className="me-1" /> Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Nav.Link href="/register">
                <FaSignInAlt className="me-1" /> Sign Up
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
