// Variable and Constant related to the Main Menu
const repeatPhase =
  "Do you want to play again?<br>Type Yes if yes. If no, just press submit.";
const explainPhase =
  'If you want to review the rule again, you can type "rule explain".';
var checkInput = true;
var userName = "Wait for User";
var winRecord = 0;
var loseRecord = 0;
var gameMode = 0;
var inGame = false;
var winLosePhase = "";
var scorePhase = `You and computer do not have any score yet.`;
var chooseMenu = `Please choose what mode you want to play in the following by typing the corresponding number.<br>1. Normal Mode.<br>2. Korean Rock Paper Scissors<br>After you score 5 point, you will get the secret thrid mode.<br><br>Some Mode may be take a few minutes. You can always type "quit" to get out of the game.`;
var thridModeUnlock = false;

// Variable related to the in-game mode
var checkRepeat = false;
var ruleUnderstanding = false;
var modeMenuCheck = false;
var lastWinner = "No one";
var currentWinner = "No one";
var gameOnCheck = false;

var main = function (input) {
  var mainMenu = `${scorePhase}<br>${winLosePhase}<br><br>${chooseMenu}`;
  //To let user type any things to get info.
  if (checkInput) {
    checkInput = !checkInput;
    return "&#x1F603 Welcome to the Rock Paper Scissors Challenge!<br>Please tell me your name.";
  }

  // Let the user input the User Name in the following game (Will not usable after enter the user name)
  if (userName == "Wait for User") {
    userName = input;
    return `Hello ${userName}!&#128406<br> Are you ready for the challenge of Rock Paper Scissors?&#x1F60E<br><br>${chooseMenu}`;
  }

  input = input.toLowerCase();
  //Quit game heading to the main menu
  if (input == "quit") {
    genGameEndCal();
    inGame = false;
    gameMode = 0;
    checkRepeat = false;
    return "Press submit, heading to the main menu.";
  }

  //Secret Code immediately get 1-9 score.
  if (
    inGame == false &&
    !isNaN(input.substr(3).substring(0, 1)) &&
    input == `win${input.substr(3).substring(0, 1)}score`
  ) {
    winRecord += Number(input.substr(3).substring(0, 1));
    genGameEndCal();
    mainMenu =
      "<span style='font-size:20px;'>Secret code activated, Press Submit.</span>";
  }

  // To choose game mode
  if ((input == 1 || input == 2 || input == 3) && inGame == false) {
    gameMode = input;
    return getGameMode(input);
  }

  // To check if the user is in the game. If yes, keep playing
  if (checkRepeat == false && inGame == true) {
    return getGameMode(input);
  }

  //To Repeat the previous game.
  if (checkRepeat && input == "yes") {
    checkRepeat = false;
    return getGameMode(input);
  }

  //To out of game if the reply isn't Yes
  if (!(checkRepeat && input == "yes")) {
    checkRepeat = false;
    inGame = false;
  }

  //Unlocking the thrid mode when score hit 5
  if (inGame == false && winRecord >= 5 && thridModeUnlock == false) {
    thridModeUnlock = true;
    chooseMenu =
      "Please choose what mode you want to play in the following by typing the corresponding number.<br>1. Normal Mode.<br>2. Korean Rock Paper Scissors<br>3. Hong Kong Version(黑白配)<br><br>Some Mode may be take a few minutes. You can always type 'quit' to get out of the game.";
    return "Congrats&#127881&#127881&#127881, you already have 5 score or more.<br>The third mode Hong Kong Version(黑白配) have been unlock!&#127882&#127882&#127882<br>Please press submit.";
  }
  return mainMenu;
};

