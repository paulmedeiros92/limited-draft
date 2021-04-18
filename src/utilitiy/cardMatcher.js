export const matchTitlesToCards = (titlesArray, cardsArray) => {
  return titlesArray.reduce((matchingArray, title) => {
    matchingArray = matchingArray.concat(cardsArray.filter((card) => card.name.includes(title)))
    return matchingArray
  }, []);
}