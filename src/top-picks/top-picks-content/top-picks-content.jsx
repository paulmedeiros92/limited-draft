import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import MtgCard from '../../cards/mtg-card/mtg-card';
import './top-picks-content.css';
import DisplayCard from '../../cards/display-card/display-card';

class TopPicksContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      target: { x: 0, y: 0 },
      cardUri: '',
      loading: true,
    };

    this.rowOfCards = this.rowOfCards.bind(this);
    this.numberOfRows = this.numberOfRows.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight, windowWidth: window.innerWidth });
  }

  toggleCard(visibility, uri) {
    this.setState({
      visibility: !visibility,
      target: { x: 0, y: 0 },
      cardUri: uri,
      windowHeight: 0,
      windowWidth: 0,
    });
  }

  rowOfCards(cards) {
    return cards.map(card => (
      <Col>
        <MtgCard cardUri={card.image} toggleCard={this.toggleCard} displayCard={this.state} />
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
    const cards = this.numberOfRows(
      this.props.cardsOfTier, 5,
    );
    return (
      <div className="top-picks-content">
        {this.state.loading && <Spinner color="success" />}
        <div onLoad={() => { this.setState({ loading: false }); }}>
          {cards}
          <DisplayCard
            cardUri={this.state.cardUri}
            target={this.state.target}
            visibility={this.state.visibility}
            toggle={this.toggleCard}
          />
        </div>
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
};
export default TopPicksContent;
