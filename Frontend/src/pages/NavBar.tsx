import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavDropdown } from "react-bootstrap";
import logo from "../assets/images/logo.webp"

const NavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // reusable navlink component. make it DRY and easier to change style
  function NavLink({ path, children }: { path: string; children: ReactNode }) {
    return (
      <Nav.Link
        as={Link}
        to={path}
        onClick={handleClose}
        className="text-light mb-3"
        style={{ fontSize: "26px" }}
      >
        {children}
      </Nav.Link>
    );
  }

  return (
    <Navbar
      expand={false}
      className="bg-white m-0"
      style={{ borderBottom: "0.5px solid #000" }}
    >
      <Container>
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Druid logo"
            width="30"
            height="30"
            className="me-2"
          />
          Druid
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
          className="bg-dark text-light"
        >
          <Offcanvas.Header className="bg-dark text-light">
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10%",
                right: "4rem",
              }}
            ></button>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column justify-content-center">
            <Nav
              className="flex-column text-center text-light mb-3"
              style={{ fontSize: "26px" }}
            >
              {/* this is a dropdown list for service pages including: projects, maintenance and consultation */}
              {/* TODO: style this */}
              <NavLink path="/about-us">About Us</NavLink>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/maintenance">
                  Maintenance
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/consultation">
                  Consultation
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink path="/jobs">Jobs</NavLink>
              <NavLink path="/blog">Blog</NavLink>
              <NavLink path="/contact">Contact</NavLink>
              <NavLink path="#">english | suomi</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
