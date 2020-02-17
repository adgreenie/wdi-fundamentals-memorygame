let cards = [ // had to change 'const' to 'let' to reassign this in shuffleCards()
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

const cardsInPlay = [];

function checkForMatch(){
	if (cardsInPlay[0] === cardsInPlay[1]){
		alert("You found a match!");
	}
	else {
		alert("Sorry, try again.");
		resetBoard();
	}
}

function flipCard(){
	let cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length % 2 === 0){
		checkForMatch();
	}
}

function createBoard(){
	for (let i = 0; i < cards.length; i++){
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

function resetBoard(){
	let boardNode = document.getElementById('game-board');
	while (boardNode.firstChild){
		boardNode.removeChild(boardNode.firstChild);
	}
	while (cardsInPlay.length > 0)
	{
		cardsInPlay.pop();
	}
	createBoard();
}

function shuffleCards(){
	resetBoard();
	const unshuffled = cards;
	const shuffled = [];
	let a, b, c, d;
	a = Math.round(Math.random() * 3); // more likely to be 1 or 2 than 0 or 3, but works for this!
	do {
		b = Math.round(Math.random() * 3);
	} while(b === a)
	do {
		c = Math.round(Math.random() * 3);
	} while(c === a || c === b)
	d = 0;
	while (d === a || d === b || d === c){
		d++;
	}
	const cardOrder = [a, b, c, d];
	for (let i = 0; i < unshuffled.length; i++){
		shuffled.push(unshuffled[cardOrder[i]]);
	}
	cards = shuffled;
}

document.getElementById('resetButton').onclick = resetBoard;
document.getElementById('shuffleButton').onclick = shuffleCards;
createBoard();