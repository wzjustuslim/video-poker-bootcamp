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

const payoutTable = document.createElement('div');
payoutTable.classList.add('payout-table');
tableContainer.appendChild(payoutTable);

const labelNames = ['ROYAL FLUSH............', 'STRAIGHT FLUSH......', 'FOUR OF A KIND........', 'FULL HOUSE..............', 'FLUSH.........................', 'STRAIGHT...................', 'THREE OF A KIND......', 'TWO PAIR...................', 'JACKS OR BETTER...'];

for (let i = 0; i < 9; i += 1) {
  const row = document.createElement('div');
  row.classList.add('row');
  payoutTable.appendChild(row);
  const currKey = payKeys[i];
  const label = document.createElement('div');
  label.classList.add('label');
  label.innerText = labelNames[i];
  row.appendChild(label);
  for (let j = 0; j < 5; j += 1) {
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerText = fullPayTable[j][currKey];
    row.appendChild(col);
  }
}
