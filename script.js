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
  buttonArray[0].disabled = bool;
  buttonArray[1].disabled = bool;
};

const makeBetOne = () => {
  playerHand = [];
  if (currentBet < 5) {
    betAudio.play();
    deductBet(1);
    selectPayouts(currentBet);
    renderTable();
    currentMsg = 'MAX IT OUT!';
  }
  if (currentBet >= 5) {
    disableBets(true);
    currentMsg = 'HIT DEAL!';
  }
  if (playerCredits < 1) {
    disableBets(true);
  }
  renderInfo();
  buttonArray[2].disabled = false;
};

const makeBetMax = () => {
  playerHand = [];
  if (currentBet < 5) {
    betAudio.play();
    if (playerCredits < 5) {
      deductBet(playerCredits);
    } else {
      deductBet(5 - currentBet);
    }
    selectPayouts(currentBet);
    renderTable();
    currentMsg = 'HIT DEAL!';
    renderInfo();
  }
  if (currentBet >= 5) {
    disableBets(true);
  }
  if (playerCredits < 5) {
    disableBets(true);
  }
  buttonArray[2].disabled = false;
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
      currentMsg = 'ROYAL FLUSH! BET AGAIN?';
      handType = 'royalFlush';
      winAudio.play();
    } else if (allConsecutives(ranks)) {
      // straight-flush 5 of the same suit and consecutive ranks
      currentMsg = 'STRAIGHT FLUSH! BET AGAIN?';
      handType = 'straightFlush';
      winAudio.play();
    } else {
      // flush 5 of the same suit and not consecutive ranks
      currentMsg = 'FLUSH! BET AGAIN?';
      handType = 'flush';
      winAudio.play();
    }
  } else {
    console.log('not all of the same suit...');
    if (allConsecutives(ranks) && rankMaxVal === 1) {
      // straight 5 consecutive ranks and not all of the same suit
      currentMsg = 'STRAIGHT! BET AGAIN?';
      handType = 'straight';
      winAudio.play();
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
    currentMsg = 'FOUR OF A KIND! BET AGAIN?';
    handType = 'fourOfAKind';
    winAudio.play();
  } else if (rankMaxVal === 3 && rankKeysLen === 2) {
    /// full-house where 3 of first rank and 2 of second rank suit-agnostic
    currentMsg = 'FULL HOUSE! BET AGAIN?';
    handType = 'fullHouse';
    winAudio.play();
  } else if (rankMaxVal === 3 && rankKeysLen === 3) {
    /// three-of-a-kind where 3 of first rank and 1 of second rank and 1 of third rank suit-agnostic
    currentMsg = 'THREE OF A KIND! BET AGAIN?';
    handType = 'threeOfAKind';
    winAudio.play();
  } else if (rankMaxVal === 2 && rankKeysLen === 3) {
    /// two-pair where 2 of first rank and 2 of second rank and 1 of third rank suit-agnostic
    currentMsg = 'TWO PAIR! BET AGAIN?';
    handType = 'twoPair';
    winAudio.play();
  } else if (rankMaxVal === 2 && rankKeysLen === 4) {
    // console.log('a pair...');
    /// pair where 2 of first rank and 1 of second rank and 1 of third rank and 1 of fourth rank
    if (rankTally[11] === 2 || rankTally[12] === 2 || rankTally[13] === 2 || rankTally[1] === 2) {
      // jacks-or-better-pair where 2 of first rank is jack, queen, king, ace suit-agnostic
      currentMsg = 'JACKS OR BETTER! BET AGAIN?';
      handType = 'jacksOrBetter';
      winAudio.play();
      // console.log(rankTally);
    } else {
      // any worse than jacks pair
      currentMsg = 'NOT GOOD ENOUGH! BET AGAIN?';
      lousyAudio.play();
      // console.log(rankTally);
    }
  } else {
    currentMsg = 'SORRY! BET AGAIN?';
    lousyAudio.play();
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

const prepareDeck = () => {
  shuffledDeck = shuffleCards(makeDeck());
};

const dealCards = () => {
  if (playerHand.length < 5) {
    dealAudio.play();
    disableBets(true);
    prepareDeck();
    drawFive();
    renderCards();
    currentMsg = 'SELECT CARDS TO HOLD!';
    renderInfo();
  } else if (playerHand.length === 5) {
    discardAndReplace();
    renderCards();
    calcHandScore(playerHand);
    if (playerCredits === 0) {
      currentMsg = 'GAME OVER!';
    }
    if (playerCredits < 5 && playerCredits > 0) {
      buttonArray[0].disabled = false;
    } else if (playerCredits >= 5) {
      disableBets(false);
    }
    renderInfo();
    buttonArray[2].disabled = true;
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

/// integrate html/css with js assume 16:9 ratio

buttonArray[0].addEventListener('click', makeBetOne);
buttonArray[1].addEventListener('click', makeBetMax);
buttonArray[2].addEventListener('click', dealCards);
