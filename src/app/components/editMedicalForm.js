import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import * as R from "ramda";
import axios from "axios";
import moment from "moment";
import illnesses from "../data/illnesses.json";

const EditMedicalDetailsForm = ({ person }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(
    R.assoc(
      "illnessDetails",
      {
        dateFirstDiagnosed: {
          day: 1,
          month: 1,
          year: 2000,
        },
        illness: "",
      },
      person
    )
  );

  const save = R.curry((path, event) => {
    const value = event.target.value;
    setDetails(R.assocPath(path, value, details));
  });

  const format = (num) => String(num).padStart(2, "0");
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const dateOfDiagnosis = `${format(
      details?.illnessDetails?.dateOfDiagnosis.day
    )}/${format(details?.illnessDetails?.dateOfDiagnosis.month)}/${
      details?.illnessDetails?.dateOfDiagnosis.year
    }`;

    const newDetails = {
      ...R.omit(["_id"], details),
      entity: details?._id,
      illnessDetails: {
        ...details?.illnessDetails,
        dateOfDiagnosis,
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
      <p className="mt-3 mb-3">
        Providing medical details for <strong>{details?.firstName} {details?.surname}</strong>
      </p>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Group className="mb-3" controlId="medicalCondition">
          <Form.Label>
            <strong>Medical condition</strong>
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={save(["illnessDetails", "illness"])}
          >
            <option>Select Illness</option>
            {illnesses.map((illness) => (
              <option value={illness}>{illness}</option>
            ))}
          </Form.Select>
        </Form.Group>

       {details?.illnessDetails?.illness === "Other" && (
          <Form.Group className="mb-3" controlId="medicalCondition">
            <Form.Label>
              <strong>Please specify the medical condition</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter condition name"
              value={details?.illnessDetails?.otherIllness}
              onChange={save(["illnessDetails", "otherIllness"])}
            />
          </Form.Group>
        )}

        <Form.Label>
          <strong>Date of Diagnosis</strong>
        </Form.Label>
        <br/>
        <Form.Text className="text-muted">
          When were did you find out about your medical condition?
        </Form.Text>
        <div className="row mt-3">
          <Col xs={4} md={2}>
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="number"
              placeholder="Day"
              value={details?.illnessDetails?.dateOfDiagnosis?.day}
              onChange={save(["dateOfDiagnosis", "day"])}
            />
          </Col>
          <Col xs={4} md={2}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="number"
              placeholder="Month"
              value={details?.illnessDetails?.dateOfDiagnosis?.month}
              onChange={save(["dateOfDiagnosis", "month"])}
            />
          </Col>
          <Col xs={4} md={8}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              value={details?.illnessDetails?.dateOfDiagnosis?.year}
              onChange={save(["dateOfDiagnosis", "year"])}
            />
          </Col>
        </div>
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

export default EditMedicalDetailsForm;
