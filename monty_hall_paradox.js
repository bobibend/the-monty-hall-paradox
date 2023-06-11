
/************************** GAME JS *************************/


let gameA = Math.floor(Math.random() * 3);
let gameB = Math.floor(Math.random() * 3);
let gameC = Math.floor(Math.random() * 3);
let gameAuto = 0;
let gameGoat = 0;
let buttonsSounds = document.getElementById("buttonsSound");

/* Ez tetszőlegesen kiosztja az ajtók között a nyereményt*/

function randomPrize() {

while (gameB == gameA) {
    gameB = Math.floor(Math.random() * 3);
};

while (gameC == gameB || gameC == gameA) {
   gameC = Math.floor(Math.random() * 3);
};
  
 /* if (gameA == 0 || gameA == 1) {
     console.log('kecske'); */

console.log(gameA + ' -- ' + gameB + ' -- ' + gameC + ' --');

};

/* Ez egyeztetni az ajtó színét a nyereménnyel 2=autó*/

let gamePrizeDoor = undefined;

function gamePrize() {
  if (gameA == 2) {
    gamePrizeDoor = 'kék';
  }
  else if (gameB == 2) {
    gamePrizeDoor = 'sárga';
  }
  else {
    gamePrizeDoor = 'piros';
  }
  console.log('A nyeremény ' + gamePrizeDoor + ' alatt van.');

  return gamePrizeDoor;
}

    
   /* if (A == 0 || A == 1) {
       console.log('kecske'); */
  
/* Ezzel meghívom a randomPrize és a gamePrize függvényeket, és 
ezzel elindítom a játékot */

$(document).on('click','#yesButton1',function() {
    buttonsSound.play();
    randomPrize();
    gamePrize();
    console.log("hüle " + gamePrizeDoor);
    $("#yesButton1Container").hide(500);
  });

/* Name input*/

$(document).on('keyup','.name',function(){
    $(".nameSpan").text($(".name").val()+ '!');
  });

/* First choice */
/* Ezzel a játékos kiválaszt egy ajtót 
és ezzel frissítem a #gameFirstCoice elem tartalmát */

function gameFirstChoiceTextBlue() {
  $("#gameFirstChoice").text($("#blueDoorButton").text());
  gameFirstChoice = document.getElementById("gameFirstChoice").innerHTML;
  console.log(gameFirstChoice + " ajtót választottad először.");
}

  $(document).on('click','#blueDoorButton',function() {
    buttonsSound.play();
    gameFirstChoiceTextBlue();
    $(".coloredDoorsContainer").hide(500);
    });

function gameFirstChoiceTextYellow() {
  $("#gameFirstChoice").text($("#yellowDoorButton").text());
  gameFirstChoice = document.getElementById("gameFirstChoice").innerHTML;
  console.log(gameFirstChoice + " ajtót választottad először.");
}

  $(document).on('click','#yellowDoorButton',function() {
    buttonsSound.play();
    gameFirstChoiceTextYellow();
    $(".coloredDoorsContainer").hide(500);
  });

function gameFirstChoiceTextRed() {
  $("#gameFirstChoice").text($("#redDoorButton").text());
  gameFirstChoice = document.getElementById("gameFirstChoice").innerHTML;
  console.log(gameFirstChoice + " ajtót választottad először.");
}

  $(document).on('click','#redDoorButton',function() {
    buttonsSound.play();
    gameFirstChoiceTextRed();
    $(".coloredDoorsContainer").hide(500);
  });


/* Show Goat*/
/* Ezzel a program kiválaszt egy ajtót, ami mögött egy kecske van
és frissíti a #gameShowGoat elemet az ajtó színével */
/* var gamePrizeDoorGlobal = gamePrizeDoor;*/
/* var gameFirstChoiceGlobal = gameFirstChoice; */

let gameShowGoat = undefined;

