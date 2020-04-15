import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Spinner, Button,
} from 'react-bootstrap';
import MtgCard from '../cards/mtg-card/mtg-card';
import './top-picks.scss';
import DisplayCard from '../cards/display-card/display-card';
import Selector from './selector/selector';
import CardService from '../services/cards-service';
import SearchService from '../services/search-service';

class TopPicks extends React.Component {
  static scrollTop() {
    window.scrollTo(0, 0);
  }

  static showTier(tier) {
    CardService.fetchCards(tier).then((result) => {
      this.setState({ cardsOfTier: result.cards, selectedTier: tier.tier });
    });
  }

  static search(string) {
    const { displaySearchFilter } = this.state;
    const { setPicks } = this.props;
    this.showTier({
      tier: '',
      cards: SearchService.findMatchingCards(
        string, setPicks, displaySearchFilter.filter,
      ),
    });
  }

  static toggleSearchFilter(filter, className) {
    const { displaySearchFilter } = this.state;
    if (className.includes('dropdown')) {
      this.setState(
        { displaySearchFilter: { visibility: !displaySearchFilter.visibility, filter } },
      );
    } else {
      this.setState(
        {
          displaySearchFilter: {
            visibility: !displaySearchFilter.visibility,
            filter: displaySearchFilter.filter,
          },
        },
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
      cardsOfTier: [],
      selectedTier: '',
      cardTiers: props.setPicks.map(tier => tier.tier),
      displaySearchFilter: { visibility: false, filter: 'Search By' },
      displayCard: {
        cardUri: '',
        cardTier: '',
        cardRank: -1,
        visibility: false,
        target: { x: 0, y: 0 },
      },
      loading: true,
      loaded: 0,
    };

    this.scrollTop = TopPicks.scrollTop.bind(this);
    this.showTier = TopPicks.showTier.bind(this);
    this.search = TopPicks.search.bind(this);
    this.toggleSearchFilter = TopPicks.toggleSearchFilter.bind(this);
    this.rowOfCards = this.rowOfCards.bind(this);
    this.numberOfRows = this.numberOfRows.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.loadToggle = this.loadToggle.bind(this);
    this.loadTick = this.loadTick.bind(this);

    if (props.setPicks.length > 0) {
      this.showTier(props.setPicks.find(tier => tier.tier === 'Incredible Bombs'));
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        this.setState({ hasScrolled: false });
      } else {
        this.setState({ hasScrolled: true });
      }
    });
  }

  toggleCard(cardUri, cardTier, cardRank, visibility) {
    this.setState({
      displayCard: {
        cardUri, cardTier, cardRank, visibility: !visibility, target: { x: 0, y: 0 },
      },
    });
  }

  loadToggle(loading) {
    this.setState({ loading, loaded: 0 });
  }

  loadTick() {
    const { loaded, cardsOfTier } = this.state;
    this.setState(prevState => ({ loaded: prevState.loaded + 1 }));
    if (loaded === 5 || loaded >= cardsOfTier.length - 1) {
      this.loadToggle(false);
    }
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

  numberOfRows(cardsOfTier, colMax) {
    const rows = [];
    const cards = [...cardsOfTier];
    while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }
    return rows.map((row, index) => (
      <Row key={row[0].image}>
        {this.rowOfCards(rows[index])}
      </Row>
    ));
  }

  render() {
    const {
      loading, cardsOfTier, selectedTier, cardTiers, displaySearchFilter, displayCard,
      hasScrolled,
    } = this.state;
    const { setPicks } = this.props;
    const cards = cardsOfTier.length > 0 ? this.numberOfRows(cardsOfTier, 5) : '';
    return (
      <div className="top-picks-content">
        <Selector
          showTier={this.showTier}
          selectedTier={selectedTier}
          loadToggle={this.loadToggle}
          search={this.search}
          displaySearchFilter={displaySearchFilter}
          toggleSearchFilter={this.toggleSearchFilter}
          cardTiers={cardTiers}
          setPicks={setPicks}
        />
        {loading && <Spinner animation="border" variant="success" />}
        {cards}
        {hasScrolled && <Button className="scroll-button" variant="primary" onClick={this.scrollTop}>Top</Button>}
        <DisplayCard
          displayCard={displayCard}
          toggle={this.toggleCard}
        />
      </div>
    );
  }
}

TopPicks.propTypes = {
  setPicks: PropTypes.arrayOf(
    PropTypes.shape({
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          rank: PropTypes.number,
          tier: PropTypes.string,
        }),
      ),
      tier: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default TopPicks;
