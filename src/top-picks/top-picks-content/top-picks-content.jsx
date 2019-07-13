import React from 'react';
import { Row, Col } from 'reactstrap';
import MtgCard from '../../mtg-card/mtg-card';
import './top-picks-content.css';

function rowOfCards(cards) {
  return cards.map(() => (
    <Col>
      <MtgCard />
    </Col>
  ));
}

function numberOfRows(cards, colMax) {
  const rows = [];
  while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }

  return rows.map(row => (
    <Row>
      {rowOfCards(row)}
    </Row>
  ));
}

function TopPicksContent() {
  const tmp = numberOfRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 6);

  return (
    <div className="top-picks-content">
      {tmp}
    </div>
  );
}

export default TopPicksContent;
