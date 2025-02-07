import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            <b>FoodSpot</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {/* ✅ Move Login, Signup, Cart, and Logout buttons inside the collapsible div */}
            <div className="d-flex flex-column flex-lg-row align-items-lg-center">
              {!localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link className="btn bg-black text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-black text-success mx-1" to="/createuser">
                    SignUp
                  </Link>
                </div>
              ) : (
                <div className="d-flex">
                  <button
                    className="btn bg-black text-success mx-2"
                    onClick={() => setCartView(true)}
                  >
                    My Cart{" "}
                    <Badge pill bg="danger">
                      2
                    </Badge>
                  </button>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                  
                  <button className="btn bg-black text-danger mx-2" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}
