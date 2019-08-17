import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';

function TopPicks({
  cardsOfTier, displayCard, toggleCard, showTier, search
}) {
  return (
    <div>
      <TopPicksHeader showTier={showTier} search={search} />
      <TopPicksContent cardsOfTier={cardsOfTier} displayCard={displayCard} toggleCard={toggleCard} />
    </div>
  );
}

TopPicks.propTypes = {
  cardsOfTier: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
  showTier: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};
export default TopPicks;
