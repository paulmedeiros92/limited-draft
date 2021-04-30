import React from 'react';
import './mechanics.scss';
import {
  Col, Row, Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MtgCard from '../cards/mtg-card/mtg-card';
import { MECHANICS } from '../set-data/constants';
import { matchTitlesToCards } from '../utilitiy/cardMatcher';

function rowOfCards(cards, mechanic) {
  return cards.map(card => (
    <Col key={card.uri}>
      <MtgCard
        cardData={card}
        label={mechanic.title}
      />
    </Col>
  ));
}

function buildMechanics(mechanics, exampleCards, displayCard) {
  return mechanics.map((mechanic) => {
    const cards = rowOfCards(
      matchTitlesToCards(mechanic.exampleCards.map(card => card.name), exampleCards),
      mechanic,
      displayCard,
    );
    return (
      <Card className="mechanic">
        <Card.Header className="title-row">
          {mechanic.title}
        </Card.Header>
        <Card.Text className="examples">
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
        </Card.Text>
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
  const mechanics = (isLoading || exampleCards.length === 0) ? '' : buildMechanics(MECHANICS[currentSet.code], exampleCards, displayCard);
  return (
    <div className="mechanics">
      {mechanics}
      {/* {loading && <Spinner animation="border" variant="success" />}
      <DisplayCard
        displayCard={displayCard}
        toggle={this.toggleCard}
      /> */}
    </div>
  );
}

export default Mechanics;
