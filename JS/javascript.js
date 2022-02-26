function closeCards(cards) {
	cards.forEach(function (card) {
		card.classList.remove("flipped");
	});
}

function allImagesSame(images) {
	let allSame = true;

	images.forEach(function (card) {
		if (card.src != images[0].src) {
			allSame = false;
		}
	});

	return allSame;
}

function hideCards(cards) {
	cards.forEach(function (card) {
		card.classList.add('flipped-hidden');
		card.classList.remove('flipped');
	});

	checkIfWon();
}

function checkCards(pairsCount) {
	let openedCards = document.querySelectorAll('.flipped');
	let openedCardsImages = document.querySelectorAll('.flipped .flip-card-back img');

	if (allImagesSame(openedCardsImages)) {
		if (openedCards.length == pairsCount) {
			setTimeout(function(){
				hideCards(openedCards);
			}, 500);
		}
	} else {
		setTimeout(function(){
			closeCards(openedCards);
		}, 500);
	}
}

// Creates card div:
// <div class="flip-card ">
//   <div class="flip-card-inner">
//     <div class="flip-card-front  ">
//       <img src="IMG/pav0.jpg" alt="React" class="card-game-img">
//     </div>
//     <div class="flip-card-back">
//       <img src="IMG/pav2.jpg" alt="Memory card" class="card-game-img">
//     </div>
//   </div>
// </div>
function createCard(image) {
	let flipCard = document.createElement("div");
	flipCard.classList.add("flip-card");
	flipCard.classList.add("col-3");
	flipCard.classList.add("col-sm-3");
	flipCard.classList.add("col-md-2");
	flipCard.classList.add("col-lg-1");
	flipCard.classList.add("col-xl-1");

	let flipCardInner = document.createElement("div");
	flipCardInner.classList.add("flip-card-inner");

	let flipCardFront = document.createElement("div");
	flipCardFront.classList.add("flip-card-front");

	let flipCardBack = document.createElement("div");
	flipCardBack.classList.add("flip-card-back");

	let imgFront = document.createElement("img");
	imgFront.classList.add("card-game-img");
	imgFront.src = "IMG/pav00.jpg";
	// imgFront.src = image;

	imgFront.alt = "card-back";

	let imgBack = document.createElement("img");
	imgBack.classList.add("card-game-img");
	imgBack.src = image;
	imgBack.alt = "Memory card";

	flipCardBack.appendChild(imgBack);
	flipCardFront.appendChild(imgFront);
	flipCardInner.appendChild(flipCardFront);
	flipCardInner.appendChild(flipCardBack);
	flipCard.appendChild(flipCardInner);
	return flipCard;
}

const images = [
  "IMG/pav01.jpg",
  "IMG/pav02.jpg",
  "IMG/pav03.jpg",
  "IMG/pav04.jpg",
  "IMG/pav05.jpg",
  "IMG/pav06.jpg",
  "IMG/pav07.jpg",
  "IMG/pav08.jpg",
  "IMG/pav09.jpg",
  "IMG/pav10.jpg",
  "IMG/pav11.jpg",
  "IMG/pav12.jpg",
  "IMG/pav13.jpg",
  "IMG/pav14.jpg",
  "IMG/pav15.jpg",
  "IMG/pav16.jpg",
  "IMG/pav17.jpg",
  "IMG/pav18.jpg",
  "IMG/pav19.jpg",
  "IMG/pav20.jpg",
  "IMG/pav21.jpg",
  "IMG/pav22.jpg",
  "IMG/pav23.jpg",
  "IMG/pav24.jpg",
  "IMG/pav25.jpg",
  "IMG/pav26.jpg"
];

function drawCards(number, pairsCount) {
	let mainContainer = document.querySelector('.memory-game');

	let cards = [];

	for (let i = 0; i < number; i++) {
		let img = images[i];
		if (!img) {
			img = images[images.length - 1];
		}

		for (let j = 0; j < pairsCount; j++) {
			let card = createCard(img);
			cards.push(card);
		}
	}

	cards
		.sort(function () {
			return 0.5 - Math.random();
		})
		.forEach(function (card) {
			mainContainer.appendChild(card);
		});

	return cards;
}

function checkIfWon(){
	let leftCards = 0;

	document.querySelectorAll(".flip-card").forEach(function(card){
		if(!card.classList.contains('flipped-hidden')){
			leftCards = leftCards + 1;
		}
	});

	if(leftCards == 0){
		showWin();
		removeCards();
	}
}

function showWin(){
	document.querySelector('.memory-game').classList.add('d-none');
	document.querySelector('.you-win').classList.remove('d-none');
}

function showGame(){
	document.querySelector('.memory-game').classList.remove('d-none');
	document.querySelector('.you-win').classList.add('d-none');
}

function removeCards(){
  document.querySelector(".memory-game").innerHTML = "";
}

function init(cardsNumber, pairsCount) {
	showGame();

	const cards = drawCards(cardsNumber, pairsCount);

	cards.forEach(function (card) {
		card.addEventListener('click', function () {
			this.classList.add("flipped");
			checkCards(pairsCount);
		});
	});
}

document.querySelector('#play-again').addEventListener('click', function(){
	init(24, 2);
});

init(2, 2);
