import React from 'react';
import PropTypes from 'prop-types';
import './display-card.css';
import { Modal } from 'reactstrap';

function DisplayCard({
  cardUri, visibility, toggle,
}) {
  return (
    <Modal isOpen={visibility} toggle={toggle}>
      <img className="display-card" src={cardUri} alt="OOPSIE!!!" />
    </Modal>
  );
}

DisplayCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default DisplayCard;
