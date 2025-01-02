import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';

export default function ActionButtons() {
  const actions = [
    { name: 'Add Member', href: '/add' },
    { name: 'Search member', href: '/search' },
    { name: 'Edit member', href: '/edit' },
    { name: 'List members', href: '/list' },
    { name: 'Contribute to family trust', href: '/payment' },
    { name: 'Create Project', href: '/create-project' },
    { name: 'View Projects', href: '/projects' },
    { name: 'Add  family Business', href: '/add-business' },
    { name: 'List family Businesses', href: '/businesses' },
    { name: 'Add Achievement', href: '/add-achievement' },
    { name: 'List Achievements', href: '/achievements' },
    { name: 'Create Poll', href: '/create-poll' },
    { name: 'View Polls', href: '/polls' },
    { name: 'Add Job Post', href: '/add-job' },
    { name: 'View Job Posts', href: '/jobs' },
  ];

  return (
    <Container className='mt-4 mb-4'>
      <Row className='g-3'>
        {actions.map((action) => (
          <Col key={action.name} xs={12} sm={6} md={4} lg={3}>
            <Button variant='primary' className='w-100'>
              <a href={action.href} className='text-white text-decoration-none'>
                {action.name}
              </a>
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
