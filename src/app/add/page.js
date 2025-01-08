'use client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import provincesJson from '../data/provinces.json';
import DetailsForm from '../components/detailsForm.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [allMembers, setAllMembers] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_WEBSITE_URL + '/api/members', {})
      .then((response) => {
        console.log('Found members');
        console.log(response.data);
        setAllMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(allMembers);

  return (
    <div
      className='row'
      style={{
        color: '#48453e',
        background: '#e4ca1470',
      }}
    >
      <div className='col-12 mt-4'>
        <div className='row mt-4 -flex flex-row align-items-center justify-content-center'>
          <Col xs={10} md={6}>
            <Button variant='primary' href='/'>
              Cancel
            </Button>
            <h3 className='mb-3 mt-3'>Add Family Member Details </h3>
            <DetailsForm members={allMembers} />
          </Col>
        </div>
      </div>
    </div>
  );
}
