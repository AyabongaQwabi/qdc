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

const DetailsForm = ({ members }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    title: "Mr",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "male",
    dateOfBirth: {
      day: 1,
      month: 1,
      year: 1920,
    },
    parent: null,
    province: "Eastern Cape",
    id: "",
    cellphoneNumber: "",
    currentStatus: "deceased",
    email: "",
    address: {
      street: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
    },
  });

  const save = R.curry((path, event) => {
    const value = event.target.value;
    setDetails(R.assocPath(path, value, details));
  });

  const format = (num) => String(num).padStart(2, "0");
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const dateStr = `${format(details.dateOfBirth.day)}/${format(
      details.dateOfBirth.month
    )}/${details.dateOfBirth.year}`;
    const newDetails = {
      ...details,
      dateOfBirth: {
        day: format(details.dateOfBirth.day),
        month: format(details.dateOfBirth.month),
        year: details.dateOfBirth.year,
        dateStr,
      },
      createdAt: moment().format("DD/MM/YYYY"),
    };

    console.log("submiting", newDetails);
    axios
      .post("/api/add", newDetails)
      .then((res) => {
        console.log("SUCCESS");
        console.log(res);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    router.push("/success");
  };

  console.log(details);
  return (
    <Form>
      <strong>Enter the details of a family member</strong>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Select
          value={details.title}
          aria-label="Select title"
          onChange={save(["title"])}
        >
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Ms">Ms</option>
          <option value="Dr">Dr</option>
          <option value="Prof">Prof</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={details.firstName}
          onChange={save(["firstName"])}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Second Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter second name"
          value={details.secondName}
          onChange={save(["secondName"])}
        />
        <Form.Text className="text-muted">
          Leave blank if it's not available
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter surname"
          value={details.surname}
          onChange={save(["surname"])}
        />
        <Form.Text className="text-muted">
          Our Earliest ancestor is Sonyethe who gave birth to Nqumama, who gave birth Qwabi and
          Gudu, so it's okay if your surname is not Qwabi as long as you come
          from the family tree.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          value={details.gender}
          aria-label="Select gender"
          onChange={save(["gender"])}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Date of Birth</strong>
        </Form.Label>
        <div className="row">
          <Col xs={4} md={2}>
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="number"
              placeholder="Day"
              value={details.dateOfBirth.day}
              onChange={save(["dateOfBirth", "day"])}
            />
          </Col>
          <Col xs={4} md={2}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="number"
              placeholder="Month"
              value={details.dateOfBirth.month}
              onChange={save(["dateOfBirth", "month"])}
            />
          </Col>
          <Col xs={4} md={8}>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Year"
              value={details.dateOfBirth.year}
              onChange={save(["dateOfBirth", "year"])}
            />
          </Col>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Parent</Form.Label>
        <Form.Select
          value={details.parent}
          aria-label="Select parent"
          onChange={save(["parent"])}
        >
          <option value="_not_selected_">Select person</option>
          <option value="_unavailable_">Not in list</option>
          {members.map((member) => {
            const memberAge = moment().diff(
              member.dateOfBirth.dateStr,
              "years"
            );
            return (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.surname},{" "}
                {member.isAlive === "true" ? memberAge : "RIP"},{" "}
                {member.address.city}{" "}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ID Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ID"
          value={details.id}
          onChange={save(["id"])}
        />
        <Form.Text className="text-muted">
          This info will be securely stored and used only for organizing our family website
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <strong>Address</strong>
        </Form.Label>
        <Col>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 1041 Pika drive"
            value={details.address.street}
            onChange={save(["address", "street"])}
          />
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Ezibeleni"
            value={details.address.suburb}
            onChange={save(["address", "suburb"])}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Queenstown"
            value={details.address.city}
            onChange={save(["address", "city"])}
          />
          <Form.Label>Province</Form.Label>
          <Form.Select
            aria-label="Select provice"
            value={details.address.province}
            onChange={save(["address", "province"])}
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
            onChange={save(["address", "postalCode"])}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Is this person still alive?</Form.Label>
        <Form.Check
          type="radio"
          label="Yes"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          value={true}
          onChange={save(["isAlive"])}
        />
        <Form.Check
          type="radio"
          label="No"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          value={false}
          onChange={save(["isAlive"])}
        />
      </Form.Group>
      {details.isAlive === "true" && (
        <Fragment>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Cellphone Number</Form.Label>
            <Form.Control
              type="text"
              value={details.cellphoneNumber}
              placeholder="Enter cellphone number"
              onChange={save(["cellphoneNumber"])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={details.email}
              onChange={save(["email"])}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>Education & Employment</strong>
            </Form.Label>
            <br />
            <Form.Text className="text-muted mb-3">
              Please select the option that best describes this person's
              education and employment status
            </Form.Text>
            <Form.Check
              className="mt-3"
              type="radio"
              id="university-radio"
              label="This person is in university or college"
              value="university"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "university"}
            />
            <Form.Check
              type="radio"
              id="employed-radio"
              label="This person is employed"
              value="employed"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "employed"}
            />
            <Form.Check
              type="radio"
              id="business-radio"
              label="This person is a business owner"
              value="business"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "business"}
            />
            <Form.Check
              type="radio"
              id="employed-radio"
              label="This person is unemployed"
              value="unemployed"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "unemployed"}
            />
            <Form.Check
              type="radio"
              id="unemployed-radio"
              label="This person is retired"
              value="retired"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "retired"}
            />
            <Form.Check
              type="radio"
              id="scholar-radio"
              label="This person is still in school"
              value="scholar"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "scholar"}
            />
            <Form.Check
              type="radio"
              id="pensioner-radio"
              label="This person is a pensioner"
              value="pensioner"
              onChange={save(["currentStatus"])}
              checked={details.currentStatus === "pensioner"}
            />
          </Form.Group>
        </Fragment>
      )}

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

export default DetailsForm;
