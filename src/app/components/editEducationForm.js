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
import credetials from "../data/credentials.json";
import fields from "../data/fields.json";
import institutions from "../data/institutions.json";
import occupations from "../data/occupations.json";
import provincesJson from "../data/provinces.json";

const higherEducationLevels = ["certificate", "diploma", "bachelors", "honours", "masters", "doctorate"]

const EditEducationDetailsForm = ({ person }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(
    R.assoc(
      "educationDetails",
      {
        qualifications: [],
        occupation: "",
        employerStartDate: moment().format("YYYY/MM/DD"),
        employerAddress: "",
        employerName: "",
        employerContactNumber: "",
        employerEmail: "",
        highestLevel: "",
        fieldOfStudy: "",
        institution: "",
        yearObtained: "",
        credentials: [],
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

    const employerStartDate =  moment(details?.educationDetails?.employerStartDate).format("DD/MM/YYYY");
    const newDetails = {
      ...R.omit(["_id"], details),
      entity: details?._id,
      educationDetails: {
        ...details?.educationDetails,
        employerStartDate,
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
        Providing education and occupation details for{" "}
        <strong>
          {details?.firstName} {details?.surname}
        </strong>
      </p>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Group className="mb-3" controlId="medicalCondition">
          <h5>
            <strong>Highest Education Level</strong>
          </h5>
          <Form.Select
            aria-label="Default select example"
            onChange={save(["educationDetails", "highestLevel"])}
            value={details.educationDetails.highestLevel}
          >
            <option>Select level</option>
            <option value="grade-1">Grade 1</option>
            <option value="grade-2">Grade 2</option>
            <option value="grade-3">Grade 3</option>
            <option value="grade-4">Grade 4</option>
            <option value="grade-5">Grade 5</option>
            <option value="grade-6">Grade 6</option>
            <option value="grade-7">Grade 7</option>
            <option value="grade-8">Grade 8</option>
            <option value="grade-9">Grade 9</option>
            <option value="grade-10">Grade 10</option>
            <option value="grade-11">Grade 11</option>
            <option value="grade-12">Grade 12</option>
            <option value="matric">Matric</option>
            <option value="certificate">Certificate</option>
            <option value="diploma">Diploma</option>
            <option value="bachelors">Bachelors</option>
            <option value="honours">Honours</option>
            <option value="masters">Masters</option>
            <option value="doctorate">Doctorate</option>
          </Form.Select>
        </Form.Group>
      </Form.Group>
      
      
      {higherEducationLevels.includes(details.educationDetails.highestLevel) && (
        <Form.Group className="mt-4 mb-4">
          <br />
        <h5>
          <strong>Qualification</strong>
        </h5>
        <Form.Group className="mb-3" controlId="credential">
          <Form.Label>
            Credential
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={save(["educationDetails", "qualifications", 0, "credential"])}
            value={details.educationDetails.qualifications[0]?.credential}
          >
            <option>Select credential</option>
            {credetials.map((credential) => (
              <option value={credential}>{credential}</option>
            ))}
          </Form.Select>
          {details.educationDetails.qualifications[0]?.credential === "Other" && (
            <Form.Control
              type="text"
              placeholder="Please specify"
              value={details.educationDetails.qualifications[0]?.otherCredential}
              onChange={save([
                "educationDetails",
                "qualifications",
                0,
                "otherCredential",
              ])}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="field">
          <Form.Label>
            Field
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={save(["educationDetails", "qualifications", 0, "field"])}
            value={details.educationDetails.qualifications[0]?.field}
          >
            <option>Select field</option>
            {fields.map((field) => (
              <option value={field}>{field}</option>
            ))}
          </Form.Select>
          {details.educationDetails.qualifications[0]?.field === "Other" && (
            <Form.Control
              type="text"
              placeholder="Please specify"
              value={details.educationDetails.qualifications[0]?.otherField}
              onChange={save([
                "educationDetails",
                "qualifications",
                0,
                "otherField",
              ])}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="institution">
          <Form.Label>
            Institution
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={details.educationDetails.qualifications[0]?.institution}
            onChange={save(["educationDetails", "qualifications", 0, "institution"])}
          >
            <option>Select institution</option>
            {institutions.map((institution) => (
              <option value={institution}>{institution}</option>
            ))}
          </Form.Select>
          {details.educationDetails.qualifications[0]?.institution ===
            "Other" && (
            <Form.Control
              type="text"
              value={details.educationDetails.qualifications[0]?.otherInstitution}
              placeholder="Please specify"
              onChange={save([
                "educationDetails",
                "qualifications",
                0,
                "otherInstitution",
              ])}
            />
          )}
        </Form.Group>
    
      <Form.Group className="mb-3" controlId="year">
        <Form.Label>
          Year
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Please specify"
          value={details.educationDetails.qualifications[0]?.year}
          onChange={save([
            "educationDetails",
            "qualifications",
            0,
            "year",
          ])}
        />
      </Form.Group>
      </Form.Group>)}
      <br />
      <Form.Group className="mt-4 mb-4" controlId="Occupation">
        <h5>  
          <strong>Ocuppation</strong>
        </h5>
        <Form.Select
          aria-label="Default select example"
          onChange={save(["educationDetails", "occupation"])}
          value={details.educationDetails.occupation}
        >
          <option>Select occupation</option>
          {occupations.map((occupation) => (
            <option value={occupation}>{occupation}</option>
          ))}
        </Form.Select>
        {details.educationDetails.occupation === "Other" && (
          <Form.Control
            type="text"
            placeholder="Please specify"
            onChange={save(["educationDetails", "otherOccupation"])}
          />
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Employer</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={details.educationDetails.employer}
          placeholder="Enter employer name"
          onChange={save(["educationDetails", "employer"])}
        />
      </Form.Group>
      <br />
      <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
        <Form.Label>
          <strong>Employer Address</strong>
        </Form.Label>
        <Col>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 1041 Pika drive"
            value={details.employerAddress?.street}
            onChange={save(["employerAddress", "street"])}
          />
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Ezibeleni"
            value={details.employerAddress?.suburb}
            onChange={save(["employerAddress","suburb"])}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Queenstown"
            value={details.employerAddress?.city}
            onChange={save(["employerAddress", "city"])}
          />
          <Form.Label>Province</Form.Label>
          <Form.Select
            aria-label="Select provice"
            value={details.employerAddress?.province}
            onChange={save(["employerAddress", "province"])}
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
            value={details.employerAddress?.postalCode}
            onChange={save(["employerAddress","postalCode"])}
          />
        </Col>
      </Form.Group>
      <br />
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Employer Contact Number</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter employer's cellphone number"
          onChange={save(["educationDetails", "employerContactNumber"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Employer Email</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          onChange={save(["educationDetails", "employerEmail"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Employer Website</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g www.example.com"
          value={details.educationDetails.employerWebsite}
          onChange={save(["educationDetails", "employerWebsite"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Position at work</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g Supervisor"
          onChange={save(["educationDetails", "employerPosition"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>When did you start working for this employer?</strong>
        </Form.Label>
        <Form.Control
          type="date"
          value={moment(details.educationDetails.employerStartDate).format("YYYY-MM-DD")}
          placeholder="Enter start date"
          onChange={save(["educationDetails", "employerStartDate"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Employer">
        <Form.Label>
          <strong>Notes about Employer</strong>
        </Form.Label>
        <Form.Control
          as="textarea" rows={3} 
          placeholder="What should other family members know about this employer?"
          onChange={save(["educationDetails", "employerNotes"])}
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

export default EditEducationDetailsForm;
