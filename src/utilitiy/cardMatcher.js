const matchTitlesToCards = (titlesArray, cardsArray) => titlesArray.reduce(
  (matchingArray, title) => matchingArray.concat(
    cardsArray.filter(card => card.name.includes(title)),
  ),
  [],
);

export default matchTitlesToCards;
