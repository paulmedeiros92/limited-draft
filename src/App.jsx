import React from 'react';
import './App.css';
import TopPicks from './top-picks/top-picks';

class App extends React.Component {
  // Add 10px to the x value so that the cursor does not activate mouseout immidiately
  static toggleCard(visibility, e) {
    const { windowHeight } = this.state;
    let height = e.clientY;
    if (height + 400 > windowHeight) {
      height = windowHeight - 400;
    }
    this.setState({
      displayCard: { visibility: !visibility, target: { x: e.clientX + 10, y: height } },
    });
  }

  static fetchCards(name) {
    fetch(`https://api.scryfall.com/cards/named?exact=${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ cardUri: result.image_uris.png });
        },
        (error) => {
          console.error(`Fetch Failed: ${error}`);
          this.setState({ cardUri: 'TODO: add a funny card error' });
        },
      );
  }

  constructor(props) {
    super(props);
    this.state = {
      cardUri: '',
      displayCard: { visibility: false, target: undefined },
      windowHeight: 0,
    };

    this.toggleCard = App.toggleCard.bind(this);
    this.fetchCards = App.fetchCards.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.fetchCards('festeringnewt');
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
    const { cardUri, displayCard } = this.state;

    return (
      <TopPicks
        cardUri={cardUri}
        displayCard={displayCard}
        toggleCard={this.toggleCard}
        fetchCards={this.fetchCards}
      />
    );
  }
}

export default App;