//To get in the game
var getGameMode = function (input) {
  inGame = true;
  if (gameMode == 1) {
    return normalMode(input);
  }
  if (gameMode == 2) {
    //Recording the winner last time (will not change value after this line)
    lastWinner = currentWinner;
    return koreanRPS(input);
  }
  //To block user from using thrid mode before they unlock
  if (gameMode == 3 && thridModeUnlock == false) {
    inGame = false;
    return `I know you are cheating!&#x1F620<br>Please come back after 5 score!<br><br>${chooseMenu}`;
  }
  if (gameMode == 3 && thridModeUnlock == true) {
    //Recording the winner last time (will not change value after this line)
    lastWinner = currentWinner;
    return HKRPS(input);
  }
};

//The normal game
var normalMode = function (userHand) {
  var computerHand = getComputerHands();
  if (modeMenuCheck == false) {
    modeMenuCheck = true;
    return `In this mode, you will playing the most common Rock Paper Scissors game.<br>Rock wins scissors;${
      getHandEmo("rock") + getHandEmo("scissors")
    }<br>Scissors wins paper;${
      getHandEmo("scissors") + getHandEmo("paper")
    }<br>Paper wins rock.${
      getHandEmo("paper") + getHandEmo("rock")
    }<br><br>Please choose rock${getHandEmo("rock")}, paper${getHandEmo(
      "paper"
    )}, or scissors${getHandEmo("scissors")}.`;
  }

  // Winning Condition
  if (
    (computerHand == "scissors" && userHand == "rock") ||
    (computerHand == "rock" && userHand == "paper") ||
    (computerHand == "paper" && userHand == "scissors")
  ) {
    winRecord += 1;
    genGameEndCal();
    return `Computer choose ${computerHand}${getHandEmo(
      computerHand
    )}. <br>Your ${userHand}${getHandEmo(
      userHand
    )} win!!<br><br>${scorePhase}<br>${winLosePhase}<br><br>${repeatPhase}`;
  }

  //Losing Condition
  if (
    (computerHand == "rock" && userHand == "scissors") ||
    (computerHand == "paper" && userHand == "rock") ||
    (computerHand == "scissors" && userHand == "paper")
  ) {
    loseRecord += 1;
    genGameEndCal();
    return `Computer choose ${computerHand}${getHandEmo(
      computerHand
    )}.<br>Your ${userHand}${getHandEmo(
      userHand
    )} lose.<br><br>${scorePhase}<br>${winLosePhase}<br><br>${repeatPhase}`;
  }

  // Draw Condition
  if (computerHand == userHand) {
    genGameEndCal();
    return `Computer also choose ${computerHand}${getHandEmo(
      computerHand
    )}. <br><span style='font-size:20px;'>Draw!</span><br><br>${scorePhase}<br>${winLosePhase}<br><br>${repeatPhase}`;
  }

  //return the invaid input phase
  return `I don't understand.&#128534<br>What hand is ${userHand}<br>Please choose "rock","paper" or "scissors"&#128546`;
};

