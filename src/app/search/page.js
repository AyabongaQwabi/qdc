"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Fragment, useState } from "react";
import { isNil, isEmpty } from "ramda";
import Spinner from "react-bootstrap/Spinner";
const serverUrl = "http://localhost:3000";
import Link from "next/link";

const exists = i => !isEmpty(i) && !isNil(i);
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/search", {member: searchTerm})
      .then((res) => {
        console.log("SUCCESS");
        console.log(res);
        console.log(res.data);
        setSearchResults(res.data);
        setLoading(false);

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
        "height": "100vh",
      }}
    >
      <div className="col-12 mt-4">
        <div className="row mt-4 -flex flex-row align-items-center justify-content-center">
          <Col xs={10} md={6}>
            <Button variant="light" href="/" size="sm">
              Go to homepage
            </Button>
            <h3 className="mb-3 mt-3">Search for a Family Member</h3>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
            <Button variant="primary" onClick={search}>
              Search
            </Button>
            <br />
            {loading && <Spinner animation="border" variant="primary" />}
            {isEmpty(searchResults) && !loading && (
              <div className="mt-3 text-muted">No results found</div>
            )}
            {exists(searchResults) && (
              <Fragment>
                <br />
                <h5>Results</h5>
                <div className="card p-2">
                <Table   hover size="sm">
                  <thead>
                    <tr>
                      <th><small>Name</small></th>
                      <th><small>Date of Birth</small></th>
                      <th><small>Actions</small></th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults?.map((result) => {
                      return (
                        <tr>
                          <td><small>{result.title} {result.firstName} {result.surname}</small></td>
                          <td><small>{result.dateOfBirth.dateStr}</small></td>
                          <td>
                          <Link href={{ pathname: '/edit', query: { id: result._id }}}>
                            <Button
                              variant="primary"
                              size="sm"
                            >
                              Edit
                            </Button>
                          </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                </div>
              </Fragment>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
}
