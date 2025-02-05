'use client';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import EditDetailsForm from '../components/editMedicalForm.js';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { isNil } from 'ramda';
import Spinner from 'react-bootstrap/Spinner';
import { Suspense } from 'react';
function Edit() {
  const [person, setPerson] = useState(null);
  const [allMembers, setAllMembers] = useState([]);

  const searchParams = useSearchParams();

  const userid = searchParams.get('id');

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_WEBSITE_URL + `/api/members`)
      .then((response) => {
        console.log('Found members');
        console.log(response.data);
        setAllMembers(response.data);
        axios
          .post(`/api/member`, { id: userid })
          .then((response) => {
            console.log('Found member');
            console.log(response.data);
            setPerson(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className='row'
      style={{
        color: '#48453e',
        background: '#e4ca1470',
        minHeight: '100vh',
      }}
    >
      <div className='col-12 mt-4'>
        <div className='row mt-4 -flex flex-row align-items-center justify-content-center'>
          <Col xs={10} md={6}>
            <Button variant='primary' href='/'>
              Cancel
            </Button>
            <h3 className='mb-3 mt-3'>Edit Family Member Details </h3>
            {isNil(person) && (
              <p>
                <Spinner animation='border' variant='primary' />
                <br />
                Please wait...
              </p>
            )}
            {!isNil(person) && (
              <EditDetailsForm person={person} members={allMembers} />
            )}
          </Col>
        </div>
      </div>
    </div>
  );
}

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Edit />
    </Suspense>
  );
};
