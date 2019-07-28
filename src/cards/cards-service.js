const CardService = {
  fetchCards(name) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.scryfall.com/cards/named?exact=${name}`)
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
