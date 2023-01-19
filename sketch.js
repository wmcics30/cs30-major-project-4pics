// 4 Pics 1 Word - CS30 Major Project
// Katharine C
// 2022/23
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 2;
let blankCoordinates = new Map();
let typedLetters = [];
let emptyBlanks = true;
let state = 1;
let level1, level2, level3, level4, board, cellWidth, cellHeight, lineSize, blankAt, keyWord, help;
let logo, lvl1p1, lvl1p2, lvl1p3, lvl1p4, lvl2p1;

class Level {
  constructor(keyWord, image1, image2, image3, image4) {
    this.keyWord = keyWord;
    this.img1 = image1;
    this.img2 = image2;
    this.img3 = image3;
    this.img4 = image4;
    this.xPlacement = width/2-width/16;
    this.yPlacement = height/4;
    this.pictureGrid = [];
    // this.board = this.create2dArray();
    this.numBlanks = this.keyWord.length;
    this.startP = this.xPlacement - cellWidth/2;
  }

  pictures() {
    let tile1 = new Tile(this.img1);
    this.pictureGrid.push(tile1);
    let tile2 = new Tile(this.img2);
    this.pictureGrid.push(tile2);
    let tile3 = new Tile(this.img3); 
    this.pictureGrid.push(tile3);
    let tile4 = new Tile(this.img4);
    this.pictureGrid.push(tile4);
  }

  display() {
    rectMode(CENTER);
    imageMode(CENTER);
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let index = x + y*gridSize;
        let tileImage;
        tileImage = this.pictureGrid[index].img;
        image(tileImage, x*cellWidth + this.xPlacement, y*cellHeight+100 + this.yPlacement, cellWidth, cellHeight);
        noFill();
        stroke(30);
        rect(x*cellWidth + this.xPlacement, y*cellHeight+100 + this.yPlacement, cellWidth, cellHeight);
      }
    }

    if (this.numBlanks === 3) {
      this.startP = this.xPlacement;
    }
    else if (this.numBlanks === 4) {
      this.startP = this.xPlacement - cellWidth/2;
    }
    else if (this.numBlanks === 5) {
      this.startP = this.xPlacement - cellWidth/2.75;
    }
    
    for (let i = 0; i < this.numBlanks; i++) {
      fill("black");
      line(this.startP, this.yPlacement + cellHeight*2+100, this.startP + lineSize, this.yPlacement + cellHeight*2+100);
      this.startP += lineSize*1.5;
      let index = i + 1;
      blankCoordinates.set(index, this.startP);
      blankCoordinates.set("y", this.yPlacement + cellHeight*2);
    }
  }
}

class Tile {
  constructor(img) {
    this.img = img;
  }
}

class Button {
  constructor(x, y, width, height, colour1, colour2) {
    this.x = x;
    this.y = y;
    // this.img = img;
    this.width = width;
    this.height = height;
    // this.width = img.width;
    // this.height = img.height;
    this.colour1 = colour1;
    this.colour2 = colour2;
  }

  display() {
    if (this.isInside(mouseX, mouseY)) {
      fill(this.colour2);
    }
    else {
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  isInside(x, y) {
    let leftSide = this.x;
    let rightSide = this.x + this.width;
    let topSide = this.y;
    let bottomSide = this.y + this.height;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
  }
}

function preload() {
  logo = loadImage("photos/4p1w-logo.png");
  lvl1p1 = loadImage("photos/ice1.png");
  lvl1p2 = loadImage("photos/ice2.jpg");
  lvl1p3 = loadImage("photos/ice3.jpg");
  lvl1p4 = loadImage("photos/ice4.jpg");
  lvl2p1 = loadImage("photos/4p1w-logo.png"); // change out for actual img
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/gridSize/2;
  cellWidth = height/gridSize/2;
  lineSize = cellWidth/4;
  words();

  level1 = new Level("ice", lvl1p1, lvl1p2, lvl1p3, lvl1p4);
  level1.pictures();

  level2 = new Level("sleep", lvl2p1, lvl1p2, lvl1p3, lvl1p4);
  level2.pictures();

  // level3 = new Level("root", lvl3p1, lvl3p2, lvl3p3, lvl3p4);
  // level3.pictures();

  // level4 = new Level("hand", lvl4p1, lvl4p2, lvl4p3, lvl4p4);
  // level4.pictures();

  // help = new Button(width/5*4, height/7, 80, 80, "red", "green");
}

function draw() {  
  // if (state === "0") {
  //   startScreen();
  // }
  if (state === 1) {
    keyWord = "ice";
    level1.display();
    // help.display();

  }
  if (state === 2) {
    keyWord = "sleep";
    level2.display();
  }
  if (state === 3) {
    keyWord = "root";
  //   level3.display();
  }
  if (state === 4) {
    keyWord = "hand";
  //   level4.display();
  }
  if (state === 5) {
    // keyWord = "";
    // end screen
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE && typedLetters.length > 0) {
    erase();
    rectMode(CENTER);
    // fill("black");
    rect(blankCoordinates.get(typedLetters.length)- lineSize, blankCoordinates.get("y")+70, lineSize+lineSize/2, 60);
    typedLetters.pop();
    noErase();
  }
  if (keyCode === ENTER) {
    if (wordCorrect()) {
      fill("green");
      text("Correct!", width/2 + 80, height/20*19);
      setTimeout(correct, 800);
    }
    else {
      // display x (incorrect icon/incorrect)
      fill("red");
      text("Incorrect!", width/2 + 90, height/20*19);
      setTimeout(incorrect, 800);
    }
  }
}

function keyTyped() {
  textAlign(RIGHT, BOTTOM);
  textSize(40);
  textStyle(BOLD);
  fill("black");
  if (typedLetters.length < keyWord.length && keyCode !== 13) {
    typedLetters.push(key);
    // console.log("blank test = " + blankCoordinates.get(typedLetters.length));
    text(key, blankCoordinates.get(typedLetters.length) - lineSize*1.5, blankCoordinates.get("y"), lineSize+lineSize/2, 200);
  }
}

function wordCorrect() {
  let b = 0;
  for (let i = 0; i < typedLetters.length; i++) {
    if (typedLetters[i] === keyWord[i]) {
      b++;
    }
  }
  
  if (b === keyWord.length) {
    return true;
  }
}

function words() {
  imageMode(CENTER);
  image(logo, width/2-width/11, height/8, logo.width/3, logo.height/3);
  fill("black");
  textAlign(LEFT);
  textSize(60);
  textStyle(BOLD);
  text("4 Pics", width/2, height/8);
  text("1 Word", width/2, height/8 +60);
}

function correct() {
  state++;
  background("white");

  words();
  typedLetters.length = 0;
}

function incorrect() {
  erase();
  for (let i = typedLetters.length; i > 0; i--) {
    rectMode(CENTER);
    // fill("black");
    rect(blankCoordinates.get(typedLetters.length)- lineSize, blankCoordinates.get("y")+70, lineSize+lineSize/2, 55);
    typedLetters.pop();
  }
  rect(width/2, height/23*21, 200, 50);
  noErase();
}

// function startScreen() {
//   textAlign(CENTER);

// }