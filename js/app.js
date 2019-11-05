	const body= document.querySelector("body");
	let cards;
	let moves=0;
	let gameEnded=false;
	let gameStarted=false;
	let seconds=0;
	let minutes=0;
	let matchingCounter = 0;
	let stars = [...document.getElementsByClassName("fa-star")];
	let toStopInterval;
	let deck = document.querySelector(".deck");


	
function setUpTheGame(){
	seconds=0;
	gameStarted=false;
	moves=0;
	deck = document.querySelector(".deck");
	cards =  [...document.getElementsByClassName("card")];
	stars = [...document.getElementsByClassName("fa-star")];
	matchingCounter = 0;
	// shiffling the cards and then removing the old ones from the deck and
	// adding the new shuffled ones
	cards= shuffle(cards);
	deck.addEventListener("click",clickingCards);
	while(deck.firstChild)
		deck.removeChild(deck.firstChild);
	for(let i=0; i<cards.length; i++)
		deck.appendChild(cards[i]);

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

setUpTheGame();

function endGame(){	
	clearInterval(toStopInterval);
	let starsToPrint="";
	
	for(let i =0; i<5; i++)
		if(stars[i].classList.contains("fa-star"))
			starsToPrint+="*";
	
	let messageText= "You spent "+ parseInt(seconds / 60) + " minutes"+
	" and "+ seconds % 60 +" seconds.\n"+
	"You made "+moves+" moves to match all the cards"
	+"Your star rating is "+starsToPrint+" \n"

   
	const container2 = document.createElement("div");
	container2.classList.add("centered");
	const checkMark = document.createElement("div");
	const congrats = document.createElement("h1");
	congrats.innerText = "Congratulations, You Won!";
	congrats.classList.add("centered");
	const message = document.createElement("div");
	message.innerText=messageText;
	message.classList.add("message");
	const button = document.createElement("button");
	button.innerText="Play again?";
	button.addEventListener("click",function() {
		body.innerHTML="";
		body.innerHTML=`  <div class="container">
        <header>
            <h1>Matching Game</h1>
        </header>

        <section class="score-panel">
        	<ul class="stars">
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        	</ul>

        	<span class="moves">0</span> Moves
			<span id="time">00:00</span>
            <div class="restart" onClick="reset()">
        		<i class="fa fa-repeat"></i>
        	</div>
        </section>

        <ul class="deck">
            <li class="card">
                <i class="fa fa-diamond"></i>
            </li>
            
            <li class="card">
                <i class="fa fa-paper-plane-o"></i>
            </li>
            <li class="card">
                <i class="fa fa-anchor"></i>
            </li>
            <li class="card">
                <i class="fa fa-bolt"></i>
            </li>
            <li class="card">
                <i class="fa fa-cube"></i>
            </li>
            <li class="card">
                <i class="fa fa-anchor"></i>
            </li>
            <li class="card">
                <i class="fa fa-leaf"></i>
            </li>
            <li class="card">
                <i class="fa fa-bicycle"></i>
            </li>
            <li class="card">
                <i class="fa fa-diamond"></i>
            </li>
            <li class="card">
                <i class="fa fa-bomb"></i>
            </li>
            <li class="card">
                <i class="fa fa-leaf"></i>
            </li>
            <li class="card">
                <i class="fa fa-bomb"></i>
            </li>
            <li class="card">
                <i class="fa fa-bolt"></i>
            </li>
            <li class="card">
                <i class="fa fa-bicycle"></i>
            </li>
            <li class="card">
                <i class="fa fa-paper-plane-o"></i>
            </li>
            <li class="card">
                <i class="fa fa-cube"></i>
            </li>
        </ul>
    </div>`;
		setUpTheGame();
		
	});
	body.innerHTML="";
	container2.appendChild(checkMark);
	container2.appendChild(congrats);
	container2.appendChild(message);
	container2.appendChild(button);
	body.appendChild(container2);
}




function reset(){
	clearInterval(toStopInterval);
	gameStarted=false;
	
	const time=document.getElementById("time");
	time.innerHTML = "00:00";
	
	cards=shuffle(cards);
	while(deck.firstChild)
		deck.removeChild(deck.firstChild);
	for(let i=0; i<cards.length; i++)
		deck.appendChild(cards[i]);
	moves=-1;// -1 so that when we call changeMoves it will increase by 1 and
				// make it 0
	
	seconds=0;

	stars[4].classList.add("fa-star");
	stars[3].classList.add("fa-star");
	stars[2].classList.add("fa-star");
	stars[1].classList.add("fa-star");
	stars[0].classList.add("fa-star");

	for(let i=0; i<cards.length; i++)
		{
		cards[i].classList.remove("match","open","show");
		}
	
	changeMoves();
}


// this is for the timer and will be called every 1000ms once the game starts untill it is over 
function timer(){
	if(!gameEnded){
	let secondsString,minutesString;
	++seconds;
	secondsString=stringize(seconds % 60);
	minutesString= stringize(parseInt(seconds / 60));
	const time=document.getElementById("time");
	time.innerHTML = minutesString+":"+secondsString;
	}
}



function stringize(timeInt){
	let timeString = timeInt + "";
	if(timeString.length < 2)
		return "0" + timeString;
	else
		return timeString;
}

//this function just changes the moves tracker and the  star rating
function changeMoves(){
	
	moves++;
	const movesElement=document.getElementsByClassName("moves")
	movesElement[0].innerHTML=moves;// element at 0 is our div that contains the
									// number of moves
	if(moves==28)
		stars[4].classList.remove("fa-star");
	if(moves==35)
		stars[3].classList.remove("fa-star");
	if(moves==40)
		stars[2].classList.remove("fa-star");
	if(moves==48)
		stars[1].classList.remove("fa-star");
	
	
}

let firstCard,secondCard;
let readyForSecondClick=false;
let validForChecking=true;

/* This function will be called every time the " dick " is clicked
 * to handle the click and make the necesary changes or give feedback to the user that he clicked
 * in the wrong place 
 *  */
function clickingCards(event){
	if(!gameStarted)
		{
		gameStarted=true;
		toStopInterval= setInterval(timer, 1000);
		}
	
	let target = event.target;
	if (target.tagName=="LI" || target.tagName=="I" )
		{	if(target.tagName=="I")
				target =target.parentElement;// if only the icon is clicked
												// then we get a refrence to the
												// hall card which is
												// our target
			// checking if the same card has been clicked twice
			if(target.classList.contains("open")&&target.classList.contains("show"))
				{
				target.classList.remove("open","show");
				validForChecking=false;
				firstCard=null;
				readyForSecondClick=false;
				}

			
			// if a matched card is clicked
			if(target.classList.contains("match"))
			{
			validForChecking=false;
			target.classList.add("shake");
			setTimeout( function(){
				target.classList.remove("shake");
			},900);
			}
			
			if(validForChecking)
				changeMoves();
			if(readyForSecondClick && validForChecking)
			{
				readyForSecondClick=false;
				// we show the card and store it in secondCard to compare it
				// with first
				target.classList.toggle("open");
				target.classList.toggle("show");
				secondCard=target;
				
			
				if(checkIfTheSameShape())
					{
					firstCard.classList.remove("open","show");
					secondCard.classList.remove("open","show");
					firstCard.classList.add("match");
					secondCard.classList.add("match");
					matchingCounter++;
					
					if(matchingCounter==8)
						setTimeout(endGame,500);

						
					
					firstCard=null
					secondCard=null;
					readyForSecondClick=false;
					}	
				else 
					{
					setTimeout( function(){
						firstCard.classList.remove("open","show");
						secondCard.classList.remove("open","show");
						firstCard=null
						secondCard=null;
					},600);
					}
				
			}
			else if( validForChecking && !readyForSecondClick ) 
			{
				readyForSecondClick=true;
				// we show the card and store it in firstCard to compare it with
				// secondCard
				firstCard=target;
				target.classList.toggle("open");
				target.classList.toggle("show");
				
			}
			validForChecking=true;
		}	
	// if the deck was clicked but not the cards
	else {
		
		deck.classList.add("shake");
		setTimeout( function(){
			deck.classList.remove("shake");
		},1000);
	}
	
	
}

// This function is called to check if two cards are matching
function checkIfTheSameShape(){
	// to get access to the <i> element which has the class of the (shape)
	const f =firstCard.firstElementChild, s=secondCard.firstElementChild;
 	return f.classList[1]===s.classList[1];
}

