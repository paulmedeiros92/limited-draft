import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.css';
import { Navbar, Nav, Form } from 'react-bootstrap';
import Search from './search/search';

function TopPicksHeader({
  search, displaySearchFilter, toggleSearchFilter, cardTiers,
}) {
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
          <Form inline>
            <Search
              search={search}
              displaySearchFilter={displaySearchFilter}
              toggleSearchFilter={toggleSearchFilter}
              cardTiers={cardTiers}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

TopPicksHeader.propTypes = {
  search: PropTypes.func.isRequired,
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};
export default TopPicksHeader;
