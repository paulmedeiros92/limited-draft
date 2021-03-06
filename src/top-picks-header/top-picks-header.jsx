import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.scss';
import { useHistory } from 'react-router-dom';
import {
  Navbar, Nav, Dropdown,
} from 'react-bootstrap';

function createItems(sets, changeSet) {
  return sets.map(set => (
    <Dropdown.Item key={set.name} onClick={() => changeSet(set)}>
      <img src={set.icon_svg_uri} alt="no-set-icon" className="icon" />
      {set.name}
    </Dropdown.Item>
  ));
}

function TopPicksHeader({ changeSet, selectedSet, sets }) {
  const items = createItems(sets, changeSet);
  const history = useHistory();

  return (
    <div className="top-picks-header">
      <Navbar bg="light" variant="light" expand="lg" className="mr-auto">
        <Navbar.Brand onClick={() => history.push('/')}><Nav.Link>MTG Buddy</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push('/mechanics')}>Mechanics</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                <img src={selectedSet.icon_svg_uri} alt="no-set-icon" className="icon" />
                {selectedSet.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {items}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

TopPicksHeader.propTypes = {
  changeSet: PropTypes.func.isRequired,
  selectedSet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon_svg_uri: PropTypes.string,
  }).isRequired,
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon_svg_uri: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TopPicksHeader;
