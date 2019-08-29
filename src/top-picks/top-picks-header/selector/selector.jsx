import React from 'react';
import PropTypes from 'prop-types';
import './selector.css';
import { ButtonToolbar } from 'reactstrap';
import Link from './link/link';
import pickData from '../../../resources/tier-list';

function makeLinks(showTier, tiers) {
  return tiers.map(tier => (
    <Link showTier={showTier} tier={tier.tier} />
  ));
}

function Selector({ showTier }) {
  return (
    <div className="nav-div">
      <ButtonToolbar>
        {makeLinks(showTier, pickData)}
      </ButtonToolbar>
    </div>
  );
}

Selector.propTypes = {
  showTier: PropTypes.func.isRequired,
};

export default Selector;
