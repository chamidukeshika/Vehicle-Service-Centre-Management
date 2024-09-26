import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/Logo2.png';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Navbar bg="light" variant="light" expand="md" style={{ backgroundColor: "#000000", paddingLeft: "70px", maxWidth: "100%" }}>
      <LinkContainer to='/'>
        <Navbar.Brand>
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="MERN App Logo"
          />
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto flex-grow-1" style={{ margin: "auto" }}>
          <LinkContainer to="/" exact style={{ marginRight: "50px", marginLeft: "100px" }}>
            <Nav.Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} >Home</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Parts & Lubricants" id="parts-dropdown" style={{ marginRight: "50px" }}>
            <LinkContainer to='/spareparts' >
              <NavDropdown.Item>Vehicle Spare Parts</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/listlubricant/add'>
              <NavDropdown.Item>Lubricants</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to='/requestparts'>
              <NavDropdown.Item>Request Part</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/app/cus" style={{ marginRight: "50px" }}>
            <Nav.Link className={location.pathname === "/app/cus" ? "nav-link active" : "nav-link"} >Make Appointment</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/inquire" style={{ marginRight: "auto" }}>
            <Nav.Link className={location.pathname === "/inquire" ? "nav-link active" : "nav-link"} >Inquires</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/service" style={{ marginRight: "200px" }}>
            <Nav.Link className={location.pathname === "/service" ? "nav-link active" : "nav-link"} >Services</Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={`Welcome ${userInfo.name}`} id="username-dropdown">
              <LinkContainer to='/admin/dashboard'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser className="me-1" /> Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link>
                  <FaSignInAlt className="me-1" /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
