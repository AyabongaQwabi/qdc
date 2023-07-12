import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/navigation";
import provincesJson from "../data/provinces.json";
import { Fragment, useState } from "react";
import * as R from "ramda";
import axios from "axios";
import moment from "moment";
import illnesses from "../data/illnesses.json";

const EditDetailsForm = ({ members, person }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(R.assoc("deathDetails", {
    placeOfDeath:{
        street: "",
        suburb:"",
        city: "",
        province: "",
        postalCode:""
    },
    dateOfDeath:{
        day: 1,
        month: 1,
        year:2000
    },
    dateOfFuneral:{
        day: 1,
        month: 1,
        year:2000
    },
    graveAddress: {
        cemeteryName: "",
        street: "",
        suburb:"",
        city: "",
        province: "",
        postalCode:""
    },
    diedByAccident: "true",
    cuaseOfDeath: "",
    deathId:"",
  },person));

  const save = R.curry((path, event) => {
    const value = event.target.value;
    setDetails(R.assocPath(path, value, details));
  });

  const format = (num) => String(num).padStart(2, "0");
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const dateOfDeath = `${format(
      details?.deathDetails?.dateOfDeath.day
    )}/${format(details?.deathdetails?.dateOfDeath.month)}/${
      details?.deathdetails?.dateOfDeath.year
    }`;

    const newDetails = {
      ...R.omit(["_id"], details),
      entity: details?._id,
      deathDetails: {
        ...details?.deathDetails,
        dateOfDeath,
      },
      lastModified: moment().format("DD/MM/YYYY"),
    };

    console.log("submiting", newDetails);
    axios
      .post("/api/revisions/add", newDetails)
      .then((res) => {
        console.log("SUCCESS");
        console.log(res);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    router.push("/success-edit");
  };

  console.log("form details", details);
  return (
    <Form>
      <p className="mt-3 mb3">
        Providing death details for <strong>{details?.firstName} {details?.surname}</strong>
      </p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Date of Death</strong>
        </Form.Label>
        <div className="row">
          <Col xs={4} md={2}>
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="number"
              placeholder="Day"
              value={details?.deathDeatsils?.dateOfDeath?.day}
              onChange={save(["dateOfDeath", "day"])}
            />
          </Col>
          <Col xs={4} md={2}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="number"
              placeholder="Month"
              value={details?.deathdetails?.dateOfDeath?.month}
              onChange={save(["dateOfDeath", "month"])}
            />
          </Col>
          <Col xs={4} md={8}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              value={details?.deathdetails?.dateOfDeath?.year}
              onChange={save(["dateOfDeath", "year"])}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Date of Funeral</strong>
        </Form.Label>
        <div className="row">
          <Col xs={4} md={2}>
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="number"
              placeholder="Day"
              value={details?.deathDetails?.dateOfFuneral?.day}
              onChange={save(["dateOfFuneral", "day"])}
            />
          </Col>
          <Col xs={4} md={2}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="number"
              placeholder="Month"
              value={details?.deathdetails?.dateOfFuneral?.month}
              onChange={save(["dateOfFuneral", "month"])}
            />
          </Col>
          <Col xs={4} md={8}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              value={details?.deathdetails?.dateOfFuneral?.year}
              onChange={save(["dateOfFuneral", "year"])}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Place of Death</strong>
        </Form.Label>
        <Col>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 1041 Pika drive"
            value={details?.deathDetails?.placeOfDeath?.street}
            onChange={save(["deathDeatails", "placeOfDeath", "street"])}
          />
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Ezibeleni"
            value={details?.deathDetails?.placeOfDeath?.suburb}
            onChange={save(["deathDeatails", "placeOfDeath", "suburb"])}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Queenstown"
            value={details?.deathDetails?.placeOfDeath?.city}
            onChange={save(["deathDeatails", "placeOfDeath", "city"])}
          />
          <Form.Label>Province</Form.Label>
          <Form.Select
            aria-label="Select provice"
            value={details?.deathDetails?.placeOfDeath?.province}
            onChange={save(["deathDeatails", "placeOfDeath", "province"])}
          >
            <option>Select Province</option>
            {provincesJson.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 5326"
            value={details?.deathDetails?.placeOfDeath?.postalCode}
            onChange={save(["deathDeatails", "placeOfDeath", "postalCode"])}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Grave Address</strong>
        </Form.Label>
        <Col>
          <Form.Label>Cemetery Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 1041 Pika drive"
            value={details?.deathDetails?.graveAddress?.cemetery}
            onChange={save(["deathDeatails", "graveAddress", "cemetery"])}
          />
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 1041 Pika drive"
            value={details?.deathDetails?.graveAddress?.street}
            onChange={save(["deathDeatails", "graveAddress", "street"])}
          />
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Ezibeleni"
            value={details?.deathDetails?.graveAddress?.suburb}
            onChange={save(["deathDeatails", "graveAddress", "suburb"])}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Queenstown"
            value={details?.deathDetails?.graveAddress?.city}
            onChange={save(["deathDeatails", "graveAddress", "city"])}
          />
          <Form.Label>Province</Form.Label>
          <Form.Select
            aria-label="Select provice"
            value={details?.deathDetails?.graveAddress?.province}
            onChange={save(["deathDeatails", "graveAddress", "province"])}
          >
            <option>Select Province</option>
            {provincesJson.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 5326"
            value={details?.deathDetails?.graveAddress?.postalCode}
            onChange={save(["deathDeatails", "graveAddress", "postalCode"])}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Did this person die from accident?</Form.Label>
        <Form.Check
          type="radio"
          label="Yes"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          value={true}
          checked={details?.deathdetails?.diedByAccident === "true"}
          onChange={save(["deathDetails", "diedByAccident"])}
        />
        <Form.Check
          type="radio"
          label="No"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          value={false}
          checked={details?.deathdetails?.diedByAccident === "false"}
          onChange={save(["deathDetails", "diedByAccident"])}
        />
      </Form.Group>
      {details?.deathDetails?.diedByAccident === "false" && (
        <Form.Group className="mb-3" controlId="medicalCondition">
          <Form.Label>
            <strong>Cause of Death</strong>
          </Form.Label>
          <br />
          <Form.Text className="text-muted mb-3">
            Medical condition that caused death
          </Form.Text>
          <Form.Select
          className="mt-3"
            aria-label="Default select example"
            value={details?.deathDetails?.causeOfDeath}
            onChange={save(["deathDetails", "causeOfDeath"])}
          >
            <option>Select Illness</option>
            {illnesses.map((illness) => (
              <option value={illness}>{illness}</option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
      {details?.deathDetails?.causeOfDeath === "Other" && (
          <Form.Group className="mb-3" controlId="medicalCondition">
            <Form.Label>
              Please specify the medical condition
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter condition name"
              value={details?.deathDetails?.otherCauseOfDeath}
              onChange={save(["deathDetails", "otherCauseOfDeath"])}
            />
          </Form.Group>
        )}
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label>Death certificate id number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter death id"
          value={details?.deathId}
          onChange={save(["deathId"])}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="mt-4 mb-4"
        onClick={submit}
      >
        Submit
      </Button>
      <br />
      {loading && <Spinner animation="border" variant="primary" />}
    </Form>
  );
};

export default EditDetailsForm;
