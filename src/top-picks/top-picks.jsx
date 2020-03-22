import React from 'react';
import {
  Row, Col, Spinner, Button,
} from 'react-bootstrap';
import MtgCard from '../cards/mtg-card/mtg-card';
import './top-picks.scss';
import DisplayCard from '../cards/display-card/display-card';
import Selector from './selector/selector';
import TierData from '../resources/thb-tier-list.json';
import CardService from '../cards/cards-service';
import SearchService from './selector/search/search-service';

class TopPicks extends React.Component {
  static scrollTop() {
    window.scrollTo(0, 0);
  }

  static showTier(tier) {
    const { cardData } = this.state;
    this.setState({ cardsOfTier: cardData[tier], selectedTier: tier });
  }

  static search(string) {
    const { cardData, displaySearchFilter } = this.state;
    this.setState(
      {
        cardsOfTier: SearchService.findMatchingCards(
          string, cardData, displaySearchFilter.filter,
        ),
        selectedTier: '',
      },
    );
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
      cardData: {},
      cardsOfTier: [],
      selectedTier: '',
      cardTiers: [],
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

    Promise.all(TierData.map(tier => CardService.fetchCards(tier)))
      .then((results) => {
        const data = {};
        results.forEach((result) => {
          data[result.tier] = result.cards;
        });
        this.setState({ cardData: data, cardTiers: Object.keys(data) });
        this.showTier('Incredible Bombs');
      });
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
    const cards = this.numberOfRows(cardsOfTier, 5);
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

export default TopPicks;
