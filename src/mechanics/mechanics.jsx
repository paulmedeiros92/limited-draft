import React from 'react';
import PropTypes from 'prop-types';
import './mechanics.scss';
import {
  Col, Row, Spinner, Card,
} from 'react-bootstrap';
import CardService from '../services/cards-service';
import DisplayCard from '../cards/display-card/display-card';
import MtgCard from '../cards/mtg-card/mtg-card';
import ZNR_MECHANICS from '../set-data/znr/znr-mechanics.json';
import ELD_MECHANICS from '../set-data/eld/eld-mechanics.json';
import IKO_MECHANICS from '../set-data/iko/iko-mechanics.json';
import M21_MECHANICS from '../set-data/m21/m21-mechanics.json';
import KHM_MECHANICS from '../set-data/khm/khm-mechanics.json';
import STX_MECHANICS from '../set-data/stx/stx-mechanics.json';

const MECHANICS = {
  znr: ZNR_MECHANICS,
  eld: ELD_MECHANICS,
  iko: IKO_MECHANICS,
  m21: M21_MECHANICS,
  khm: KHM_MECHANICS,
  stx: STX_MECHANICS,
};

class Mechanics extends React.Component {
  static toggleCard(cardUri, cardTier, cardRank, visibility) {
    this.setState({
      displayCard: {
        cardUri, cardTier, cardRank, visibility: !visibility, target: { x: 0, y: 0 },
      },
    });
  }

  static cardFinder(exampleCardNames, cardName) {
    let isFound = false;
    if (cardName.includes('//')) {
      isFound = exampleCardNames.find(example => cardName.includes(example.name)) !== undefined;
    } else {
      isFound = exampleCardNames.find(example => example.name === cardName) !== undefined;
    }
    return isFound;
  }

  constructor(props) {
    super(props);
    this.state = {
      displayCard: {
        cardUri: '',
        cardTier: '',
        cardRank: -1,
        visibility: false,
        target: { x: 0, y: 0 },
      },
      exampleCards: [],
      loading: true,
    };

    this.toggleCard = Mechanics.toggleCard.bind(this);
    this.cardFinder = Mechanics.cardFinder.bind(this);

    CardService.fetchCards(
      { tier: 'Mechanics Examples', cards: MECHANICS[props.selectedSet.code].map(mechanic => mechanic.exampleCards).flat() },
    ).then((result) => {
      const cardMap = {};
      MECHANICS[props.selectedSet.code].forEach((mechanic) => {
        cardMap[mechanic.title] = result.cards.filter(card => this.cardFinder(mechanic.exampleCards, card.name));
      });
      this.setState({ exampleCards: cardMap, loading: false });
    });
  }

  buildMechanics(mechanics) {
    const { exampleCards } = this.state;
    return mechanics.map((mechanic) => {
      const cards = this.rowOfCards(exampleCards[mechanic.title]);
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

  rowOfCards(cards) {
    const { displayCard } = this.state;
    return cards.map(card => (
      <Col key={card.image}>
        <MtgCard
          cardUri={card.image}
          cardTier={card.tier}
          cardRank={card.rank}
          toggleCard={this.toggleCard}
          displayVisibility={displayCard.visibility}
          loadTick={this.loadTick}
        />
      </Col>
    ));
  }

  render() {
    const { displayCard, loading } = this.state;
    const { selectedSet } = this.props;
    const mechanics = loading ? '' : this.buildMechanics(MECHANICS[selectedSet.code]);
    return (
      <div className="mechanics">
        {mechanics}
        {loading && <Spinner animation="border" variant="success" />}
        <DisplayCard
          displayCard={displayCard}
          toggle={this.toggleCard}
        />
      </div>
    );
  }
}

Mechanics.propTypes = {
  selectedSet: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
};
export default Mechanics;
