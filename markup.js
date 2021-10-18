const generalContainer = document.createElement('div');
generalContainer.classList.add('general-container');
document.body.appendChild(generalContainer);

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
generalContainer.appendChild(gameContainer);

const tableContainer = document.createElement('div');
tableContainer.classList.add('table-container');
gameContainer.appendChild(tableContainer);

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
gameContainer.appendChild(cardContainer);

const infoContainer = document.createElement('div');
infoContainer.classList.add('info-container');
gameContainer.appendChild(infoContainer);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
gameContainer.appendChild(buttonContainer);

const bgm = new Audio('audio/theStardropSaloon.mp3');
bgm.loop = 'true';

const betAudio = new Audio('audio/purchaseClick.wav');

const dealAudio = new Audio('audio/select.wav');

const holdAudio = new Audio('audio/jingle1.wav');

const lousyAudio = new Audio('audio/cacklingWitch.wav');

const winAudio = new Audio('audio/secret1.wav');

const renderButtons = () => {
  const buttonLabels = ['BET ONE', 'BET MAX', 'DEAL'];

  for (let i = 0; i < 3; i += 1) {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = buttonLabels[i];
    if (i === 2) {
      button.disabled = true;
    }
    buttonContainer.appendChild(button);
    buttonArray.push(button);
  }
};

renderButtons();

const renderTable = () => {
  tableContainer.innerHTML = '';

  const payoutTable = document.createElement('div');
  payoutTable.classList.add('payout-table');
  tableContainer.appendChild(payoutTable);

  const labelNames = ['ROYAL FLUSH ..........', 'STRAIGHT FLUSH .......', 'FOUR OF A KIND .......', 'FULL HOUSE ...........', 'FLUSH ................', 'STRAIGHT .............', 'THREE OF A KIND ......', 'TWO PAIR .............', 'JACKS OR BETTER ......'];

  for (let i = 0; i < payKeys.length; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    payoutTable.appendChild(row);

    const label = document.createElement('div');
    label.classList.add('label');
    label.innerText = labelNames[i];
    row.appendChild(label);

    const currKey = payKeys[i];
    for (let j = 0; j < fullPayTable.length; j += 1) {
      const col = document.createElement('div');
      col.classList.add('col');
      if (currentBet - 1 === j) {
        col.classList.add('red-select');
      }
      col.innerText = fullPayTable[j][currKey];
      row.appendChild(col);
    }
  }
};

renderTable();

const renderCards = () => {
  cardContainer.innerHTML = '';
  holdArray = [];

  for (let i = 0; i < 5; i += 1) {
    const slots = document.createElement('div');
    slots.classList.add('slot');
    cardContainer.appendChild(slots);

    const hold = document.createElement('div');
    hold.classList.add('hold-hide');
    hold.innerText = 'HOLD';
    slots.appendChild(hold);

    holdArray.push(hold);

    const card = document.createElement('div');
    card.classList.add('card');
    slots.appendChild(card);

    const topRank = document.createElement('div');
    topRank.classList.add('top-rank');
    card.appendChild(topRank);

    const suit = document.createElement('div');
    suit.classList.add('suit');
    card.appendChild(suit);

    const bottomRank = document.createElement('div');
    bottomRank.classList.add('bottom-rank');
    card.appendChild(bottomRank);

    if (playerHand.length > 0) {
      topRank.innerText = playerHand[i].displayName;
      suit.innerText = playerHand[i].suitSymbol;
      bottomRank.innerText = playerHand[i].displayName;

      topRank.classList.add(playerHand[i].color);
      suit.classList.add(playerHand[i].color);
      bottomRank.classList.add(playerHand[i].color);

      // eslint-disable-next-line no-loop-func
      card.addEventListener('click', () => {
        console.log(playerHand[i]);
        toggleDiscard(playerHand[i]);
        displayHold(playerHand[i], holdArray[i]);
      });
    }
    cardHolder.push(card);
  }
};

renderCards();

const renderInfo = () => {
  infoContainer.innerHTML = '';

  const iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-container');
  infoContainer.appendChild(iconContainer);

  const cardTipBlock = document.createElement('div');
  cardTipBlock.classList.add('card-tip');
  cardTipBlock.classList.add('tooltip');
  iconContainer.appendChild(cardTipBlock);

  const toolText = document.createElement('span');
  toolText.classList.add('tooltiptext');
  toolText.innerHTML = 'Royal Flush: A K Q J 10 and all of the same suit.<br><br>Straight Flush: Five sequential cards and all of the same suit.<br><br>Four Of A Kind: Four cards of one rank.<br><br>Full House: Three cards of one rank and two of another.<br><br>Flush: Five cards all of the same suit but not in sequence.<br><br>Straight: Five cards in sequence but not of the same suit.<br><br>Three Of A Kind: Three cards of one rank and two of two different ranks.<br><br>Two Pair: Two cards of one rank and two cards of another.<br><br>Jacks Or Better: A pair of J Q K A only.';
  cardTipBlock.appendChild(toolText);

  const playBgmBlock = document.createElement('div');
  playBgmBlock.classList.add('play-bgm');
  iconContainer.appendChild(playBgmBlock);

  const cardTip = document.createElement('i');
  cardTip.classList.add('far');
  cardTip.classList.add('fa-question-circle');
  cardTipBlock.appendChild(cardTip);

  const playBGM = document.createElement('i');
  playBGM.classList.add('fas');
  if (bgm.paused) {
    playBGM.classList.add('fa-volume-mute');
  } else {
    playBGM.classList.add('fa-volume-up');
  }
  playBgmBlock.appendChild(playBGM);

  playBGM.addEventListener('click', () => {
    if (bgm.paused) {
      playBGM.className = '';
      playBGM.classList.add('fas');
      playBGM.classList.add('fa-volume-up');
      bgm.play();
    } else {
      playBGM.className = '';
      playBGM.classList.add('fas');
      playBGM.classList.add('fa-volume-mute');
      bgm.pause();
    }
  });

  const logoContainer = document.createElement('div');
  logoContainer.classList.add('logo-container');
  infoContainer.appendChild(logoContainer);

  const logo = document.createElement('img');
  logo.src = 'images/logo_video-poker.png';
  logo.classList.add('logo');
  logoContainer.appendChild(logo);

  const instruct = document.createElement('div');
  instruct.classList.add('user-info');
  instruct.innerText = `${currentMsg}`;
  infoContainer.appendChild(instruct);

  const bet = document.createElement('div');
  bet.classList.add('bet-info');
  bet.innerText = `BET ${currentBet}`;
  infoContainer.appendChild(bet);

  const credit = document.createElement('div');
  credit.classList.add('credit-info');
  credit.innerText = `CREDIT ${playerCredits}`;
  infoContainer.appendChild(credit);
};

renderInfo();

// cards can be emptied at the end of round
// js doc should be added to functions
// words can flash with interval
// card backing can be made
