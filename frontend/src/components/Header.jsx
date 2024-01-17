import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUser, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">MERN App</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#login">
            <FaUser className="me-1" /> Login
          </Nav.Link>
          <Nav.Link href="#signup">
            <FaSignInAlt className="me-1" /> Sign Up
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
