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
let state = 0;
let click = 0;
let mClick = 0;
let endClick = 0;
let level1, level2, level3, level4;
let board, cellWidth, cellHeight, lineSize, blankAt, keyWord, help, start, how, back, mute, volumeimg, mIconY, mIconX;
let bgroundmusic, correctSound, incorrectSound, keySound1, endSound;
let logo, fire, cloud, lvl1p1, lvl1p2, lvl1p3, lvl1p4, lvl2p1, lvl2p2, lvl2p3, lvl2p4, lvl3p1, lvl3p2, lvl3p3, lvl3p4, lvl4p1, lvl4p2, lvl4p3, lvl4p4;

class Level {
  constructor(keyWord, image1, image2, image3, image4) {
    this.keyWord = keyWord;
    this.img1 = image1;
    this.img2 = image2;
    this.img3 = image3;
    this.img4 = image4;
    this.xPlacement = width / 2 - width / 16;
    this.yPlacement = height / 4;
    this.pictureGrid = [];
    this.numBlanks = this.keyWord.length;
    this.startP = this.xPlacement - cellWidth / 2;
  }

  pictures() {
    while (this.pictureGrid.length < 4) {
      let tile1 = new Tile(this.img1);
      this.pictureGrid.push(tile1);
      let tile2 = new Tile(this.img2);
      this.pictureGrid.push(tile2);
      let tile3 = new Tile(this.img3);
      this.pictureGrid.push(tile3);
      let tile4 = new Tile(this.img4);
      this.pictureGrid.push(tile4);
      console.log(this.pictureGrid);
    }
  }

  display() {
    rectMode(CENTER);
    imageMode(CENTER);
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let index = x + y * gridSize;
        let tileImage;
        tileImage = this.pictureGrid[index].img;
        image(tileImage, x * cellWidth + this.xPlacement, y * cellHeight + 100 + this.yPlacement, cellWidth, cellHeight);
        noFill();
        stroke(30);
        rect(x * cellWidth + this.xPlacement, y * cellHeight + 100 + this.yPlacement, cellWidth, cellHeight);
      }
    }

    if (this.numBlanks === 3) {
      this.startP = this.xPlacement;
    }
    else if (this.numBlanks === 4) {
      this.startP = this.xPlacement - cellWidth / 6;
    }
    else if (this.numBlanks === 5) {
      this.startP = this.xPlacement - cellWidth / 2.75;
    }

    for (let i = 0; i < this.numBlanks; i++) {
      fill("black");
      line(this.startP, this.yPlacement + cellHeight * 2 + 100, this.startP + lineSize, this.yPlacement + cellHeight * 2 + 100);
      this.startP += lineSize * 1.5;
      let index = i + 1;
      blankCoordinates.set(index, this.startP);
      blankCoordinates.set("y", this.yPlacement + cellHeight * 2);
    }
  }
}

class Tile {
  constructor(img) {
    this.img = img;
  }
}

class Button {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isInside(x, y) {
    let leftSide = this.x;
    let rightSide = this.x + this.width;
    let topSide = this.y;
    let bottomSide = this.y + this.height;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
  }
}

class ImgButton extends Button {
  constructor(x, y, width, height, img1, img2, squareyn) {
    super(x, y, width, height);
    this.img1 = img1;
    this.img2 = img2;
    this.square = squareyn;
  }

  display() {
    rectMode(CORNER);
    imageMode(CORNER);
    noFill();
    stroke(4);

    if (!this.isInside(mouseX, mouseY)) {
      image(this.img1, this.x, this.y, this.width, this.height);
    }
    else {
      image(this.img2, this.x, this.y, this.width, this.height);
    }
    if (this.square === "yes") {
      rect(this.x, this.y, this.width, this.height);
    }
  }
}

class SolidButton extends Button {
  constructor(x, y, width, height, colour1, colour2, text) {
    super(x, y, width, height);
    this.colour1 = colour1;
    this.colour2 = colour2;
    this.text = text;
  }