var koreanRPS = function (userHand) {
  var computerHand = getComputerHands();
  var explain = `As always:<br>Rock묵 wins scissors찌;${
    getHandEmo("rock") + getHandEmo("scissors")
  }<br>Scissors찌 wins paper빠;${
    getHandEmo("scissors") + getHandEmo("paper")
  }<br>Paper빠 wins rock묵.${
    getHandEmo("paper") + getHandEmo("rock")
  }<br>However, in this mode, the first round will be just as normal game.<br>After that, the current winner must say 묵${getHandEmo(
    "rock"
  )},찌${getHandEmo("scissors")}or빠${getHandEmo(
    "paper"
  )}in the second round.<br>The game will go on and on until both player have the same hand<br>And the player who wins last time wins the game!`;
  // get into the info before starting the game
  if (modeMenuCheck == false) {
    modeMenuCheck = true;
    return `안녕하세요!&#128583<br>In this mode, you will be playing the Korean Rock Paper Scissors game(묵찌빠).<br>Do you need the rule explaination?<br><br>Type Yes if need. Press submit if don't.`;
  }

  //get into the explaination part whenever the user hit the key word without changing the game process.
  if (userHand == "rule explain") {
    return `${explain}<br><br>${currentWinner} is winning! What hand will you ${shoutOrChoose(
      userName
    )} ?묵${getHandEmo("묵")}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?`;
  }

  if (userHand == "yes" && ruleUnderstanding == false) {
    // get into the explaination part
    ruleUnderstanding = true;
    return (
      explain + "<br><br>Interested? Press submit to play this exciting game!"
    );
  }
  // This is the line where suppose the user understand the game.
  ruleUnderstanding = true;

  //Starting the game
  if (ruleUnderstanding == true && gameOnCheck == false) {
    gameOnCheck = true;
    return `시작합니다!(Let's Start!)
    <br><br>Please choose 묵${getHandEmo("rock")}, 찌${getHandEmo("scissors")}
  , or 빠${getHandEmo(
    "paper"
  )}<br>If you don't know how to type korean, you can just copy and paste.&#128582&#128582<br><br>${explainPhase}`;
  }

  //Inside of the game circle
  if (gameOnCheck == true) {
    //Winning Condition
    if (
      (computerHand == "scissors" && userHand == "묵") ||
      (computerHand == "rock" && userHand == "빠") ||
      (computerHand == "paper" && userHand == "찌")
    ) {
      //Return for no last winner yetF
      if (lastWinner == "No one") {
        currentWinner = userName;
        return `You choose: ${userHand}${getHandEmo(
          userHand
        )}.<br>Computer choose: ${engToKorean(computerHand)}${getHandEmo(
          computerHand
        )}<br><br>You win this round!!&#128518<br><br>What hand will you shout it out?묵${getHandEmo(
          "묵"
        )}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?<br><br>${explainPhase}`;
      }

      currentWinner = userName;
      return `${genKoreanGamePhase(
        userHand,
        computerHand
      )} <br><br>You win this round!!&#128518<br><br>What hand will you shout it out?묵${getHandEmo(
        "묵"
      )}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?<br><br>${explainPhase}`;
    }

    //Losing Condition
    if (
      (computerHand == "rock" && userHand == "찌") ||
      (computerHand == "paper" && userHand == "묵") ||
      (computerHand == "scissors" && userHand == "빠")
    ) {
      if (currentWinner == "No one") {
        //Return for no current winner yet
        currentWinner = "Computer";
        return `You choose: ${userHand}${getHandEmo(
          userHand
        )}.<br>Computer choose: ${engToKorean(computerHand)}${getHandEmo(
          computerHand
        )}<br><br>You lose this round.&#128534<br><br>What hand will you choose?묵${getHandEmo(
          "묵"
        )}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?<br><br>${explainPhase}`;
      }

      currentWinner = "Computer";
      return `${genKoreanGamePhase(
        userHand,
        computerHand
      )}<br><br>You lose this round!!&#128534<br><br>What hand will you choose?묵${getHandEmo(
        "묵"
      )}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?<br><br>${explainPhase}`;
    }

    // Draw Condition with no current winner
    if (computerHand == koreanToEng(userHand) && lastWinner == "No one") {
      return `Computer also choose ${userHand}${getHandEmo(
        userHand
      )}. <br><span style='font-size:20px;'>Draw!</span><br><br>What hand will you choose?묵${getHandEmo(
        "묵"
      )}?찌${getHandEmo("찌")}?빠${getHandEmo("빠")}?<br><br>${explainPhase}`;
    }

    // Draw Condition with player winning
    if (computerHand == koreanToEng(userHand) && lastWinner == userName) {
      winRecord += 1;
      genGameEndCal();
      return `Finally.It's a <span style='font-size:25px;'>Draw!</span><br>And we have a winner! Drum roll please! <br>DADADADADADADADA&#127926&#127926<br><br>The winner is ${userName}.<br>촉하합니다(Congratulations)!&#127881&#127881&#127881<br><br>${scorePhase}<br>${repeatPhase}`;
    }

    // Draw Condition with computer winning
    if (computerHand == koreanToEng(userHand) && lastWinner == "Computer") {
      loseRecord += 1;
      genGameEndCal();
      return `Finally.It's a <span style='font-size:25px;'>Draw!</span><br>And we have a winner! Drum roll please! <br>DADADADADADADADA&#127926&#127926<br><br>The winner is the computer.<br>Oh sorry,다시해봐요. Maybe you will get better luck next time.<br><br>${scorePhase}<br>${repeatPhase}`;
    }

    //return the invaid input phase
    return `Please ${shoutOrChoose(userName)} among "묵"${getHandEmo(
      "rock"
    )},"찌"${getHandEmo("scissors")} or "빠"${getHandEmo(
      "paper"
    )}&#128546<br>If you don't know how to type korean, you can just copy and paste.&#128582&#128582`;
  }
};

