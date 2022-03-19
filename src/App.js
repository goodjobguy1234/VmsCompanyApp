import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { useLocalStorage } from "react-use";
import Quotation from "./components/Quotation";
import ProductManagement from "./components/ProductManagement";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Login } from "./components/Login";
import QuotationManagement from "./components/QuotationManagement";
import style from "./mystyle.module.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser)
      console.log(loggedInUser)
    }
  }, [])

  const handleLogin = (data) => {
    console.log("handleLogin", data);
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert("Error:" + data.error);
        } else {
          window.alert("Welcome " + data.name);
          console.log(data);
          setUser(data.name);
          localStorage.setItem('user', data.name);
        }
      });
  };

  const handleLogout = () => {
    setUser();
    localStorage.clear();
  }

  return (
    <Router>
      { user &&
        <Navbar className={style.colornav} variant="light">
        <Container>
          <Navbar.Brand href="#home">VMS Company</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/quotation">
              Quotation
            </Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <Nav.Link href="/product-management">
              Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      }

      <Routes>
        <Route
          path="/product-management"
          element={<ProductManagement />}
        />

        <Route path="/quotation-build" element={<Quotation />} />
        <Route path="/quotation" element={<QuotationManagement/>}/>
        <Route
          path="/"
          element={
            <Container>
              {user ? (
                <>
                <div>
                  <h1>
                  Welcome {user}
                  </h1>
                </div>
                <div>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
                </>
              
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
