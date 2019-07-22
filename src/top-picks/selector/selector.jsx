import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { Nav, NavItem, NavLink } from 'reactstrap';

function Selector({ fetchCards }) {
  // TODO: Look into why passing a function this way does not work
  // const fetchTier = (cardName) => {fetchCards(cardName)};
  return (
    <div className="nav-div">
      <Nav>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('festeringnewt')}>Tier #1</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('creepingtrailblazer')}>Tier #2</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('blightbeetle')}>Tier #3</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('risenreef')}>Tier #4</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('bagofholding')}>Tier #5</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('frilledsandwalla')}>Tier #6</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => fetchCards('scorchspitter')}>Tier #7</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

Selector.propTypes = {
  fetchCards: PropTypes.func.isRequired,
};

export default Selector;