var HKRPS = function (userHand) {
  var computerHand = getComputerHands();
  var computerDirection = getComputerDirection();
  var explain = `As always:<br>Rock wins scissors;${
    getHandEmo("rock") + getHandEmo("scissors")
  }<br>Scissors wins paper;${
    getHandEmo("scissors") + getHandEmo("paper")
  }<br>Paper wins rock.${
    getHandEmo("paper") + getHandEmo("rock")
  }<br>First, the players play a normal round while saying 黑白配.<br>Then both player also says 男仔女仔配, with the winner pointing a direction.<br>If the player also look at that direction. The winner wins!<br>If not, it will consider a draw. Then the players repeat the above process until there is a winner.`;
  // get into the info before starting the game
  if (modeMenuCheck == false) {
    modeMenuCheck = true;
    return `你好阿!&#128075&#128075<br>In this mode, you will playing the Hong Kong Version Rock Paper Scissors game(黑白配).<br>Do you need the rule explaination?<br><br>Type Yes if need. Press submit if don't.`;
  }

  //get into the explaination part whenever the user hit the key word without changing the game process.
  if (userHand == "rule explain") {
    return `${explain}<br><br>${currentWinner} is winning!<br>${genChooseHKPhase()}`;
  }

  // get into the explaination part
  if (userHand == "yes" && ruleUnderstanding == false) {
    ruleUnderstanding = true;
    return `${explain}<br><br>Are you ready? Press submit to play this Hong Kong traditional game!`;
  }
  // This is the line where suppose the user understand the game.
  ruleUnderstanding = true;

  //Starting the game
  if (ruleUnderstanding == true && gameOnCheck == false) {
    gameOnCheck = true;
    return `開始啦!(Let's Start!)
    <br><br>Please choose rock${getHandEmo("rock")}, paper${getHandEmo("paper")}
  , or scissors${getHandEmo("scissors")}<br><br>${explainPhase}`;
  }

  //Inside of the game circle
  if (gameOnCheck == true) {
    // Normal Winning Condition
    if (
      ((computerHand == "scissors" && userHand == "rock") ||
        (computerHand == "rock" && userHand == "paper") ||
        (computerHand == "paper" && userHand == "scissors")) &&
      currentWinner == "No one"
    ) {
      currentWinner = userName;
      return `${genPhaseHKHand(
        userHand,
        computerHand
      )}<br>You Win! for now.<br><br> Which direction you want to point to? up${getHandDirEmo(
        "up"
      )}? down${getHandDirEmo("down")}? left${getHandDirEmo(
        "left"
      )}? right${getHandDirEmo("right")}?<br><br>${explainPhase}`;
    }

    //Normal Losing Condition
    if (
      ((computerHand == "rock" && userHand == "scissors") ||
        (computerHand == "paper" && userHand == "rock") ||
        (computerHand == "scissors" && userHand == "paper")) &&
      currentWinner == "No one"
    ) {
      currentWinner = "Computer";
      return `${genPhaseHKHand(
        userHand,
        computerHand
      )}<br>You Lose! for now.<br><br> Which direction you want to look? up${getHeadDirEmo(
        "up"
      )}? down${getHeadDirEmo("down")}? left${getHeadDirEmo(
        "left"
      )}? right${getHeadDirEmo("right")}?<br><br>${explainPhase}`;
    }

    // Normal Draw Condition
    if (computerHand == userHand && currentWinner == "No one") {
      return `Computer also choose ${computerHand}${getHandEmo(
        computerHand
      )}. <br><span style='font-size:20px;'>Draw!</span><br><br>Please choose rock${getHandEmo(
        "rock"
      )}, paper${getHandEmo("paper")}
      , or scissors${getHandEmo("scissors")} agian!<br><br>${explainPhase}`;
    }

    //The direction round.
    //Different Direction
    if (
      (userHand == "up" ||
        userHand == "down" ||
        userHand == "left" ||
        userHand == "right") &&
      userHand != computerDirection &&
      currentWinner != "No one"
    ) {
      currentWinner = "No one";
      return `${genPhaseHKDir(
        userHand,
        computerDirection
      )}<br>Oh! The direction is not the same.<br><br>Please choose rock${getHandEmo(
        "rock"
      )}, paper${getHandEmo("paper")}
      , or scissors${getHandEmo("scissors")} agian!<br><br>${explainPhase}`;
    }

    //Same direction with user winning
    if (computerDirection == userHand && currentWinner == userName) {
      winRecord += 1;
      genGameEndCal();
      return `${genPhaseHKDir(
        userHand,
        computerDirection
      )}<br>You Win! 恭喜你阿!&#127881&#127881<br><br>${scorePhase}<br>${repeatPhase}`;
    }

    //Same direction with user losing
    if (computerDirection == userHand && currentWinner == "Computer") {
      loseRecord += 1;
      genGameEndCal();
      return `${genPhaseHKDir(
        userHand,
        computerDirection
      )}<br>You Lose! 真係可惜!<br><br>${scorePhase}<br>${repeatPhase}`;
    }

    //
    if (currentWinner != "No one") {
      return `我唔係好明(I don't understand).&#128534<br>What Direction is ${userHand}<br>Please choose "up","down","left" or "right"&#128546`;
    }
    //return the invaid input phase for Hand
    return `我唔係好明(I don't understand).&#128534<br>What Hand is ${userHand}<br>Please choose "rock","paper" or "scissors"&#128546`;
  }
};

