import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import MtgCard from '../../cards/mtg-card/mtg-card';
import './top-picks-content.css';
import DisplayCard from '../../cards/display-card/display-card';

function rowOfCards(cards, toggleCard, displayCard) {
  return cards.map(card => (
    <Col>
      <MtgCard cardUri={card} toggleCard={toggleCard} displayCard={displayCard} />
    </Col>
  ));
}

function numberOfRows(cardsOfTier, colMax, toggleCard, displayCard) {
  const rows = [];
  let cards = [...cardsOfTier];
  while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }

  return rows.map(row => (
    <Row>
      {rowOfCards(row, toggleCard, displayCard)}
    </Row>
  ));
}

function TopPicksContent({ cardsOfTier, displayCard, toggleCard }) {
  const cards = numberOfRows(
    cardsOfTier, 5, toggleCard, displayCard,
  );
  const cardOverlay = displayCard.visibility ? <DisplayCard cardUri={displayCard.cardUri} target={displayCard.target} /> : '';
  return (
    <div className="top-picks-content">
      {cards}
      {cardOverlay}
    </div>
  );
}

TopPicksContent.propTypes = {
  cardsOfTier: PropTypes.array.isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    cardUri: PropTypes.string.isRequired,
  }).isRequired,
  toggleCard: PropTypes.func.isRequired,
};
export default TopPicksContent;
