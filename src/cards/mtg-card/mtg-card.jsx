import React from 'react';
import PropTypes from 'prop-types';
import './mtg-card.css';

function MtgCard({ cardUri, toggleCard, displayCard }) {
  const toggleFunc = (e) => {
    e.preventDefault();
    toggleCard(displayCard.visibility, e);
  };
  return (
    <img src={cardUri} onMouseOver={toggleFunc} onMouseOut={toggleFunc} alt="beetle" />
  );
}

MtgCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
};
export default MtgCard;