function randomGoatFunction () {
  function randomGoat1(goatDoors1) { 
    return goatDoors1[Math.floor(Math.random()*goatDoors1.length)];    
  };
  
  let goatDoors1 = ["kék","sárga","piros"];
  
  randomGoat1(goatDoors1);
  
  gameShowGoat = gamePrizeDoor;
  
  while(gamePrizeDoor == gameShowGoat || gameShowGoat == gameFirstChoice) {
    
    gameShowGoat = randomGoat1(goatDoors1);
      
  };

  return gameShowGoat;
  
};
  


$(document).on('click','#yesButton2',function() {
    buttonsSound.play();
    randomGoatFunction();
    $("#gameShowGoatID").text(gameShowGoat);
    switch (gameShowGoat) {
      case "kék":
        $("#blueGoat").css("display","block").show(5000);
        break;
      case "sárga":
        $("#yellowGoat").css("display","block").show(5000);
        break;
      case "piros":
        $("#redGoat").css("display","block").show(5000);
        break;
    }
    console.log(gamePrizeDoor + " ez a gameprizedoor");
    console.log(gameFirstChoice + " ez a gamefirstchoice");
    console.log(gameShowGoat + " ez a gameshowgoat");
  });


/* Ez a szekció lehetőséget ad arra, hogy a játékos a másik ajtót válassza. 
Először szöveg szerint említi, aztán pedig a gombbal választható is. */


let gameSecondChoice = undefined;

function gameDoorChange () {
  function gameNewDoor(gameNewDoorList) { 
    return gameNewDoorList[Math.floor(Math.random()*gameNewDoorList.length)];    
  };
  
  var gameNewDoorList = ["kék","sárga","piros"];
  
  gameNewDoor(gameNewDoorList);
  
   gameSecondChoice = gameShowGoat;
  
  while(gameSecondChoice == gameShowGoat || gameSecondChoice == gameFirstChoice) {
    
    gameSecondChoice = gameNewDoor(gameNewDoorList);
      
  };

  return gameSecondChoice;
  
};

$(document).on('click','#yesButton3',function() {
    buttonsSound.play();
    gameDoorChange();
    $('.secondChoice').text(gameSecondChoice);
    console.log(gameSecondChoice + " ez a gamesecondchoice");
  });

/* Ez a programrész az utolsó döntés (váltás/maradás) megadását kezeli. */
let gameFinalDoor = undefined;


$(document).on('click','#change',function() {
    buttonsSound.play();
    gameFinalDoor = gameSecondChoice;
    console.log(gameFinalDoor + " amit választottam");
    $("#myFinalChoice").text("Ön tehát egy új ajtót választott. Nézzük meg, sikerrel járt-e!");
    $(".finalChoiceContainer").hide(500);
    $("#myFinalChoice").css("display","block");
    return gameFinalDoor; 
  });

$(document).on('click','#stay',function() {
    buttonsSound.play();
    gameFinalDoor = gameFirstChoice;
    console.log(gameFinalDoor + " amit választottam");  
    $("#myFinalChoice").text("Ön tehát kitart az első választása mellett, de vajon jól döntött-e?");
    $(".finalChoiceContainer").hide(500);
    $("#myFinalChoice").css("display","block");
    return gameFinalDoor
  });

$(document).on('click','#yesButton4',function() {
    buttonsSound.play();
    if (gameFinalDoor == gamePrizeDoor) {
      $("#winText").css("display","block")
    }else {
      $("#lostText").css("display","block")
    };
  });

                            /* EXPLANATION */
/* Ez a rész megjeleníti a tippekhez tartozó szöveget*/
$(document).on('click','#sixtySix',function() {
    buttonsSound.play();
    $("#correctText").css("display","block");
    $(".percentNumberContainer").hide(750);
    });
    $(".thirtyThreefifty").click(function() {
    buttonsSound.play();
    $("#wrongText").css("display","block");
    $(".percentNumberContainer").hide(750);
  });


                        /* SIMULATOR */


/* A programrész az ajtóválasztó gombot működteti és a START gombhoz rendel
egy hangfájlt */

var slotGameAudio = document.getElementById("slotGameAudio");

var checkBoxColor = "rgb(113, 174, 225)";

