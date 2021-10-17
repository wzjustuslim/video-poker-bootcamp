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
buttonContainer.classList.add('button-contaner');
gameContainer.appendChild(buttonContainer);
