import React from 'react';
import PropTypes from 'prop-types';
import './mtg-card.css';

function MtgCard({ state }) {
  return (
    <img src={state} alt="beetle" />
  );
}

MtgCard.propTypes = {
  state: PropTypes.string.isRequired,
};
export default MtgCard;
