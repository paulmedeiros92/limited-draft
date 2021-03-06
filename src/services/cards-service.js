const baseUrl = 'https://api.scryfall.com';

function handleResult(result, tier) {
  const cardInfo = result.data.map((cardResult) => {
    const found = tier.cards.find(card => cardResult.name.toLowerCase().replace(/\W/gi, '').includes(card.name.toLowerCase().replace(/\W/gi, '')));
    return {
      name: cardResult.name,
      image: cardResult.card_faces !== undefined
        && cardResult.card_faces[0].image_uris !== undefined
        ? cardResult.card_faces[0].image_uris.normal : cardResult.image_uris.normal,
      tier: found.tier,
      rank: found.rank,
    };
  });
  return { tier: tier.tier, cards: cardInfo };
}

const CardService = {
  // do something on error
  fetchCards(tier) {
    const identifiers = tier.cards.map(card => ({ name: card.name }));
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
          result => resolve(handleResult(result, tier)),
          (error) => {
            reject(error);
          },
        );
    });
  },
};

export default CardService;
