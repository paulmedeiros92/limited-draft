const baseUrl = 'https://api.scryfall.com/'

function handleResult(result, tier) {
  let cardImages = result.data.map(card => { 
    return {name: card.name, image: card.image_uris.normal};
  });
  return {tier: tier.tier, cards: cardImages};
}

const CardService = {
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
