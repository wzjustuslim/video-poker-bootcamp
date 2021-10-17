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
