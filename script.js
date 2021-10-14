let playerCredits = 100;
const playerHand = [];

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

const shuffledDeck = shuffleCards(makeDeck());

console.log(shuffledDeck);

const toggleDiscard = (playerCard) => {
  if (playerCard.isDiscard === false) {
    playerCard.isDiscard = true;
  } else {
    playerCard.isDiscard = false;
  }
};

const drawFive = () => {
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(shuffledDeck.pop());
  }
};

const discardAndReplace = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    if (playerHand[i].isDiscard) {
      playerHand.splice(i, 1, shuffledDeck.pop());
    }
  }
};

/// score the hand
const calcHandScore = (hand) => {
  const handScore = 1;
  console.log(handScore);
  return handScore;
};

const dealCards = () => {
  if (playerHand.length < 5) {
    drawFive();
  } else if (playerHand.length === 5) {
    discardAndReplace();
    calcHandScore(playerHand);
    /// empty player hand at round end
    // playerHand = [];
  }
};

/// bet -> dealOne -> toggle -> dealTwo -> calc // bet calc -> bet -> circular logic

/// dont forget instructions with tooltps

/// wireframe for mobile

/// follow blue screen video poker model layout

/// make a payout table
const makePayTable = () => {
  const newTable = [];
  const payouts = [250, 50, 25, 9, 6, 4, 3, 2, 1];

  for (let i = 1; i <= 5; i += 1) {
    const handPayouts = {
      'Royal Flush': payouts[0] * i,
      'Straight Flush': payouts[1] * i,
      'Four Of A Kind': payouts[2] * i,
      'Full House': payouts[3] * i,
      Flush: payouts[4] * i,
      Straight: payouts[5] * i,
      'Three Of A Kind': payouts[6] * i,
      'Two Pair': payouts[7] * i,
      'Jacks Or Better': payouts[8] * i,
    };
    newTable.push(handPayouts);
  }
  newTable[newTable.length - 1]['Royal Flush'] = 4000;
  return newTable;
};

const fullPayTable = makePayTable();

/// bet function to deduct bet amount
const deductBet = (playerBet) => {
  playerCredits -= playerBet;
};

let currentPayouts = {};

/// bet function to select payout table subset
const selectPayouts = (playerBet) => {
  currentPayouts = fullPayTable[playerBet - 1];
};

const makeBet = (playerBet) => {
  deductBet(playerBet);
  selectPayouts(playerBet);
};