//To generate the emoji of the hand
var getHandEmo = function (hand) {
  if (hand == "rock" || hand == "묵") {
    return "&#9994";
  }
  if (hand == "scissors" || hand == "찌") {
    return "&#9996";
  }
  if (hand == "paper" || hand == "빠") {
    return "&#9995";
  }
};

//To generate the emoji of the direction(Hand)
var getHandDirEmo = function (dir) {
  if (dir == "up") {
    return "&#128070";
  }
  if (dir == "down") {
    return "&#128071";
  }
  if (dir == "left") {
    return "&#128072";
  }
  if (dir == "right") {
    return "&#128073";
  }
};

//To generate the emoji of the direction(Head)
var getHeadDirEmo = function (dir) {
  if (dir == "up") {
    return "&#9195";
  }
  if (dir == "down") {
    return "&#9196";
  }
  if (dir == "left") {
    return "&#9194";
  }
  if (dir == "right") {
    return "&#9193";
  }
};

//generate the hand of korean from english
var engToKorean = function (hand) {
  if (hand == "rock") {
    return "묵";
  }
  if (hand == "scissors") {
    return "찌";
  }
  if (hand == "paper") {
    return "빠";
  }
};

//generate the hand of english from Korean
var koreanToEng = function (hand) {
  if (hand == "묵") {
    return "rock";
  }
  if (hand == "찌") {
    return "scissors";
  }
  if (hand == "빠") {
    return "paper";
  }
};

