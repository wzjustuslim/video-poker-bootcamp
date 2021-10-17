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

const buttonOne = document.createElement('button');
buttonOne.classList.add('btn');
buttonOne.innerText = 'BET ONE';
buttonContainer.appendChild(buttonOne);

const buttonMax = document.createElement('button');
buttonMax.classList.add('btn');
buttonMax.innerText = 'BET MAX';
buttonContainer.appendChild(buttonMax);

const buttonDeal = document.createElement('button');
buttonDeal.classList.add('btn');
buttonDeal.innerText = 'DEAL';
buttonDeal.disabled = true;
buttonContainer.appendChild(buttonDeal);

const renderTable = () => {
  tableContainer.innerHTML = '';

  const payoutTable = document.createElement('div');
  payoutTable.classList.add('payout-table');
  tableContainer.appendChild(payoutTable);

  const labelNames = ['ROYAL FLUSH............', 'STRAIGHT FLUSH......', 'FOUR OF A KIND........', 'FULL HOUSE..............', 'FLUSH.........................', 'STRAIGHT...................', 'THREE OF A KIND......', 'TWO PAIR...................', 'JACKS OR BETTER...'];

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
  cardHolder = [];

  for (let i = 0; i < 5; i += 1) {
    const slots = document.createElement('div');
    slots.classList.add('slot');
    cardContainer.appendChild(slots);

    const hold = document.createElement('div');
    hold.classList.add('hold');
    hold.innerText = 'HOLD';
    slots.appendChild(hold);

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
      });
    }
    cardHolder.push(card);
  }
};

renderCards();
