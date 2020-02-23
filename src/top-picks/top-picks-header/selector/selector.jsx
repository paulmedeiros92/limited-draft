import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { ButtonToolbar } from 'reactstrap';
import Link from './link/link';
import pickData from '../../../resources/thb-tier-list.json';

function makeLinks(showTier, tiers, selectedTier, loadToggle) {
  return tiers.map(tier => (
    <Link
      showTier={showTier}
      tier={tier.tier}
      selectedTier={selectedTier}
      loadToggle={loadToggle}
    />
  ));
}

function Selector({ showTier, selectedTier, loadToggle }) {
  return (
    <div className="nav-div">
      <ButtonToolbar>
        {makeLinks(showTier, pickData, selectedTier, loadToggle)}
      </ButtonToolbar>
    </div>
  );
}

Selector.propTypes = {
  showTier: PropTypes.func.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
};


export default Selector;
