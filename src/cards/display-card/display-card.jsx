import React from 'react';
import PropTypes from 'prop-types';
import './display-card.css';
import { Modal } from 'react-bootstrap';

function DisplayCard({
  cardUri, visibility, toggle,
}) {
  const cardToggle = () => toggle(visibility, cardUri);

  return (
    <Modal show={visibility} onHide={cardToggle}>
      <img className="display-card" src={cardUri} alt="OOPSIE!!!" onClick={cardToggle} />
    </Modal>
  );
}

DisplayCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default DisplayCard;
