var figlet = require('figlet');

console.log(figlet.textSync('HangMan!', {
  font: 'Ghost',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}));

//import module for input, seems to be the best way to recieve input for this method.
const readlineSync = require('readline-sync')
//first i need words
let words = ['snoopdogg', 'jcole', 'logic', 'eminem', 'drake']; 
//then i needed a random word select function
const getRandomWord = (words) => {
  let randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex] 
}
//loop to transoform array into astrics*
const createHiddenWord = (word) => {
  let hiddenWord = []
  for(let i = 0; i < word.length; i++ ) {
    hiddenWord.push('*')
  }
  return hiddenWord
}

const isLetterInWord = (letter, word) => {//check if letter is in word
  return word.includes(letter)
}
//after i have the feedback going now i need to replace * with letter, was hardest for me. looked for loop methods to replace arrays if match.
const replaceMatches = (letter, randomWord, hiddenWord) => {
  for (let i = 0; i < randomWord.length; i ++){
    let crrChar = randomWord[i];
    if(crrChar === letter) {
      hiddenWord[i] = letter;
    } 
  }
  return hiddenWord;
}

//  then i added a function to start the game and join the arrrays into a string 
const startGame = () => {
  //figlet
  
  console.log('guess the rapper');
  
let randomWord = getRandomWord(words);
let hiddenWord = createHiddenWord(randomWord);
//jion array and recieve input

console.log(hiddenWord.join(''));

//okay so now i added lives and a condition 
let lives = 10;
while (lives > 0 &&  hiddenWord.join('') !== randomWord) {
    //recive input and feedback, later i put this code iside the while lives loop, later adding a call for replace function.
  let answer = readlineSync.question('Type Your Guess :') 
  if(answer.match(/[A-Z]/)) {
   answer = answer.toLowerCase();
  }
  if (answer.match(/[a-z]/, 1)){
  
if (isLetterInWord(answer, randomWord)){
  hiddenWord = replaceMatches(answer, randomWord, hiddenWord);
  console.log(hiddenWord.join(''));
} else {
  lives --;
  console.log(`nah, incorrect. you have: ${lives} left`);
}  


} else {
  console.log(`invalid ${lives} lives left`)
} 
}
if (lives == 0){
  console.log("how did you lose with 10 lives");
}
if (hiddenWord.join('') == randomWord){
  console.log("YOU WIN!");
}
}
startGame()

