let playerCredits = 100;
let playerHand = [];

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

const dealCards = () => {
  if (playerHand.length < 5) {
    drawFive();
  } else if (playerHand.length === 5) {
    discardAndReplace();
    // calcHandScore(playerHand);
    /// empty player hand at round end
    // playerHand = [];
  }
};

/// make a payout table
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
  playerHand = [];
  deductBet(playerBet);
  selectPayouts(playerBet);
};

/// pass calcHandScore an array of object (a hand)
const calcHandScore = (hand) => {
  const handScore = 1;
  console.log(handScore);
  return handScore;
};

const makeRankTally = (hand) => {
  const rankTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    const cardRank = hand[i].rank;

    if (cardRank in rankTally) {
      rankTally[cardRank] += 1;
    }
    else {
      rankTally[cardRank] = 1;
    }
  }
  return rankTally;
};

const makeSuitTally = (hand) => {
  const suitTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    const cardSuit = hand[i].suit;

    if (cardSuit in suitTally) {
      suitTally[cardSuit] += 1;
    }
    else {
      suitTally[cardSuit] = 1;
    }
  }
  return suitTally;
};

const deriveMaxValue = (tallyObject) => {
  const valuesArray = Object.values(tallyObject);
  const maxValue = Math.max(...valuesArray);
  return maxValue;
};

const deriveKeysLength = (tallyObject) => {
  const keysArray = Object.keys(tallyObject);
  const keysLength = keysArray.length;
  return keysLength;
};

const checkForSuitAgnosticHands = (hand) => {
  const rankTally = makeRankTally(hand);
  // console.log(rankTally);

  const rankMaxVal = deriveMaxValue(rankTally);
  const rankKeysLen = deriveKeysLength(rankTally);

  // console.log(rankMaxVal);
  // console.log(rankKeysLen);

  if (rankMaxVal === 4 && rankKeysLen === 2) {
    /// four-of-a-kind where 4 of first rank and 1 of second rank suit-agnostic
    console.log('fourOfAKind');
  } else if (rankMaxVal === 3 && rankKeysLen === 2) {
    /// full-house where 3 of first rank and 2 of second rank suit-agnostic
    console.log('fullHouse');
  } else if (rankMaxVal === 3 && rankKeysLen === 3) {
    /// three-of-a-kind where 3 of first rank and 1 of second rank and 1 of third rank suit-agnostic
    console.log('threeOfAKind');
  } else if (rankMaxVal === 2 && rankKeysLen === 3) {
    /// two-pair where 2 of first rank and 2 of second rank and 1 of third rank suit-agnostic
    console.log('twoPair');
  } else if (rankMaxVal === 2 && rankKeysLen === 4) {
    console.log('a pair...');
    /// pair where 2 of first rank and 1 of second rank and 1 of third rank and 1 of fourth rank
    if (rankTally[11] === 2 || rankTally[12] === 2 || rankTally[13] === 2 || rankTally[1] === 2) {
      // jacks-or-better-pair where 2 of first rank is jack, queen, king, ace suit-agnostic
      console.log('jacksOrBetter');
      // console.log(rankTally);
    } else {
      // any worse than jacks pair
      console.log('worse than jacks...');
      // console.log(rankTally);
    }
  } else {
    console.log('something else...');
    // console.log(rankTally);
  }
};

const allConsecutives = (arr) => arr.every((num, i) => (arr[i + 1] || num + 1) - num === 1);

const checkForStraightsAndFlushHands = (hand) => {
  const suitTally = makeSuitTally(hand);
  // console.log(suitTally);

  const rankTally = makeRankTally(hand);
  // console.log(rankTally);

  const suitMaxVal = deriveMaxValue(suitTally);
  // console.log(suitMaxVal);

  const rankMaxVal = deriveMaxValue(rankTally);
  // console.log(rankMaxVal);

  const ranks = Object.keys(rankTally);
  // console.log(ranks);

  ranks.forEach((item, i) => {
    ranks[i] = Number(item);
  });

  ranks.sort((a, b) => a - b);

  // console.log(ranks);

  // 5 of the same suit
  if (suitMaxVal === 5) {
    console.log('all of the same suit...');
    // eslint-disable-next-line max-len
    if (ranks[0] === 1 && ranks[1] === 10 && ranks[2] === 11 && ranks[3] === 12 && ranks[4] === 13) {
      // royal-flush 5 of the same suit and A K Q J 10
      console.log('royalFlush');
    } else if (allConsecutives(ranks)) {
      // straight-flush 5 of the same suit and consecutive ranks
      console.log('straightFlush');
    } else {
      // flush 5 of the same suit and not consecutive ranks
      console.log('flush');
    }
  } else {
    console.log('not all of the same suit...');
    if (allConsecutives(ranks) && rankMaxVal === 1) {
      // straight 5 consecutive ranks and not all of the same suit
      console.log('straight');
    } else {
      console.log('something else...');
    }
  }
};

const checkForAllHands = (hand) => {
  checkForStraightsAndFlushHands(hand);
  checkForSuitAgnosticHands(hand);
};

const makeTestCards = (cardSuit, cardRank) => {
  const card = {
    suit: cardSuit,
    rank: cardRank,
  };
  playerHand.push(card);
};

/// bet -> dealOne -> toggle -> dealTwo -> calc // bet calc -> bet -> circular logic

/// payout function to-do

/// declaring win status to-do

/// dont forget instructions with tooltps

/// wireframe for mobile

/// follow blue screen video poker model layout
