import { Container, Button, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import live1 from "../../images/live1.jpg";
import live2 from "../../images/live2.png";
import Swal from "sweetalert2";
import axios from "axios";
import "../../stylesheet/slidingimgs.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SlidingImgs() {
  let [disabledButton, setDisabledButton] = useState(false);
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    try {
      await axios({
        method: "get",
        url: "http://localhost:10000" + "/golive",
        headers: { "auth-token": localStorage.getItem("auth-token") },
      }).then((res) => {
        if (!res.data.msg) {
          console.log("hena");
          setDisabledButton(true);
          navigate(`/live`);
        } else {
          Swal.fire(res.data.msg);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlesubmit2 = async (e) => {
    setDisabledButton(true);
    navigate(`/attendlive`);
  };
  return (
    <Carousel>
      <Carousel.Item>
        <img className=" pEdited d-block w-100" src={live1} alt="First slide" />
        <Carousel.Caption>
          <h2>Go Live</h2>
          <p>is a platform that brings you closer to your clients</p>

          <Button
            disabled={disabledButton}
            variant="danger"
            onClick={(e) => handlesubmit(e)}
          >
            GO LIVE
          </Button>
          <Button
            disabled={disabledButton}
            variant="outline-light"
            className="b2"
            onClick={(e) => handlesubmit2(e)}
          >
            JOIN LIVE
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" pEdited d-block w-100"
          src={live2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h2>GO ONLINE NOW</h2>
          <p>and Connect with your users.</p>
          <Button
            variant="light"
            onClick={(e) => handlesubmit(e)}
            disabled={disabledButton}
          >
            GO LIVE
          </Button>
          <Button
            disabled={disabledButton}
            variant="outline-light"
            className="b2"
            onClick={(e) => handlesubmit2(e)}
          >
            JOIN LIVE
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlidingImgs;
