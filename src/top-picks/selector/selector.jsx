import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { Nav, NavItem } from 'reactstrap';
import Link from './link/link';
import pickData from '../../resources/tier-list';

function makeLinks(fetchCards, tiers) {
  // TODO: Fix error here
  return tiers.map(tier => (
    <NavItem>
      <Link fetchCards={fetchCards} tier={tier.tier} cardName={tier.cards[0]} />
    </NavItem>
  ));
}

function Selector({ fetchCards }) {
  // TODO: Look into why passing a function this way does not work
  // const fetchTier = (cardName) => {fetchCards(cardName)};
  return (
    <div className="nav-div">
      <Nav>
        {makeLinks(fetchCards, pickData)}
      </Nav>
    </div>
  );
}

Selector.propTypes = {
  fetchCards: PropTypes.func.isRequired,
};

export default Selector;
