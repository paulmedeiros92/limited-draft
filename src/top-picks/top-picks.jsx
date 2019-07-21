import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';

function TopPicks({ cardUri, displayCard, toggleCard }) {
  return (
    <div>
      <TopPicksHeader />
      <TopPicksContent cardUri={cardUri} displayCard={displayCard} toggleCard={toggleCard} />
    </div>
  );
}

TopPicks.propTypes = {
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
export default TopPicks;
