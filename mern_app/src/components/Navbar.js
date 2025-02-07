import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";

export default function ResponsiveNavbar() {
  const [cartView, setCartView] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setShowMenu(false);
  };

  return (
    <>
      {/* ✅ Bootstrap Responsive Navbar */}
      <Navbar expand="lg" bg="success" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-1 fst-italic">
            <b>FoodSpot</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowMenu(true)} />
          <Navbar.Collapse id="navbarNav" className="justify-content-end d-none d-lg-flex">
            <Nav>
              <Nav.Link as={Link} to="/" className="fs-5">Home</Nav.Link>

              {localStorage.getItem("authToken") && (
                <Nav.Link as={Link} to="/orders" className="fs-5">My Orders</Nav.Link>
              )}

              {!localStorage.getItem("authToken") ? (
                <>
                  <Button as={Link} to="/login" variant="dark" className="text-success mx-2">
                    Login
                  </Button>
                  <Button as={Link} to="/createuser" variant="dark" className="text-success mx-2">
                    SignUp
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="dark" className="text-success mx-2" onClick={() => setCartView(true)}>
                    My Cart <Badge pill bg="danger">2</Badge>
                  </Button>
                  {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                  <Button variant="dark" className="text-danger mx-2" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Offcanvas Mobile Sidebar Menu */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start" style={{ backgroundColor: "#1a1a2e", color: "white" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b>Menu</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="fs-5" onClick={() => setShowMenu(false)}>Home</Nav.Link>

            {localStorage.getItem("authToken") && (
              <Nav.Link as={Link} to="/orders" className="fs-5" onClick={() => setShowMenu(false)}>My Orders</Nav.Link>
            )}

            {!localStorage.getItem("authToken") ? (
              <>
                <Button as={Link} to="/login" variant="dark" className="text-success my-2 w-100" onClick={() => setShowMenu(false)}>
                  Login
                </Button>
                <Button as={Link} to="/createuser" variant="dark" className="text-success my-2 w-100" onClick={() => setShowMenu(false)}>
                  SignUp
                </Button>
              </>
            ) : (
              <>
                <Button variant="dark" className="text-success my-2 w-100" onClick={() => { setCartView(true); setShowMenu(false); }}>
                  My Cart <Badge pill bg="danger">2</Badge>
                </Button>
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                <Button variant="dark" className="text-danger my-2 w-100" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
