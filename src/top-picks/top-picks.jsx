import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';
import Selector from './selector/selector';

function TopPicks({
  cardsOfTier, displayCard, toggleCard, showTier,
}) {
  return (
    <div>
      <TopPicksHeader />
      <Selector showTier={showTier} />
      <TopPicksContent cardsOfTier={cardsOfTier} displayCard={displayCard} toggleCard={toggleCard} />
    </div>
  );
}

TopPicks.propTypes = {
  cardsOfTier: PropTypes.array.isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
  showTier: PropTypes.func.isRequired,
};
export default TopPicks;
