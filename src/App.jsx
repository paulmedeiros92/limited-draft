import React from 'react';
import './App.css';
import TopPicks from './top-picks/top-picks';
import CardService from './cards/cards-service';
import SearchService from './top-picks/top-picks-header/search/search-service';
import TierData from './resources/tier-list';

class App extends React.Component {
  // Add 10px to the x value so that the cursor does not activate mouseout immidiately
  static toggleCard(visibility, e, uri) {
    const { windowHeight } = this.state;
    let height = e.clientY;
    if (height + 400 > windowHeight) {
      height = windowHeight - 400;
    }
    this.setState({
      displayCard: { visibility: !visibility, target: { x: e.clientX + 10, y: height }, cardUri: uri },
    });
  }

  static showTier(tier) {
    this.setState({ cardsOfTier: this.state.cardData[tier] });
  }

  static search(string) {
    this.setState({ cardsOfTier: SearchService.findMatchingCards(string) });
  }

  constructor(props) {
    super(props);
    this.state = {
      cardUri: '',
      cardData: {},
      cardsOfTier: [],
      displayCard: { visibility: false, target: undefined, cardUri: '' },
      windowHeight: 0,
    };

    this.toggleCard = App.toggleCard.bind(this);
    this.showTier = App.showTier.bind(this);
    this.search = App.search.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    Promise.all(TierData.map(tier => CardService.fetchCards(tier)))
      .then(results => {
        let data = {};
        results.forEach(result => {
          data[result.tier] = result.cards;
        })
        this.setState({ cardData: data })
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
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    return (
      <TopPicks
        cardsOfTier={this.state.cardsOfTier}
        displayCard={this.state.displayCard}
        toggleCard={this.toggleCard}
        showTier={this.showTier}
        search={this.search}
      />
    );
  }
}

export default App;
