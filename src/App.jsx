import React from 'react';
import './App.css';
import TopPicks from './top-picks/top-picks';
import CardService from './cards/cards-service';
import SearchService from './top-picks/top-picks-header/search/search-service';
import TierData from './resources/tier-list';

class App extends React.Component {
  // Add 10px to the x value so that the cursor does not activate mouseout immidiately
  static toggleCard(visibility, e, uri) {
    const { windowHeight, windowWidth } = this.state;
    let height = e.clientY;
    let width = e.clientX;
    if (height + 400 > windowHeight) {
      height = windowHeight - 400;
    }
    // TODO: this needs to be worked on further
    // if (width + 300 > windowWidth) {
    //   width = windowWidth / 2 - 150;
    // }
    this.setState({
      displayCard: {
        visibility: !visibility,
        target: { x: width + 10, y: height },
        cardUri: uri,
      },
    });
  }

  static showTier(tier) {
    this.setState({ cardsOfTier: this.state.cardData[tier], selectedTier: tier });
  }

  static search(string) {
    this.setState(
      {
        cardsOfTier: SearchService.findMatchingCards(
          string, this.state.cardData, this.state.displaySearchFilter.filter,
        ),
        selectedTier: '',
      },
    );
  }

  static toggleSearchFilter(filter, className) {
    if (className.includes('dropdown')) {
      this.setState(
        { displaySearchFilter: { visibility: !this.state.displaySearchFilter.visibility, filter } },
      );
    } else {
      this.setState(
        {
          displaySearchFilter: {
            visibility: !this.state.displaySearchFilter.visibility,
            filter: this.state.displaySearchFilter.filter,
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
      displayCard: { visibility: false, target: undefined, cardUri: '' },
      displaySearchFilter: { visibility: false, filter: 'Search By' },
      windowHeight: 0,
      windowWidth: 0,
    };

    this.toggleCard = App.toggleCard.bind(this);
    this.showTier = App.showTier.bind(this);
    this.search = App.search.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleSearchFilter = App.toggleSearchFilter.bind(this);

    Promise.all(TierData.map(tier => CardService.fetchCards(tier)))
      .then((results) => {
        const data = {};
        results.forEach((result) => {
          data[result.tier] = result.cards;
        });
        this.setState({ cardData: data, cardTiers: Object.keys(data) })
        this.showTier('THE BEST OF THE BEST');
      });
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

  render() {
    return (
      <TopPicks
        cardsOfTier={this.state.cardsOfTier}
        displayCard={this.state.displayCard}
        toggleCard={this.toggleCard}
        showTier={this.showTier}
        search={this.search}
        displaySearchFilter={this.state.displaySearchFilter}
        toggleSearchFilter={this.toggleSearchFilter}
        cardTiers={this.state.cardTiers}
        selectedTier={this.state.selectedTier}
      />
    );
  }
}

export default App;
