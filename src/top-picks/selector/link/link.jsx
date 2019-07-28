import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { NavLink } from 'reactstrap';

function Link({ fetchCards, tier, cardName }) {
  return (
    <NavLink href="#" onClick={() => fetchCards(cardName)}>{tier}</NavLink>
  );
}

Link.propTypes = {
  fetchCards: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
};

export default Link;
