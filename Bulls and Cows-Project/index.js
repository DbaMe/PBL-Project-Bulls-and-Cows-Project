//! BULLS AND COWS GAME

class Game {
  constructor(name, level) {
    this.name = name; // PLAYERS NAME
    this.number = this.generateNumber(); //GENERATING SECRET NUMBER
    this.guess = ""; // PLAYERS INPUT
    this.level = level; // LEVEL: EASY, MEDIUM, HARD
    this.maxGuess = 16; // FOR LEVELS MEDIUM TO HARD
    this.message = `Hello ${this.name}! Let me tell you about Cows & Bulls game rules. \n You will be guessing 4-digit secret number.\n If the matching digits are in their right positions, they are "BULLS", if in different positions, they are "COWS". \n If you need help, reveal 1 random digit of secret number by typing: "HINT". Good luck! `; // \n New line
    this.reply = [
      "You're AMAZING!",
      `Hooray ${this.name}!`,
      `Boo-ya, ${this.name}!`,
      "Yippee!",
      `${this.name}! Yay!`,
    ];
  }

// EASY GAME
  startNow() {
    if (this.level === "easy") {
      console.log("Level 'EASY' number: ", this.number); // Printing secret number in the console
      while (this.number !== this.guess) {
        // WHILE GUESSED NUMBER IS NOT CORRECT, PRINT GENERATED MESSAGE OR SHOW COWS AND BULLS
        if (this.name === null) break; // Break if pressed 'cancel' without entering the name
        this.guess = prompt(this.message);
        if (this.guess === null) break; // IF GUESS IS NOT A STRING OR PRESSING CANCEL BUTTON TO JUMP OUT 
        if (this.guess.toLowerCase() === "hint") {
          //Making HINT case insensitive
          let cowHint = this.number[Math.floor(Math.random() * 4)];
          this.message = `HINT : number ${cowHint} belongs to the secret number ;)`; // REVEALING 1 digit of a secret number AS A HINT
          continue; // "jumps over" one iteration in the if statement
        }
        let bullsAndCows = this.takeAGuess(this.number, this.guess);
        this.message =
          this.generateMessage(bullsAndCows) +
          "  " +
          this.reply[Math.floor(Math.random() * 4)]; // Generating random cheering up message
      }
      if (this.name !== null) alert(this.message);
    }

    // MEDIUM GAME
    if (this.level === "medium") {
      console.log("Level 'MEDIUM' number: ", this.number);
      let i = 0;
      while (this.number !== this.guess && i < this.maxGuess) {
        // running while limit of Max Guesses will be reached
        if (this.name === null) break;
        i++;
        if (i === this.maxGuess) {
          this.message = "GAME OVER :("; // MAX guesses were reached
          break;
        }
        this.guess = prompt(this.message);
        if (this.guess === null) break;
        if (this.guess.toLowerCase() === "hint") {
          let cowHint = this.number[Math.floor(Math.random() * 4)];
          this.message = `HINT : number ${cowHint} belongs to the secret number ;)`;
          continue;
        }
        let bullsAndCows = this.takeAGuess(this.number, this.guess);
        this.message =
          this.generateMessage(bullsAndCows) +
          "  " +
          this.reply[Math.floor(Math.random() * 4)];
      }
      if (this.name !== null) alert(this.message);
    }

    // HARD GAME
    if (this.level === "hard") {
      this.number = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      console.log("Level 'HARD' number: ", this.number);
      let i = 5; // GIVING 5 LESS GUESSES THAN IN MEDIUM LEVEL
      while (this.number !== this.guess && i < this.maxGuess) {
        if (this.name === null) break;

        i++;
        if (i === this.maxGuess) {
          this.message = "GAME OVER :(";
          break;
        }
        this.guess = prompt(this.message);
        if (this.guess === null) break;
        if (this.guess.toLowerCase() === "hint") {
          let cowHint = this.number[Math.floor(Math.random() * 4)];
          this.message = `HINT : number ${cowHint} belongs to the secret number ;)`;
          continue;
        }
        let bullsAndCows = this.takeAGuess(this.number, this.guess);
        this.message =
          this.generateMessage(bullsAndCows) +
          "  " +
          this.reply[Math.floor(Math.random() * 4)];
      }
      if (this.name !== null) alert(this.message);
    }
  }
  generateNumber() {
    // FOR LEVEL EASY AND MEDIUM
    //Generating random number from 1 -9 with unique digits
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array.slice(0, 4).join(""); // reducing random number to 4 digits
  }
  takeAGuess(num, guess) {
    // counting bulls and cows in object
    let bulls = 0;
    let cows = 0;
    for (let index = 0; index < num.length; index++) {
      if (num[index] === guess[index]) bulls++; //bulls++
      if (num.indexOf(guess[index]) > -1 && num[index] !== guess[index]) cows++; //cows++
    }
    return { bulls, cows };
  }

  generateMessage({ bulls, cows }) {
    let temp = [
      "Try again!",
      `Keep guessing!`,
      "Don't stop! ;)",
      `${this.name} is it too hard?  Type: 'hint' ;)`,
    ];

    if (this.guess.length !== 4)
      return "Insert 4 digit number or type: 'Hint' ;) "; // MUST BE 4 DIGITS

    if (bulls === 4) {
      return `${this.name}, you got 4 BULLS! Congratulations!`; // GAME HAS BEEN WON
    }
    if (bulls === 0 && cows === 0) {
      // printing TEMP (random message if all guessed digits were wrong)
      return temp[Math.floor(Math.random() * temp.length)];
    }
    return `Hint: BULLS : ${bulls}, COWS : ${cows}`;
  }
}

 
