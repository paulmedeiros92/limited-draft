import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { Button } from 'reactstrap';

function Link({ showTier, tier }) {
  return (
    <Button color="info" onClick={(e) => { showTier(tier, e); }}>{tier}</Button>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
};

export default Link;