function getSlidersColor () {
  var checkBox = document.querySelector(".slider");
  checkBoxColor = window.getComputedStyle(checkBox).getPropertyValue("background-color");
}

$(document).on('click','.slider',function(){
  getSlidersColor ();
  console.log(checkBoxColor);
});

$(document).on('click','#simulatorStartButton',function(){
  slotGameAudio.play();
  simulator(checkBoxColor);
});


/* A programrész először kiosztja az ajtók mögötti nyereményeket.
0= kecske, 1= kecske 2= autó */
if (counter > 200) {
  alert("Maximum 200 kört állíts be!");
  counter = 0;
}

function simulator (color) {

var A = Math.floor(Math.random() * 3);
var B = Math.floor(Math.random() * 3);
var C = Math.floor(Math.random() * 3);
var auto = 0;
var goat = 0;
var counter = $("#gameCount").val();
var slotGameAudio = $("#slotGameAudio")

if (counter > 200) {
  alert("Írj kevesebb kört!");
  counter = 0;
}

for (var game = 0; game < counter; game++) {

function randomPrize() {

while (B == A) {
    B = Math.floor(Math.random() * 3);
}

while (C == B || C==A) {
    C = Math.floor(Math.random() * 3);
}
  
 /* if (A == 0 || A == 1) {
     console.log('kecske'); */

console.log(A + ' -- ' + B + ' -- ' + C + ' --');
  
}

randomPrize();


/* Ez a funkció azt jelzi ki betűvel, hogy melyik ajtó alatt van a nyeremény*/


function prize() {
  if (A == 2) {
    var prizeDoor = 'A';
  }
  else if (B == 2) {
    var prizeDoor = 'B';
  }
  else {
    var prizeDoor = 'C';
  }
  console.log('A nyeremény ' + prizeDoor + ' alatt van.')
  return prizeDoor;
}

let prizeDoorGlobal = prize();


/* A programrész kiválaszt egy ajtót. */


function doorChoice(length) {
    var door           = '';
    var characters       = 'ABC';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        door = characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return door;
}
var firstChoice = doorChoice(1);
console.log('A játékos választása: ' + firstChoice);

/* Ez a kódsor megmutat egy ajtót, ami mögött egy kecske van. */

var showGoat = prizeDoorGlobal;

while(prizeDoorGlobal == showGoat || showGoat == firstChoice) {
  
  showGoat = doorChoice(1);
    
}

console.log(showGoat + ' ajtó mögött egy kecske van.');

/*Ez a kódblokk csak kísérleti switch, de ha működik, benne fog maradni*/

switch (color) {
  case "rgb(231, 12, 12)":
    if (firstChoice == prizeDoorGlobal) {
      auto++;
      console.log('Gratulálunk, nyertél egy autót!');
      } else {
      goat++;
      console.log('Sajnáljuk, vesztettél. Most kifogott rajtad a Monty Hall paradoxon.');
    };
  break;
  default:
    var secondChoice = firstChoice;
    while(secondChoice == firstChoice || secondChoice == showGoat) {
      secondChoice = doorChoice(1);
    }

    console.log('A második választásom: ' + secondChoice + ' ajtó.');

    if (secondChoice == prizeDoorGlobal) {
      auto++;
      console.log('Gratulálunk, nyertél egy autót!');
      } else {
      goat++;
      console.log('Sajnáljuk, vesztettél. Most kifogott rajtad a Monty Hall paradoxon.');
    };
};
  

/* A programblokk kiírja, hogy hány autót és hány kecskét nyertem. */
}
console.log(game + ' játékból ' + auto + ' autót nyertem.');
console.log(game + ' játékból ' + goat + ' kecskét nyertem.');

var carColumn = document.getElementById("autoDiagram");
carColumn.style.height = auto/counter*100 + '%';
$("#autoDiagram").text(auto);
var goatColumn = document.getElementById("goatDiagram");
goatColumn.style.height = goat/counter*100 + '%';
$("#goatDiagram").text(goat);

}



