import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.css';
import Selector from './selector/selector';
import Search from './search/search';

function TopPicksHeader({
  showTier, search, displaySearchFilter, toggleSearchFilter, cardTiers, selectedTier, loadToggle,
}) {
  return (
    <div className="top-picks-header">
      <h1>MTG Buddy</h1>
      <Selector showTier={showTier} selectedTier={selectedTier} loadToggle={loadToggle} />
      <Search
        search={search}
        displaySearchFilter={displaySearchFilter}
        toggleSearchFilter={toggleSearchFilter}
        cardTiers={cardTiers}
      />
    </div>
  );
}

TopPicksHeader.propTypes = {
  showTier: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
};
export default TopPicksHeader;
