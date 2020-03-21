import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { ButtonToolbar } from 'react-bootstrap';
import Link from './link/link';
import pickData from '../../../resources/thb-tier-list.json';
import Search from './search/search';

function makeLinks(showTier, tiers, selectedTier, loadToggle) {
  return tiers.map(tier => (
    <Link
      showTier={showTier}
      tier={tier.tier}
      key={`Select${tier.tier}`}
      selectedTier={selectedTier}
      loadToggle={loadToggle}
    />
  ));
}

function Selector({
  showTier, selectedTier, loadToggle, search, displaySearchFilter,
  toggleSearchFilter, cardTiers,
}) {
  return (
    <div className="nav-div">
      <ButtonToolbar>
        {makeLinks(showTier, pickData, selectedTier, loadToggle)}
        <Search
          search={search}
          displaySearchFilter={displaySearchFilter}
          toggleSearchFilter={toggleSearchFilter}
          cardTiers={cardTiers}
        />
      </ButtonToolbar>
    </div>
  );
}

Selector.propTypes = {
  showTier: PropTypes.func.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
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


export default Selector;
