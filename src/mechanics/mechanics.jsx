import React from 'react';
import './mechanics.scss';
import {
  Col, Row, Spinner, Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import DisplayCard from '../cards/display-card/display-card';
import MtgCard from '../cards/mtg-card/mtg-card';
import { MECHANICS } from '../set-data/constants';
import { matchTitlesToCards } from '../utilitiy/cardMatcher'
import { displayCard } from '../redux/actions';



// class Mechanics extends React.Component {
//   static toggleCard(cardUri, cardTier, cardRank, visibility) {
//     this.setState({
//       displayCard: {
//         cardUri, cardTier, cardRank, visibility: !visibility, target: { x: 0, y: 0 },
//       },
//     });
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       displayCard: {
//         cardUri: '',
//         cardTier: '',
//         cardRank: -1,
//         visibility: false,
//         target: { x: 0, y: 0 },
//       },
//     };

//     this.toggleCard = Mechanics.toggleCard.bind(this);
//   }

//   buildMechanics(mechanics) {
//     const { exampleCards } = this.state;
//     return mechanics.map((mechanic) => {
//       const cards = this.rowOfCards(exampleCards[mechanic.title]);
//       return (
//         <Card className="mechanic">
//           <Card.Header className="title-row">
//             {mechanic.title}
//           </Card.Header>
//           <Card.Text className="examples">
//             <Row>
//               <Col md={3}>
//                 {mechanic.description}
//                 <a className="learn-more" target="_blank" rel="noopener noreferrer" href={mechanic.citation}>Learn More</a>
//               </Col>
//               <Col md={9}>
//                 <Row className="cards">
//                   {cards}
//                 </Row>
//               </Col>
//             </Row>
//           </Card.Text>
//         </Card>
//       );
//     });
//   }

//   rowOfCards(cards) {
//     const { displayCard } = this.state;
//     return cards.map(card => (
//       <Col key={card.image}>
//         <MtgCard
//           cardUri={card.image}
//           cardTier={card.tier}
//           cardRank={card.rank}
//           toggleCard={this.toggleCard}
//           displayVisibility={displayCard.visibility}
//           loadTick={this.loadTick}
//         />
//       </Col>
//     ));
//   }

//   render() {
//     const { displayCard, loading } = this.state;
//     const { selectedSet } = this.props;
//     const mechanics = loading ? '' : this.buildMechanics(MECHANICS[selectedSet.code]);
//     return (
//       <div className="mechanics">
//         {mechanics}
//         {loading && <Spinner animation="border" variant="success" />}
//         <DisplayCard
//           displayCard={displayCard}
//           toggle={this.toggleCard}
//         />
//       </div>
//     );
//   }
// }
function rowOfCards(cards, mechanic, displayCard) {
  return cards.map(card => (
    <Col key={card.uri}>
      <MtgCard
        cardUri={card.uri}
        cardTier={mechanic.title}
        cardRank={card.rank}
        toggleCard={this.toggleCard}
        displayVisibility={displayCard.visibility}
        loadTick={this.loadTick}
      />
    </Col>
  ));
}

function buildMechanics(mechanics, exampleCards, displayCard) {
  return mechanics.map((mechanic) => {
    const cards = rowOfCards(
      matchTitlesToCards(mechanic.exampleCards.map((card) => card.name), exampleCards),
      mechanic,
      displayCard);
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

function Mechanics() {
  const {
    currentSet, exampleCards, displayCard,
    isLoading
  } = useSelector((state) => ({
    currentSet: state.currentSet,
    exampleCards: state.exampleCards,
    displayCard: state.displayCard,
    isLoading: state.isLoading,
  }));
  const mechanics = (isLoading || exampleCards.length === 0) ? '' : buildMechanics(MECHANICS[currentSet.code], exampleCards, displayCard);
  return (
    <div className="mechanics">
      {mechanics}
      {/* {loading && <Spinner animation="border" variant="success" />}
      <DisplayCard
        displayCard={displayCard}
        toggle={this.toggleCard}
      /> */}
    </div>
  );
}

export default Mechanics;
