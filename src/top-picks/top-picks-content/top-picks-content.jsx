import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import MtgCard from '../../mtg-card/mtg-card';
import './top-picks-content.css';

function rowOfCards(cards, cardUri) {
  return cards.map(() => (
    <Col>
      <MtgCard state={cardUri} />
    </Col>
  ));
}

function numberOfRows(cards, colMax, cardUri) {
  const rows = [];
  while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }

  return rows.map(row => (
    <Row>
      {rowOfCards(row, cardUri)}
    </Row>
  ));
}

function TopPicksContent({ state }) {
  const tmp = numberOfRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 6, state);

  return (
    <div className="top-picks-content">
      {tmp}
    </div>
  );
}

TopPicksContent.propTypes = {
  state: PropTypes.string.isRequired,
};
export default TopPicksContent;
