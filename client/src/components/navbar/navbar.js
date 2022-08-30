import Container from "react-bootstrap/Container";
import React, { useEffect, useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

import "../../stylesheet/navbar.css";
function MyNavbar() {
  let navigate = useNavigate();
  const [loggedinContext, setLoggedinContext] = useContext(LoginContext);

  const handlelogout = async (e) => {
    //setShowrreset(!showreset);
    // Swal.fire(passwordcheck)

    Swal.fire({
      title: "LOG OUT?",
      text: "Are You SURE !?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Log Out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios({
            method: "get",
            url: "http://localhost:10000" + "/logout",
            headers: { "auth-token": localStorage.getItem("auth-token") },
            data: {},
          }).then((res) => {
            // console.log(res.data)

            if (res.status === 400) {
              Swal.fire(res.data.msg);
            }

            if (!res.data.msg) {
              localStorage.clear();
              navigate(`/login`);
              setLoggedinContext(false);
              //  window.location.reload('/')
              //window.location.replace('/')

              //   window.location.reload();
            } else {
              Swal.fire(res.data.msg);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    });

    // make API call
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <div>
            <div className="live-indicator">
              <div className="red-dot"></div>
              <div className="pulse one"></div>
              <div className="pulse two"></div>
            </div>

            <div>Live</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {loggedinContext ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/homepage">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/history">
                History
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={(e) => handlelogout(e)}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
