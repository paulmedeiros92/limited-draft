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
};

export default CardService;
