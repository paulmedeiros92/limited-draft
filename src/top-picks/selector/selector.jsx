import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { Nav, NavItem } from 'reactstrap';
import Link from './link/link';
import pickData from '../../resources/tier-list';

function makeLinks(showTier, tiers) {
  // TODO: Fix error here
  return tiers.map(tier => (
    <NavItem>
      <Link showTier={showTier} tier={tier.tier} />
    </NavItem>
  ));
}

function Selector({ showTier }) {
  // TODO: Look into why passing a function this way does not work
  // const fetchTier = (cardName) => {fetchCards(cardName)};
  return (
    <div className="nav-div">
      <Nav>
        {makeLinks(showTier, pickData)}
      </Nav>
    </div>
  );
}

Selector.propTypes = {
  showTier: PropTypes.func.isRequired,
};

export default Selector;