  display() {
    rectMode(CORNER);
    textAlign(CENTER);

    if (!this.isInside(mouseX, mouseY)) {
      fill(this.colour1);
    }
    else {
      fill(this.colour2);
    }
    rect(this.x, this.y, this.width, this.height);

    textSize(35);
    fill("black");
    textStyle(BOLDITALIC);
    text(this.text, this.x + this.width / 2, this.y + this.height / 3 * 2);
  }

}

function preload() {
  bgroundmusic = loadSound("photos/LateNightRadio.mp3");
  correctSound = loadSound("photos/bell.wav");
  incorrectSound = loadSound("photos/wrong_sound_effect.mp3");
  keySound1 = loadSound("photos/keypress1.flac");
  endSound = loadSound("photos/win.ogg");

  logo = loadImage("photos/4p1w-logo.png");
  fire = loadImage("photos/fire.png");
  cloud = loadImage("photos/cloud.png");
  mute = loadImage("photos/mute.png");
  volumeimg = loadImage("photos/volume.png");

  lvl1p1 = loadImage("photos/ice1.png");
  lvl1p2 = loadImage("photos/ice2.jpg");
  lvl1p3 = loadImage("photos/ice3.jpg");
  lvl1p4 = loadImage("photos/ice4.jpg");

  lvl2p1 = loadImage("photos/sleep1.jpg");
  lvl2p2 = loadImage("photos/sleep2.jpg");
  lvl2p3 = loadImage("photos/sleep3.jpg");
  lvl2p4 = loadImage("photos/sleep4.jpg");

  lvl3p1 = loadImage("photos/hand1.jpg");
  lvl3p2 = loadImage("photos/hand2.png");
  lvl3p3 = loadImage("photos/hand3.jpg");
  lvl3p4 = loadImage("photos/hand4.jpg");

  lvl4p1 = loadImage("photos/root1.png");
  lvl4p2 = loadImage("photos/root2.jpg");
  lvl4p3 = loadImage("photos/root3.jpg");
  lvl4p4 = loadImage("photos/root4.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height / gridSize / 2;
  cellWidth = height / gridSize / 2;
  lineSize = cellWidth / 4;
  mIconY = height/14;
  mIconX = width/8*7;

  bgroundmusic.setVolume(0.3);
  incorrectSound.setVolume(0.3);
  correctSound.setVolume(0.5);
  keySound1.setVolume(0.5);
  

  level1 = new Level("ice", lvl1p1, lvl1p2, lvl1p3, lvl1p4);
  level1.pictures();

  level2 = new Level("sleep", lvl2p1, lvl2p2, lvl2p3, lvl2p4);
  level2.pictures();

  level3 = new Level("hand", lvl3p1, lvl3p2, lvl3p3, lvl3p4);
  level3.pictures();

  level4 = new Level("root", lvl4p1, lvl4p2, lvl4p3, lvl4p4);
  level4.pictures();

  help = new ImgButton(width / 5 * 4, height / 7, 80, 80, fire, cloud, "yes");
}

function draw() {
  if (state === 0) {
    startScreen();
    musicIcon();
  }
  if (state === 1) {
    keyWord = "ice";
    level1.display();
    help.display();
    musicIcon();
  }
  if (state === 2) {
    keyWord = "sleep";
    level2.display();
    help.display();
    musicIcon();
  }
  if (state === 3) {
    keyWord = "hand";
    level3.display();
    help.display();
    musicIcon();
  }
  if (state === 4) {
    keyWord = "root";
    level4.display();
    help.display();
    musicIcon();
  }
  if (state === 5) {
    keyWord = "";
    endScreen();
    musicIcon();
  }
}

function keyPressed() {
  if (state > 0 && state < 5) {
    if (keyCode === BACKSPACE && typedLetters.length > 0) {
      erase();
      rectMode(CENTER);
      fill("black");
      rect(blankCoordinates.get(typedLetters.length) - lineSize, blankCoordinates.get("y") + 70, lineSize + lineSize / 2, 60);
      typedLetters.pop();
      noErase();
    }
    if (keyCode === ENTER) {
      if (wordCorrect()) {
        textSize(40);
        fill("green");
        text("Correct!", width / 2 + 80, height / 20 * 19);
        correctSound.play();
        setTimeout(correct, 800);
      }
      else {
        textSize(40);
        fill("red");
        text("Incorrect!", width / 2 + 90, height / 20 * 19);
        incorrectSound.play();
        setTimeout(incorrect, 800);
      }
    }
  }
}

function keyTyped() {
  if (state > 0 && state < 5) {
    rectMode(CENTER);
    textAlign(RIGHT, BOTTOM);
    textSize(40);
    textStyle(BOLD);
    fill("black");
    if (typedLetters.length < keyWord.length && keyCode !== 13) {
      typedLetters.push(key);
      text(key, blankCoordinates.get(typedLetters.length) - lineSize * 1.5, blankCoordinates.get("y") - 2, lineSize + lineSize / 2, 200);
      keySound1.play();
    }
  }
}

function mousePressed() {
  if (mouseInsideRect(mIconX, mIconX + 80, mIconY, mIconY + 80) && mClick % 2 === 0) {
    fill("white");
    erase();
    rectMode(CORNER);
    rect(mIconX, mIconY, 80, 80);
    noErase();
    image(volumeimg, mIconX, mIconY, 80, 80);
    if (!bgroundmusic.isPlaying()) {
      bgroundmusic.loop();
    }
    mClick++;
  }
  else if (mouseInsideRect(mIconX, mIconX + 80, mIconY, mIconY + 80) && mClick % 2 === 1) {
    fill("white");
    erase();
    rectMode(CORNER);
    rect(mIconX, mIconY, 80, 80);
    noErase();
    image(mute, mIconX, mIconY, 80, 80);
    if (bgroundmusic.isPlaying()) {
      bgroundmusic.pause();
    }
    mClick++;
  }
  
  if (start.isInside(mouseX, mouseY) && state === 0) {
    background("white");
    
    state = 1;
    words();
  }
  
  if (how.isInside(mouseX, mouseY) && state === 0) {
    background("white");

    state = -1;
    instrutions();
    words();
  }

  if (state === -1) {
    if (back.isInside(mouseX, mouseY)) {
      background("white");
      state = 0;
    }
  }
  
  if (state > 0 && state < 5) {
    if (help.isInside(mouseX, mouseY) && click % 2 === 0) {
      rectMode(CORNER);
      fill("green");
      rect(width/5 * 4 - 120, height/7 + 100, 355, 440);
      instrutions();
      click++;
    }
    else if (help.isInside(mouseX, mouseY) && click % 2 === 1) {
      fill("black");
      erase();
      rectMode(CORNER);
      rect(width / 5 * 4 - 125, height / 7 + 95, 355 + 10, 440 + 10);
      noErase();
      click++;
    }
  }
}


function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
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
  image(logo, width / 2 - width / 12, height / 8, logo.width / 2, logo.height / 2);
  fill("black");
  textAlign(LEFT);
  textSize(60);
  textStyle(BOLD);
  text("4 Pics", width / 2 - 40, height / 8);
  text("1 Word", width / 2 - 40, height / 8 + 60);
}

