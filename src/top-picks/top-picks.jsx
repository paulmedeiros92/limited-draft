import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';
import Donate from '../donate/donate';

function TopPicks({
  cardsOfTier, displayCard, toggleCard, showTier, search, displaySearchFilter, toggleSearchFilter,
  cardTiers,
}) {
  return (
    <div>
      <TopPicksHeader
        showTier={showTier}
        search={search}
        displaySearchFilter={displaySearchFilter}
        toggleSearchFilter={toggleSearchFilter}
        cardTiers={cardTiers}
      />
      <TopPicksContent
        cardsOfTier={cardsOfTier}
        displayCard={displayCard}
        toggleCard={toggleCard}
      />
      <Donate/>
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
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    filter: PropTypes.string.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
};
export default TopPicks;
