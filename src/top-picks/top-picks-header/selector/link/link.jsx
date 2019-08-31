import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { Button } from 'reactstrap';

function clickLinks(e) {
  Array.from(e.target.parentNode.children).forEach((child) => { child.className = 'btn btn-info'; });
  e.target.className = 'btn btn-success';
}

function Link({ showTier, tier }) {
  return (
    <Button color="info" onClick={(e) => { showTier(tier, e); clickLinks(e); }}>{tier}</Button>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
};

export default Link;
