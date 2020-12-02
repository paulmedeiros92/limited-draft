import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { ButtonToolbar } from 'react-bootstrap';
import Link from './link/link';
import pickData from '../../set-data/thb/thb.json';
import Search from './search/search';

function makeLinks(showTier, tiers, selectedTier, loadToggle, setPicks) {
  return tiers.map(tier => (
    <Link
      showTier={showTier}
      tier={tier.tier}
      key={`Select${tier.tier}`}
      selectedTier={selectedTier}
      loadToggle={loadToggle}
      setPicks={setPicks}
    />
  ));
}

function Selector({
  showTier, selectedTier, loadToggle, search, displaySearchFilter,
  toggleSearchFilter, cardTiers, setPicks,
}) {
  return (
    <div className="nav-div">
      <ButtonToolbar>
        {makeLinks(showTier, pickData, selectedTier, loadToggle, setPicks)}
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
    filter: PropTypes.string.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  setPicks: PropTypes.arrayOf(
    PropTypes.shape({
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          rank: PropTypes.number,
          tier: PropTypes.string,
        }),
      ),
      tier: PropTypes.string.isRequired,
    }),
  ).isRequired,
};


export default Selector;
