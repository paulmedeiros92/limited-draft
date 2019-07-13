import React from 'react';
import './mtg-card.css';
import {
  Card, CardBody, CardTitle, CardText,
} from 'reactstrap';

function MtgCard() {
  return (
    <Card color="card">
      <CardBody>
        <CardTitle>Placeholder Card</CardTitle>
        <CardText>PlaceHolderText</CardText>
      </CardBody>
    </Card>
  );
}

export default MtgCard;
