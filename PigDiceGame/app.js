/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, RoundScore, activePlayer,lastDice, target, gameActive;
// Function to Initialize variables.
initializeVariables(); 

function initializeVariables(){
 scores= [0,0];
 RoundScore=0;
 activePlayer=0;
 target=0; 
 gameActive=true; 

// hide both dices on loading
 document.querySelectorAll('.dice').forEach(element => 
                                    { element.style.display='none'});   

 // to reset the global scores for both players                                                
 document.querySelectorAll('.player-score').forEach(element => {            
                                                 element.textContent='0'});

// to reset the current scores for both players
document.querySelectorAll('.player-current-score').forEach(element => {           
                                                    element.textContent='0'});
// Reset the names of Players                                                    
document.getElementById('name-0').value='Player 1';  
document.getElementById('name-1').value='Player 2';  

// Reset the properties of both panels
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

//Reset button to get enabled
document.querySelector('.btn-roll').classList.remove('disabled');
document.querySelector('.btn-hold').classList.remove('disabled');
}

function ChangePlayer(){

document.getElementById('current-'+ activePlayer).textContent = '0'; 

//Toggle the active class
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.add('active');

    if (activePlayer == 0)
        activePlayer=1; 
    else
        activePlayer=0;
    RoundScore=0;    
}

//Function when the user clicks on Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameActive){
     var dice_One = Math.floor(Math.random() * 6) + 1;
     var dice_Two = Math.floor(Math.random() * 6) + 1;
    
     // Display both dices
    document.querySelectorAll('.dice').forEach(element => {element.style.display ='block'});
    
    // Display the dynamic images of dices
    document.getElementById('dice-1').src = 'dice-'+ dice_One+'.png';
    document.getElementById('dice-2').src = 'dice-'+ dice_Two +'.png';

    // If any of the dice has a value of one, score should be zero
   
    if (dice_One !== 1 && dice_Two !== 1) {
        RoundScore += dice_One + dice_Two;
        document.getElementById('current-'+ activePlayer).textContent = RoundScore;
}     

else
ChangePlayer();
}

   /* 
   Scenario where after one occurence of six, another six comes 
   if (lastDice===6 && dice===6){
        scores[activePlayer]=0;
        document.getElementById('current-'+ activePlayer).textContent = '0';
    }     
        else if (dice !== 1) {
                RoundScore += dice;
                document.getElementById('current-'+ activePlayer).textContent = RoundScore;
        }     
    else{
        document.getElementById('current-'+ activePlayer).textContent = '0'; 
        ChangePlayer();
    } */
});

//Function when a user clicks on hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += RoundScore;
    document.getElementById('score-' + activePlayer).textContent=scores[activePlayer];
       
 target = document.querySelector('.trgvalue').value;
if(target > 0) {
    if(scores[activePlayer]>= target){
        var WinnerName= document.getElementById('name-' + activePlayer).value;
        document.getElementById('name-' + activePlayer).value='Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gameActive=false;   
    }
    else
        ChangePlayer();
}
else{
    initializeVariables();
    window.alert("Please set a target to play!");
}
});

//Function when a user clicks on New Game Button.
document.querySelector('.btn-new').addEventListener('click',initializeVariables);



/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one)*/