"use client";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function SuccessEdit() {
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
            <h1>
              Your edits have been saved and will be reviewed. Thank you!
            </h1>
            <br />
            <div className="row">
              <Col xs={12} md={4}>
                <Button variant="primary" href="/" size="lg" className="w-100 mb-3">Go to Hompage </Button>
              </Col>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}

