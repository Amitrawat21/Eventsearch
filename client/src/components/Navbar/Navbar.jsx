import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTicketAlt } from "react-icons/fa";
import { logoutRequest } from "../../store/authActions";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <FaTicketAlt /> EventHub
          </Link>

          <div className="navbar-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Events
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                >
                  Dashboard
                </NavLink>

                <button onClick={handleLogout} className="navbar-btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "navbar-btn-signup active-btn"
                      : "navbar-btn-signup"
                  }
                >
                  Sign Up
                </NavLink>

                <NavLink
                  to="/foot"
                  className={({ isActive }) =>
                    isActive
                      ? "navbar-btn-signup active-btn"
                      : "navbar-btn-signup"
                  }
                >
                  footer
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
