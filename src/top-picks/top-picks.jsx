import React from 'react';
import PropTypes from 'prop-types';
import TopPicksContent from './top-picks-content/top-picks-content';

function TopPicks({
  cardsOfTier, displayCard, showTier, selectedTier, search,
  displaySearchFilter, toggleSearchFilter, cardTiers,
}) {
  return (
    <div>
      <TopPicksContent
        cardsOfTier={cardsOfTier}
        displayCard={displayCard}
        showTier={showTier}
        selectedTier={selectedTier}
        search={search}
        displaySearchFilter={displaySearchFilter}
        toggleSearchFilter={toggleSearchFilter}
        cardTiers={cardTiers}
      />
    </div>
  );
}

TopPicks.propTypes = {
  cardsOfTier: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  showTier: PropTypes.func.isRequired,
  selectedTier: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};
export default TopPicks;
