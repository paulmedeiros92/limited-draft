const baseUrl = 'https://api.scryfall.com';

function handleResult(result, tier) {
  const cardInfo = result.data.map((cardResult) => {
    const found = tier.cards.find((card) => {
      return card.name.replace(/\W/gi, '') === cardResult.name.replace(/\W/gi, '');
    });
    return {
      name: cardResult.name,
      image: cardResult.image_uris.normal,
      tier: found.tier,
      rank: found.rank,
    };
  });
  return { tier: tier.tier, cards: cardInfo };
}

const CardService = {
  // do something on error
  fetchCards(tier) {
    const cards = tier.cards.map(card => ({ name: card.name }));
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/cards/collection`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ identifiers: cards }),
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
