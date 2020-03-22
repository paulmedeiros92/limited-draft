import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import MtgCard from '../cards/mtg-card/mtg-card';
import './top-picks.css';
import DisplayCard from '../cards/display-card/display-card';
import Selector from './selector/selector';
import TierData from '../resources/thb-tier-list.json';
import CardService from '../cards/cards-service';
import SearchService from './selector/search/search-service';

class TopPicks extends React.Component {
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
    return Object.keys(rows).map(index => (
      <Row key={rows[index][0].image + rows[index][1].image}>
        {this.rowOfCards(rows[index])}
      </Row>
    ));
  }

  render() {
    const {
      loading, cardsOfTier, selectedTier, cardTiers, displaySearchFilter, displayCard,
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
        <DisplayCard
          displayCard={displayCard}
          toggle={this.toggleCard}
        />
      </div>
    );
  }
}

export default TopPicks;
