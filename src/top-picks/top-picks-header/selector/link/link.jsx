import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { NavLink } from 'reactstrap';

function Link({ showTier, tier }) {
  return (
    <NavLink href="#" onClick={() => showTier(tier)}>{tier}</NavLink>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
};

export default Link;
