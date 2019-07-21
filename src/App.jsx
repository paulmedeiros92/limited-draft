import React from 'react';
import './App.css';
import TopPicks from './top-picks/top-picks';

class App extends React.Component {
  // Add 10px to the x value so that the cursor does not activate mouseout immidiately
  static toggleCard(visibility, e) {
    this.setState({
      displayCard: { visibility: !visibility, target: { x: e.clientX + 10, y: e.clientY } },
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      cardUri: '',
      displayCard: { visibility: false, target: undefined },
    };

    this.toggleCard = App.toggleCard.bind(this);
  }

  render() {
    const { cardUri, displayCard } = this.state;

    fetch('https://api.scryfall.com/cards/named?exact=creepingtrailblazer')
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

    return (
      <TopPicks cardUri={cardUri} displayCard={displayCard} toggleCard={this.toggleCard} />
    );
  }
}

export default App;