//generate shout/choose
var shoutOrChoose = function (who) {
  if (
    (lastWinner == userName && who == userName) ||
    (lastWinner == "Computer" && who == "Computer")
  ) {
    return "SHOUT";
  }

  return "choose";
};

//To make the player relate to the Hand/Direction
var playerHand = function (who, user, computer) {
  if (who == "Computer") {
    return computer;
  }
  if (who == userName) {
    return user;
  }
};

//determind who loseing
var detLose = function (winner) {
  if (winner == "Computer") {
    return userName;
  }
  if (winner == userName) {
    return "Computer";
  }
};

//generate Korean game current winning/losing phase
var genKoreanGamePhase = function (userHand, computerHand) {
  return `${lastWinner} SHOUT:${playerHand(
    lastWinner,
    userHand,
    engToKorean(computerHand)
  )}!${getHandEmo(playerHand(lastWinner, userHand, computerHand))}
      <br>${detLose(lastWinner)} choose:${playerHand(
    detLose(lastWinner),
    userHand,
    engToKorean(computerHand)
  )}${getHandEmo(playerHand(detLose(lastWinner), userHand, computerHand))}`;
};

//generate phase for Hong Kong Version game normal rounud result
var genPhaseHKHand = function (userHand, computerHand) {
  return `You and Computer: 黑白配!<br>You choose ${userHand}${getHandEmo(
    userHand
  )}<br>Computer choose ${computerHand}${getHandEmo(computerHand)}`;
};

//generate phase for Hong Kong Version Direction round result
var genPhaseHKDir = function (userHand, computerDirection) {
  return `You and Computer: 男仔女仔配!<br>${lastWinner} point ${playerHand(
    lastWinner,
    userHand,
    computerDirection
  )}${getHandDirEmo(
    playerHand(lastWinner, userHand, computerDirection)
  )}<br>${detLose(lastWinner)} look ${playerHand(
    detLose(lastWinner),
    userHand,
    computerDirection
  )}${getHeadDirEmo(
    playerHand(detLose(lastWinner), userHand, computerDirection)
  )}`;
};

var genChooseHKPhase = function () {
  if (lastWinner != "No one") {
    return `Please choose Please choose "up","down","left" or "right"&#128582`;
  }
  return `Please choose "rock","paper" or "scissors"&#128582`;
};

//To generate the Computer hand
var getComputerHands = function () {
  var randomNumber = Math.random() * 3;
  var computerHandsNumber = Math.floor(randomNumber);
  if (computerHandsNumber == 0) {
    return "rock";
  }
  if (computerHandsNumber == 1) {
    return "paper";
  }
  if (computerHandsNumber == 2) {
    return "scissors";
  }
};

//To generate the Computer Direction
var getComputerDirection = function () {
  var randomNumber = Math.random() * 4;
  var computerDirNumber = Math.floor(randomNumber);
  if (computerDirNumber == 0) {
    return "up";
  }
  if (computerDirNumber == 1) {
    return "down";
  }
  if (computerDirNumber == 2) {
    return "left";
  }
  if (computerDirNumber == 3) {
    return "right";
  }
};

//gen phase for win/lose , ask for repeat and reset the in-game checking component
var genGameEndCal = function () {
  if (winRecord > loseRecord) {
    winLosePhase = `Congrats! Keep on going!!!&#128293&#128293&#128293`;
  }
  if (winRecord < loseRecord) {
    winLosePhase = `Keep fighting!&#128170 You can win this!`;
  }
  if (winRecord == loseRecord) {
    winLosePhase = "Ohhhhh!&#128562 Who will gets the next score?";
  }
  scorePhase = `Now you have ${winRecord} scores.<br>Computer have ${loseRecord} scores.`;
  checkRepeat = true;
  modeMenuCheck = false;
  gameOnCheck = false;
  currentWinner = "No one";
  ruleUnderstanding = false;
};
