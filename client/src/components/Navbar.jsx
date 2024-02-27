import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/icons-material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Modal from "../Modal";
import Cart from "./screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  localStorage.setItem("temp", "first");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navigate = useNavigate();
  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();

  return (
    <>
      <nav
        className='navbar navbar-expand-lg navbar-dark bg-success position-sticky'
        style={{
          background: "linear-gradient(to right, #8705e5, #5980e9)",
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className='container-fluid'>
          <Link className='navbar-brand fs-1 fst-italic' to='/'>
            GoFood
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link fs-5 mx-3 active'
                  aria-current='page'
                  to='/home'
                >
                  Home
                </Link>{" "}
                {/* index.css - nav-link color white */}
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link fs-5 mx-3 active'
                  aria-current='page'
                  to='/contactus'
                >
                  Contact us
                </Link>{" "}
                {/* index.css - nav-link color white */}
              </li>
              {localStorage.getItem("token") ? (
                <li className='nav-item'>
                  <Link
                    className='nav-link fs-5 mx-1 active'
                    aria-current='page'
                    to='/myorder'
                  >
                    My Orders
                  </Link>{" "}
                  {/* index.css - nav-link color white */}
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link className='btn bg-white text-success mx-1 ' to='/login'>
                  Login
                </Link>

                <Link className='btn bg-white text-success mx-1' to='/signup'>
                  Signup
                </Link>
              </>
            ) : (
              <div>
                <div
                  className='btn bg-white text-success mx-2 '
                  onClick={loadCart}
                >
                  <Badge color='secondary' badgecontent={items.length}>
                    <AddShoppingCartIcon fontSize='small' />
                  </Badge>{" "}
                  Cart
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}

                <button
                  onClick={handleLogout}
                  className='btn bg-white text-success'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
