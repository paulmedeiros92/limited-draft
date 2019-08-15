const baseUrl = 'https://api.scryfall.com/'

function handleResult(result, tier) {
  let cardImages = result.data.map(card => card.image_uris.normal);
  return {tier: tier.tier, cards: cardImages};
}

const CardService = {
  fetchCard(name) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}cards/named?exact=${name}`)
        .then(res => res.json())
        .then(
          result => resolve(result),
          (error) => {
            reject(error);
          },
        );
    });
  },
  // do something on error
  fetchCards(tier) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}cards/collection`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({identifiers: tier.cards})
      })
        .then(res => res.json())
        .then(
          result => resolve(handleResult(result, tier)),
          (error) => {
            reject(error);
          },
        )
    })
  },
};

export default CardService;