function correct() {
  state++;
  background("white");

  words();
  typedLetters.length = 0;
}

function incorrect() {
  fill("black");
  erase();
  rectMode(CENTER);
  for (let i = typedLetters.length; i > 0; i--) {
    rect(blankCoordinates.get(typedLetters.length) - lineSize, blankCoordinates.get("y") + 70, lineSize + lineSize / 2, 57);
    typedLetters.pop();
  }
  rect(width / 2, height / 23 * 21, 200, 50);
  noErase();
}

function endScreen() {
  textAlign(CENTER);
  textSize(40);
  textStyle(BOLDITALIC);
  text("Thanks for playing!", width / 2, height / 2);
  textSize(20);
  textStyle(NORMAL);
  text("Late Night Radio Kevin MacLeod (incompetech.com) Licensed under Creative Commons:", width/2, height/8*7.25);
  text("By Attribution 4.0 License http://creativecommons.org/licenses/by/4.0/", width/2, height/8*7.5);
  endClick++;
  bgroundmusic.pause();
  if (endClick === 1) {
    endSound.play();
  }
}

function startScreen() {
  imageMode(CENTER);
  image(logo, width / 2, height / 2, logo.width, logo.height);
  textAlign(CENTER);
  textSize(90);
  textStyle(BOLD);

  // black shadow
  fill("black");
  text("4 Pics", width / 2, height / 6);
  fill("red");
  text("4 ", width / 2 - 85, height / 6);
  fill("green");
  text("Pics", width / 2 + 45, height / 6);
  fill("black");
  text("1 Word", width / 2, height / 6 + 100);
  fill("#489cf3");
  text("1 ", width / 2 - 105, height / 6 + 100);
  fill("orange");
  text("Word", width / 2 + 45, height / 6 + 100);

  start = new SolidButton(width / 2 - 300, height / 4 * 3, 250, 70, "purple", "lightblue", "Play");
  start.display();

  how = new SolidButton(width / 2 + 50, height / 4 * 3, 250, 70, "purple", "lightblue", "Instructions");
  how.display();
}

