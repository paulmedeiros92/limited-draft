import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import MtgCard from '../../cards/mtg-card/mtg-card';
import './top-picks-content.css';
import DisplayCard from '../../cards/display-card/display-card';
import Selector from '../top-picks-header/selector/selector';

class TopPicksContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      target: { x: 0, y: 0 },
      cardUri: '',
    };

    this.rowOfCards = this.rowOfCards.bind(this);
    this.numberOfRows = this.numberOfRows.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
  }

  toggleCard(visibility, uri) {
    this.setState({
      visibility: !visibility,
      target: { x: 0, y: 0 },
      cardUri: uri,
    });
  }

  rowOfCards(cards) {
    const { loadTick } = this.props;
    return cards.map(card => (
      <Col>
        <MtgCard
          cardUri={card.image}
          toggleCard={this.toggleCard}
          displayCard={this.state}
          loadTick={loadTick}
        />
      </Col>
    ));
  }

  numberOfRows(cardsOfTier, colMax) {
    const rows = [];
    const cards = [...cardsOfTier];
    while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }
    return rows.map(row => (
      <Row>
        {this.rowOfCards(row)}
      </Row>
    ));
  }

  render() {
    const {
      cardsOfTier, loading, showTier, selectedTier, loadToggle,
    } = this.props;
    const { cardUri, target, visibility } = this.state;
    const cards = this.numberOfRows(
      cardsOfTier, 5,
    );
    return (
      <div className="top-picks-content">
        <Selector showTier={showTier} selectedTier={selectedTier} loadToggle={loadToggle} />
        {loading && <Spinner color="success" />}
        {cards}
        <DisplayCard
          cardUri={cardUri}
          target={target}
          visibility={visibility}
          toggle={this.toggleCard}
        />
      </div>
    );
  }
}

TopPicksContent.propTypes = {
  cardsOfTier: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  loadTick: PropTypes.func.isRequired,
  showTier: PropTypes.func.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
};
export default TopPicksContent;
