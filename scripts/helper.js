/* eslint-disable no-unused-vars */
const makeDeck = () => {
  const newDeck = [];

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    let currentSymbol = '';
    if (suitIndex === 0) {
      currentSymbol = '♥';
    } else if (suitIndex === 1) {
      currentSymbol = '♦';
    } else if (suitIndex === 2) {
      currentSymbol = '♣';
    } else if (suitIndex === 3) {
      currentSymbol = '♠';
    }

    let currentColor = '';
    if (suitIndex === 0 || suitIndex === 1) {
      currentColor = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentColor = 'black';
    }

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;

      if (cardName === '1') {
        cardName = 'ace';
        shortName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      // and suit symbol, display name and color
      const card = {
        suit: currentSuit,
        suitSymbol: currentSymbol,
        color: currentColor,
        rank: rankCounter,
        name: cardName,
        displayName: shortName,
        isDiscard: true,
      };

      newDeck.push(card);
    }
  }
  return newDeck;
};

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

const makePayTable = () => {
  const newTable = [];
  const payouts = [250, 50, 25, 9, 6, 4, 3, 2, 1];

  for (let i = 1; i <= 5; i += 1) {
    const handPayouts = {
      royalFlush: payouts[0] * i,
      straightFlush: payouts[1] * i,
      fourOfAKind: payouts[2] * i,
      fullHouse: payouts[3] * i,
      flush: payouts[4] * i,
      straight: payouts[5] * i,
      threeOfAKind: payouts[6] * i,
      twoPair: payouts[7] * i,
      jacksOrBetter: payouts[8] * i,
    };
    newTable.push(handPayouts);
  }
  newTable[newTable.length - 1].royalFlush = 4000;
  return newTable;
};

const initGame = () => {
  fullPayTable = makePayTable();
  payKeys = Object.keys(fullPayTable[0]);
};

initGame();

const toggleDiscard = (playerHand) => {
  if (playerHand.isDiscard === false) {
    holdAudio.play();
    playerHand.isDiscard = true;
  } else {
    holdAudio.play();
    playerHand.isDiscard = false;
  }
  console.log('discard!');
};

const displayHold = (playerHand, place) => {
  if (playerHand.isDiscard === false) {
    place.className = 'hold-show';
  } else {
    place.className = 'hold-hide';
  }
};