function musicIcon() {
  imageMode(CORNER);
  if (!bgroundmusic.isPlaying()) {
    image(mute, mIconX, mIconY, 80, 80);
  }
  if (state > 0 && state < 6) {
    if (bgroundmusic.isPlaying()) {
      erase();
      rectMode(CORNER);
      rect(mIconX, mIconY, 80, 80);
      noErase();
      image(volumeimg, mIconX, mIconY, 80, 80);
    }
    else if (!bgroundmusic.isPlaying) {
      erase();
      rectMode(CORNER);
      rect(mIconX, mIconY, 80, 80);
      noErase();
      image(mute, mIconX, mIconY, 80, 80);
    }
  }
}

function instrutions() {
  if (state === -1) {
    back = new SolidButton(width / 4, height / 4 * 3, 250, 70, "purple", "lightblue", "Back");
    back.display();

    textAlign(CENTER);
    textStyle(BOLDITALIC);
    textSize(50);
    text("How to Play", width / 2, height / 3);

    textAlign(LEFT);
    textStyle(NORMAL);
    textSize(30);
    text("Guess the word in common between four pictures", width / 4, height / 12 * 5);
    text("Type your guess using your keyboard and hit ENTER to see if it's right!", width / 4, height / 12 * 6);
    text("Remove a letter by hitting BACKSPACE", width / 4, height / 12 * 7);
    text("Click the ? if you need a review of the rules during the game!", width / 4, height / 12 * 8);
  }

  if (state > 0 && state < 5) {
    textAlign(CENTER);
    textStyle(BOLDITALIC);
    fill("black");
    textSize(30);
    text("How to Play", width / 6 * 5, height / 16 * 5);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(20);
    text("Guess the word in common between ", width / 6 * 5, height / 16 * 6);
    text("four pictures", width / 6 * 5, height / 16 * 6.5);
    text("Type your guess using your keyboard", width / 6 * 5, height / 16 * 7.5);
    text("and hit ENTER to see if it's right!", width / 6 * 5, height / 16 * 8);
    text("Remove a letter by hitting", width / 6 * 5, height / 16 * 9);
    text("BACKSPACE", width / 6 * 5, height / 16 * 9.5);
    text("Click the ? again to hide the rules", width / 6 * 5, height / 16 * 10.5);
  }
}