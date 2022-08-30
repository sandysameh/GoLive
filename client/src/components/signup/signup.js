import { Button, Form, Card, Container, Row, Col } from "react-bootstrap/";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../../images/img1.png";
import { LoginContext } from "../../context/LoginContext";

function SignupCard() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [loggedinContext, setLoggedinContext] = useContext(LoginContext);

  const signUpUser = async (e) => {
    //Event is gonna be triggered and send it from front end to backend
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:10000" + "/signup",
        data: {
          name: name,
          email: email,
          password: password,
        },
      }).then((res) => {
        if (!res.data.msg) {
          localStorage.setItem("auth-token", res.data.token);
          console.log(res.data.token);
          setLoggedinContext(true);
          navigate(`/homepage`);
        } else {
          Swal.fire(res.data.msg);
        }
      });
    } catch (e) {
      console.log(e);
      Swal.fire(e);
    }
  };
  return (
    <Container>
      <Row style={{ marginTop: "15vh" }}>
        <Col sm={12} md={5}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="Name"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={(e) => signUpUser(e)}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={{ span: 4, offset: 2 }}>
          <img src={image1} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignupCard;
