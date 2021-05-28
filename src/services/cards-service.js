const baseUrl = 'https://api.scryfall.com';

const CardService = {
  // do something on error
  fetchCards(cardNames) {
    const identifiers = cardNames.map(cardName => ({ name: cardName }));
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/cards/collection`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ identifiers }),
      })
        .then(res => res.json())
        .then(
          result => resolve(result),
          (error) => {
            reject(error);
          },
        );
    });
  },
  getCardImageUris(card) {
    if (card.card_faces) {
      return card.card_faces[0].image_uris;
    }
    return card.image_uris;
  },
  isFlipCard(card) {
    return card.card_faces;
  },
};

export default CardService;
