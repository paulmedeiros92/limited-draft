import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import MtgCard from '../../cards/mtg-card/mtg-card';
import './top-picks-content.css';
import DisplayCard from '../../cards/display-card/display-card';

function rowOfCards(cards, cardUri, toggleCard, displayCard) {
  return cards.map(() => (
    <Col>
      <MtgCard cardUri={cardUri} toggleCard={toggleCard} displayCard={displayCard} />
    </Col>
  ));
}

function numberOfRows(cards, colMax, cardUri, toggleCard, displayCard) {
  const rows = [];
  while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }

  return rows.map(row => (
    <Row>
      {rowOfCards(row, cardUri, toggleCard, displayCard)}
    </Row>
  ));
}

function TopPicksContent({ cardUri, displayCard, toggleCard }) {
  const tmp = numberOfRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 5, cardUri, toggleCard, displayCard);
  const cardOverlay = displayCard.visibility ? <DisplayCard cardUri={cardUri} target={displayCard.target} /> : '';

  return (
    <div className="top-picks-content">
      {tmp}
      {cardOverlay}
    </div>
  );
}

TopPicksContent.propTypes = {
  cardUri: PropTypes.string.isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
};
export default TopPicksContent;
