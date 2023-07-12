"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import provincesJson from "./data/provinces.json";
import DetailsForm from "./components/detailsForm.js";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const sendStatsMessage = () => {
    axios
      .post("/api/stats", {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="row mb-4"
      style={{
        color: "#48453e",
        background: "#e4ca1470",
        minHeight: "100vh",
      }}
    >
      <div className="col-12 mb-4">
        <div
          className="row mt-3 -flex flex-row align-items-center justify-content-center"
          style={{
            height: "100%",
          }}
        >
          <Col xs={10} md={6}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Image src="swallow.svg" width={100} height={100} responsive />
              <h1>Qwabi Family</h1>
              <p>Sizukulwana sika Sonyethe</p>
            </div>
            <br />
            <br />
            <p>
              The aim of this website is to collect information about the
              members of the Qwabi family. You can click on the add button below
              to provide details about yourself, parent or child. You can also
              click on the edit button to edit the details of a family member
              that currently exists in our database. If the family member does
              not exist in our database, you can add them by clicking on the add
              button.
            </p>
            <br />
            <div className="row mt-4 mb-4">
              <Col md={3} xs={12}>
                <Button
                  variant="primary"
                  href="/add"
                  size="lg"
                  className="w-100 mb-3"
                >
                  Add
                </Button>
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="primary"
                  href="/search"
                  size="lg"
                  className="w-100 mb-3"
                >
                  Search{" "}
                </Button>
              </Col>
              <Col md={3} xs={12}>
                <Button
                  variant="primary"
                  href="/search"
                  size="lg"
                  className="w-100 mb-3"
                >
                  Edit
                </Button>
              </Col>
              <Col md={3} xs={12}>
                <Button
                  variant="primary"
                  href="/list"
                  size="lg"
                  className="w-100 mb-3"
                >
                  List
                </Button>
              </Col>
              <br />
              <br />
              <br />
              <h5 className="mt-4">More things you can do on this website</h5>
              <ul>
                <li>
                  <a href="/deceased">Provide deceased person details</a>
                </li>
                <br />
                <li>
                  <a href="/medical-info">Provide medical information</a>
                </li>
                <br />
                <li>
                  <a href="/education-info">
                    Provide Education and Occupational information
                  </a>
                </li>
                <br />
                <li>
                  <a href="#" onClick={sendStatsMessage}>
                    Send Stats to Family Whatsapp Group
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}

/*
<Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>*/
