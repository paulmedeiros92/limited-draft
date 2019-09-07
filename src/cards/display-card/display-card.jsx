import React from 'react';
import PropTypes from 'prop-types';
import './display-card.css';
import { Modal } from 'reactstrap';

function DisplayCard({
  cardUri, target, visibility, toggle,
}) {
  return (
    <Modal isOpen={visibility} toggle={toggle}>
      <img className="display-card" src={cardUri} alt="OOPSIE!!!" />
    </Modal>
  );
}

DisplayCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  visibility: PropTypes.bool.isRequired,
};

DisplayCard.defaultProps = {
  target: undefined,
};

export default DisplayCard;
