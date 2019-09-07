import React from 'react';
import PropTypes from 'prop-types';
import './mtg-card.css';

function MtgCard({ cardUri, toggleCard, displayCard, loadTick }) {
  const toggleFunc = (e) => {
    e.preventDefault();
    toggleCard(displayCard.visibility, cardUri);
  };
  return (
    <img src={cardUri} onClick={toggleFunc} alt="beetle" onLoad={loadTick}/>
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
    cardUri: PropTypes.string.isRequired,
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
  loadTick: PropTypes.func.isRequired,
};
export default MtgCard;
