"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import provincesJson from "./data/provinces.json";
import DetailsForm from "./components/detailsForm.js";
import axios from "axios";

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
      className="row"
      style={{
        color: "#48453e",
        background: "#e4ca1470",
        height: "100vh",
      }}
    >
      <div className="col-12">
        <div
          className="row mt-3 -flex flex-row align-items-center justify-content-center"
          style={{
            height: "100%",
          }}
        >
          <Col xs={10} md={6}>
            <h1>Qwabi Family</h1>
            <h5>
              Hello, my name is Ayabonga Qwabi, son of Tamara Qwabi, Grandson of
              Bhangile Qwabi.
            </h5>
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
            <div className="row">
              <Col md={4} xs={12}>
                <Button variant="primary" href="/add" size="lg" className="w-100 mb-3">
                  Add
                </Button>
              </Col>
              <Col xs={12} md={4}>
                <Button variant="primary" href="/search" size="lg" className="w-100 mb-3">Search </Button>
              </Col>
              <Col md={4} xs={12}>
                <Button variant="primary" href="/search" size="lg" className="w-100 mb-3">
                  Edit
                </Button>
              </Col>
              <Col md={4} xs={12}>
                <Button variant="primary" href="/list" size="lg" className="w-100 mb-3">
                  List
                </Button>
              </Col>
              <br />
              <br />
              <br />
              <a href="#" onClick={sendStatsMessage}>Send Stats to Family Whatsapp Group</a>
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
