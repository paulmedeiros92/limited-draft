import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.scss';
import { useHistory } from 'react-router-dom';
import {
  Navbar, Nav, Dropdown,
} from 'react-bootstrap';
import { MECHANICS } from "../set-data/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeSet, loadExampleCards } from "../redux/actions";

function createItems(sets, dispatch) {
  return sets.map(set => (
    <Dropdown.Item key={set.name} onClick={() => dispatch(changeSet(set))}>
      <img src={set.icon_svg_uri} alt="no-set-icon" className="icon" />
      {set.name}
    </Dropdown.Item>
  ));
}

function findSetExampleCards(mechanicObjectsArray) {
  return mechanicObjectsArray.reduce((array, mechanic) => {
    array = array.concat(mechanic.exampleCards.map((card) => card.name));
    return array
  }, []);
}

function mechanicsClick(history, dispatch, currentSet) {
  dispatch(loadExampleCards(findSetExampleCards(MECHANICS[currentSet.code])))
  history.push('/mechanics');
}

function TopPicksHeader() {
  const dispatch = useDispatch();
  const currentSet = useSelector((state) => state.currentSet);
  const cardSets = useSelector((state) => state.cardSets);
  const items = createItems(Object.values(cardSets), dispatch);
  const history = useHistory();

  return (
    <div className="top-picks-header">
      <Navbar bg="light" variant="light" expand="lg" className="mr-auto">
        <Navbar.Brand onClick={() => history.push('/')}><Nav.Link>MTG Buddy</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => mechanicsClick(history, dispatch, currentSet)}>Mechanics</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                <img src={currentSet.icon_svg_uri} alt="no-set-icon" className="icon" />
                {currentSet.name}
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
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon_svg_uri: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TopPicksHeader;
