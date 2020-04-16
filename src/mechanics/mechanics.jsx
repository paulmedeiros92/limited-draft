import React from 'react';
import PropTypes from 'prop-types';
import './mechanics.scss';
import {
  Col, Row, Spinner, Card,
} from 'react-bootstrap';
import CardService from '../services/cards-service';
import DisplayCard from '../cards/display-card/display-card';
import MtgCard from '../cards/mtg-card/mtg-card';
import THB_MECHANICS from '../set-data/thb-mechanics.json';
import ELD_MECHANICS from '../set-data/eld-mechanics.json';
import IKO_MECHANICS from '../set-data/iko-mechanics.json';

const MECHANICS = { thb: THB_MECHANICS, eld: ELD_MECHANICS, iko: IKO_MECHANICS };

class Mechanics extends React.Component {
  static toggleCard(cardUri, cardTier, cardRank, visibility) {
    this.setState({
      displayCard: {
        cardUri, cardTier, cardRank, visibility: !visibility, target: { x: 0, y: 0 },
      },
    });
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

    CardService.fetchCards(
      { tier: 'Archetype Examples', cards: MECHANICS[props.selectedSet.code].map(mechanic => mechanic.exampleCards).flat() },
    ).then((result) => {
      const cardMap = {};
      MECHANICS[props.selectedSet.code].forEach((mechanic) => {
        cardMap[mechanic.title] = result.cards.filter(card => mechanic.exampleCards
          .find(example => example.name === card.name) !== undefined);
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
