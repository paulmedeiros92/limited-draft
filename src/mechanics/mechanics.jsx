import React from 'react';
import './mechanics.scss';
import {
  Col, Row, Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MtgCard from '../cards/mtg-card/mtg-card';
import { MECHANICS } from '../set-data/constants';
import matchTitlesToCards from '../utilitiy/cardMatcher';
import DisplayCard from '../cards/display-card/display-card';

function rowOfCards(cards) {
  return cards.map(card => (
    <Col key={card.uri}>
      <MtgCard
        card={card}
      />
    </Col>
  ));
}

function buildMechanics(mechanics, exampleCards) {
  return mechanics.map((mechanic) => {
    const cards = rowOfCards(
      matchTitlesToCards(mechanic.exampleCards.map(card => card.name), exampleCards),
      mechanic,
    );
    return (
      <Card className="mechanic" key={mechanic.title}>
        <Card.Header className="title-row">
          {mechanic.title}
        </Card.Header>
        <Card.Body className="examples">
          <Row>
            <Col md={3}>
              {mechanic.description}
              <a className="learn-more" target="_blank" rel="noopener noreferrer" href={mechanic.citation}>Learn More</a>
            </Col>
            <Col md={9}>
              <Row className="cards">
                {cards}
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });
}

function Mechanics() {
  const {
    currentSet, exampleCards, displayCard,
    isLoading,
  } = useSelector(state => ({
    currentSet: state.currentSet,
    exampleCards: state.exampleCards,
    displayCard: state.displayCard,
    isLoading: state.isLoading,
  }));
  const mechanics = (isLoading || exampleCards.length === 0) ? '' : buildMechanics(MECHANICS[currentSet.code], exampleCards);
  return (
    <div className="mechanics">
      {mechanics}
      {displayCard && <DisplayCard displayCard={displayCard} />}
    </div>
  );
}

export default Mechanics;
