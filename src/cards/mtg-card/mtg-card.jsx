import React from 'react';
import PropTypes from 'prop-types';
import './mtg-card.scss';

function MtgCard({
  cardUri, cardTier, cardRank, toggleCard, displayVisibility, loadTick,
}) {
  const toggleFunc = (e) => {
    e.preventDefault();
    toggleCard(cardUri, cardTier, cardRank, displayVisibility);
  };
  return (
    <div className="pick-card">
      <img src={cardUri} onClick={toggleFunc} alt="beetle" onLoad={loadTick} />
    </div>
  );
}

MtgCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  cardTier: PropTypes.string.isRequired,
  cardRank: PropTypes.number.isRequired,
  displayVisibility: PropTypes.bool.isRequired,
  toggleCard: PropTypes.func.isRequired,
  loadTick: PropTypes.func.isRequired,
};
export default MtgCard;
