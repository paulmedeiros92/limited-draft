import React from 'react';
import './top-picks-header.css';
import { Navbar, Nav } from 'react-bootstrap';

function TopPicksHeader() {
  return (
    <div className="top-picks-header">
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="order">MTG Buddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Pick Order</Nav.Link>
            <Nav.Link href="/mechanics">Set Mechanics</Nav.Link>
            <Nav.Link href="/archetypes">Archetypes</Nav.Link>
            <Nav.Link href="/removal">Removal</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default TopPicksHeader;
