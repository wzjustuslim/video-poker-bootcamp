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

const deductBet = (playerBet) => {
  playerCredits -= playerBet;
  currentBet += playerBet;
};

const selectPayouts = (playerBet) => {
  currentPayouts = fullPayTable[playerBet - 1];
};

const disableBets = (bool) => {
  buttonOne.disabled = bool;
  buttonMax.disabled = bool;
};

const makeBetOne = () => {
  playerHand = [];
  if (currentBet < 5) {
    deductBet(1);
    selectPayouts(currentBet);
    renderTable();
  }
  if (currentBet >= 5) {
    disableBets(true);
  }
  buttonDeal.disabled = false;
};

const makeBetMax = () => {
  playerHand = [];
  if (currentBet < 5) {
    deductBet(5 - currentBet);
    selectPayouts(currentBet);
    renderTable();
  }
  if (currentBet >= 5) {
    disableBets(true);
  }
  buttonDeal.disabled = false;
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

  let handType = '';
  // 5 of the same suit
  if (suitMaxVal === 5) {
    console.log('all of the same suit...');
    // eslint-disable-next-line max-len
    if (ranks[0] === 1 && ranks[1] === 10 && ranks[2] === 11 && ranks[3] === 12 && ranks[4] === 13) {
      // royal-flush 5 of the same suit and A K Q J 10
      console.log('royalFlush');
      handType = 'royalFlush';
    } else if (allConsecutives(ranks)) {
      // straight-flush 5 of the same suit and consecutive ranks
      console.log('straightFlush');
      handType = 'straightFlush';
    } else {
      // flush 5 of the same suit and not consecutive ranks
      console.log('flush');
      handType = 'flush';
    }
  } else {
    console.log('not all of the same suit...');
    if (allConsecutives(ranks) && rankMaxVal === 1) {
      // straight 5 consecutive ranks and not all of the same suit
      console.log('straight');
      handType = 'straight';
    } else {
      console.log('something else... proceeding to next check...');
    }
  }
  return handType;
};

const checkForSuitAgnosticHands = (hand) => {
  const rankTally = makeRankTally(hand);
  // console.log(rankTally);

  const rankMaxVal = deriveMaxValue(rankTally);
  const rankKeysLen = deriveKeysLength(rankTally);

  // console.log(rankMaxVal);
  // console.log(rankKeysLen);

  let handType = '';
  if (rankMaxVal === 4 && rankKeysLen === 2) {
    /// four-of-a-kind where 4 of first rank and 1 of second rank suit-agnostic
    console.log('fourOfAKind');
    handType = 'fourOfAKind';
  } else if (rankMaxVal === 3 && rankKeysLen === 2) {
    /// full-house where 3 of first rank and 2 of second rank suit-agnostic
    console.log('fullHouse');
    handType = 'fullHouse';
  } else if (rankMaxVal === 3 && rankKeysLen === 3) {
    /// three-of-a-kind where 3 of first rank and 1 of second rank and 1 of third rank suit-agnostic
    console.log('threeOfAKind');
    handType = 'threeOfAKind';
  } else if (rankMaxVal === 2 && rankKeysLen === 3) {
    /// two-pair where 2 of first rank and 2 of second rank and 1 of third rank suit-agnostic
    console.log('twoPair');
    handType = 'twoPair';
  } else if (rankMaxVal === 2 && rankKeysLen === 4) {
    console.log('a pair...');
    /// pair where 2 of first rank and 1 of second rank and 1 of third rank and 1 of fourth rank
    if (rankTally[11] === 2 || rankTally[12] === 2 || rankTally[13] === 2 || rankTally[1] === 2) {
      // jacks-or-better-pair where 2 of first rank is jack, queen, king, ace suit-agnostic
      console.log('jacksOrBetter');
      handType = 'jacksOrBetter';
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
  return handType;
};

const checkForAllHands = (hand) => {
  let handType = '';
  handType = checkForStraightsAndFlushHands(hand);
  if (handType.length === 0) {
    handType = checkForSuitAgnosticHands(hand);
  }
  return handType;
};

const makePayout = (key) => {
  let payout = 0;
  currentBet = 0;
  if (key.length !== 0) {
    payout = currentPayouts[key];
  }
  return payout;
};

const calcHandScore = (hand) => {
  const payoutKey = checkForAllHands(hand);
  playerCredits += makePayout(payoutKey);
};

const dealCards = () => {
  if (playerHand.length < 5) {
    disableBets(true);
    drawFive();
    renderCards();
  } else if (playerHand.length === 5) {
    discardAndReplace();
    renderCards();
    calcHandScore(playerHand);
    disableBets(false);
    buttonDeal.disabled = true;
    renderTable();
  }
};

const makeTestCards = (cardSuit, cardRank) => {
  const card = {
    suit: cardSuit,
    rank: cardRank,
    isDiscard: false,
  };
  playerHand.push(card);
};

/// bet -> dealOne -> toggle -> dealTwo -> calc // bet calc -> bet -> circular logic

/// edge cases of running out of cards or credits

/// declaring win status dont forget instructions with tooltps

/// integrate html/css with js assume 16:9 ratio

buttonOne.addEventListener('click', makeBetOne);
buttonMax.addEventListener('click', makeBetMax);
buttonDeal.addEventListener('click', dealCards);
