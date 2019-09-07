import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { Button } from 'reactstrap';

function Link({
  showTier, tier, selectedTier, loadToggle,
}) {
  const color = tier === selectedTier ? 'success' : 'info';

  function click(e) {
    showTier(tier, e);
    loadToggle(true);
  }

  return (
    <Button color={color} onClick={click}>{tier}</Button>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
};

export default Link;
