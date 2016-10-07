///purpose: Create battleship game, user gets 25 turns to hit random 5 targets within a 10x10 board.
//signature: array, for loop, functions
//example: user clicks square-- square turns red if target hit, yellow if missed.
var board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var SHIP = 1;
var HIT = 0;
var MISS = 0;
var torpedosUsed = 0;
var torpedosLeft = 25;
var shipsCreated = 0;

// Size of the ships that will be placed on board.
var fleet = [5,4,4,3,3,2,2,1];

$(document).ready(function() {

  makeBoard();

  makeShips();

  // TODO: user clicks on a square
  // TODO: square changes color based on presence/absence of ship

  // Play game
  $("td").on("click", function() {   // if user clicks board space function runs
    // console.log("\n")

     // if we find a ship
     var clickedOn = $(this).attr("id"); // 56

     var clickedOnRow = clickedOn.charAt(0); // 5
     var clickedOnCol = clickedOn.charAt(1); // 6

     console.log("clicked on :" + clickedOn);
     console.log("clicked on row:" + clickedOnRow);
     console.log("clicked on column:" + clickedOnCol);

    // check for ship
    // if (HIT === 5){
      if (board[clickedOnRow][clickedOnCol] == 1) {
        // show ship
        $(this).text("🚢");
        HIT++;
        $("h3").text("HIT " + HIT);
      } else {
        // or show boom
        $(this).addClass("boom");
        MISS++;
        $("h4").text("MISS " + MISS);  // adding class to board space that user clicked
      }

     $(this).off();    //cannot re bomb a used board space
      torpedosUsed++;
      torpedosLeft--;      //counting torpedos that user has used
      console.log(torpedosUsed + " torpedos fired");
      // $("h2").text(torpedosUsed + " torpedos fired");
      $("h2").text(torpedosLeft + " torpedos left");
      ifWin();

      ifLose();

    });
  });



  // Add five random ships to our board
  function makeShips() {

    for (i = 0; i < 9; i++) {

      // Generate random ship position
      var row = Math.floor(Math.random() * 10);    // randomly generate row location within 0 - 09
      var col = Math.floor(Math.random() * 10);   // randomly generate col location within 0 - 09

      // Check if position already has ship
      if (board[row][col] != SHIP) {

        // Check radar if other ships are nearby
        // if (noShipsNearby(row,col)) {

        // Create ship if the coast is clear // getting ship size from fleet array
        makeShip(fleet[i], row, col);

      }

    }


  }

function makeShip(shipSize, row, col) {   // takes in argument for ship size

  var shipReport = "ship created at: ";

  // Make ship at block one
  board[row][col] = SHIP;
  shipReport = shipReport + row + col;

  while (shipSize > 1) { //
    col++;
    shipSize--;

    if (col < 10) {     // make sure ship does not go off board
      board[row][col] = SHIP;
      shipReport = shipReport + "-" + row + col;
    }

  }

  console.log(shipReport);
  shipsCreated++;

}

function noShipsNearby(row,col) {

  console.log("\n\ncheck radar for " + row + col);

  // Track number of ships nearby
  var radar = 0;

  // Set radar radius to 1 position away from current position
  var potentialRows = [row - 1, row, row + 1];
  var potentialCols = [col - 1, col, col + 1];

  // Ignore radar values less than 0 and greater than 9
  var potentialRows = potentialRows.filter(function(x){
    if (x > -1 && x < 10) {
      return x;
    }
  });
  var potentialCols = potentialCols.filter(function(x){
    if (x > -1 && x < 10) {
      return x;
    }
  });

  // Check all valid radar positions for ships
  for (i = 0; i < potentialRows.length; i++) {
    row = potentialRows[i];
    for (j = 0; j < potentialCols.length; j++) {
      col = potentialCols[j];
      console.log("\nchecking for ship at " + row + col);
      if (board[row][col] == SHIP) {
        console.log("ship found. try again!");
        radar++;
      }
    }
  }

  // If no ships are nearby
  if (radar == 0) {

    return true;

  // If ships are nearby
  } else {

    return false;

  }

}


// Make gameboard
function makeBoard() {
  html="";

  for(row = 0; row < 10; row ++){      // make rows

    html= html+ "<tr>";    //when called adds row each time

    for(column = 0; column < 10; column++){
      html=html + '<td id="' + row + column + '"> </td>';     ///makes 10 spaces for each row
    }

    html= html + "</tr>";  //ends row
  }
  $("table").append(html); //prints out board to user

};
// TODO: check for presence/absence of ship in a square, use this function up in controller (kind of like didWin in tic tac toe)
// function shipChecker() {
//   var col;
//   var row;
//   if (board[col][row] === 1) {
//     t
//     console.log(board[col][row])

//
//   };

// };
function findShips(){
  for( var row = 0; row < 10; row++){
    for (var col = 0; col < 10; col++) {
      if (board[row][col] == SHIP) {
        $("#"+row+col).addClass("showShips")
      }
    }
  }
}

function ifWin() {
  if (HIT === 5) {
    $("h1").text(" YOU SUNK ALL THE BATTLESHIPS, YOU WIN!")
    $("td").off("click");
    findShips();
  }
}

function ifLose() {
  if ( torpedosUsed=== 25) {
    $("h1").text(" YOU HAVE USED ALL OF YOUR TORPEDOS.  YOU LOSE !!!!!!")
    $("td").off("click");
    findShips();
  }
}
