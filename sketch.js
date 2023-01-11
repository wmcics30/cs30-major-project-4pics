// 4 Pics 1 Word - CS30 Major Project
// Katharine C
// 2022/23
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
    this.lineSize = cellWidth/4;
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
    console.log(this.pictureGrid);
  }

  // maybe need? maybe for if clicking photo to zoom or something?
  // create2dArray() {
  //   let emptyArray = [];
  //   for (let y = 0; y < gridSize; y++) {
  //     emptyArray.push([]);
  //     for (let x = 0; x < gridSize; x++) {
  //       let index = x + y*gridSize;
  //       emptyArray[y].push(index);
  //     }
  //   }
  //   return emptyArray;
  // }

  // determine amount of blanks needed based off of key word 
  // determineBlanks() {

  //   console.log(numBlanks);


  // }

  display() {
    rectMode(CENTER);
    imageMode(CENTER);
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let index = x + y*gridSize;
        let tileImage;
        tileImage = this.pictureGrid[index].img;
        image(tileImage, x*cellWidth + this.xPlacement, y*cellHeight + this.yPlacement, cellWidth, cellHeight);
        noFill();
        stroke(30);
        rect(x*cellWidth + this.xPlacement, y*cellHeight + this.yPlacement, cellWidth, cellHeight);
      }
    }

    if (this.numBlanks === 3) {
      this.startP = this.xPlacement;
    }
    else if (this.numBlanks === 4) {
      this.startP = this.xPlacement - cellWidth/2;
    }
    
    for (let i = 0; i < this.numBlanks; i++) {
      line(this.startP, this.yPlacement + cellHeight*2, this.startP + this.lineSize, this.yPlacement + cellHeight*2);
      // console.log(this.startP + this.lineSize - this.startP);
      // console.log("line size=" + this.lineSize);
      this.startP += this.lineSize*1.5;
      console.log("startp = " + this.startP);
      let index = i + 1;
      blankCoordinates.set("blank " + index + " x1", this.startP);
      blankCoordinates.set("blank " + index + " x2", this.startP + this.lineSize);
      blankCoordinates.set("y", this.yPlacement + cellHeight*2);
    }
  }
}

class Tile {
  constructor(img) {
    this.img = img;
  }
}

let gridSize = 2;
let blankCoordinates = new Map();
let emptyBlanks = true;
let level1, board, cellWidth, cellHeight;
let lvl1p1, lvl1p2, lvl1p3, lvl1p4;

function preload() {
  lvl1p1 = loadImage("photos/ice1.png");
  lvl1p2 = loadImage("photos/ice2.jpg");
  lvl1p3 = loadImage("photos/ice3.jpg");
  lvl1p4 = loadImage("photos/ice4.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/gridSize/2;
  cellWidth = height/gridSize/2;
  // board = create2dArray(gridSize);
  level1 = new Level("ice", lvl1p1, lvl1p2, lvl1p3, lvl1p4);
  level1.pictures();
  level1.display();
  // level1.determineBlanks();
  // console.log("blank 1 map x1 test = " + blankCoordinates.get("blank 1 x1"));
  // console.log("blank 1 map x2 test = " + blankCoordinates.get("blank 1 x2"));
  // console.log("blank 2 map x1 test = " + blankCoordinates.get("blank 2 x1"));
  // console.log("blank 2 map x2 test = " + blankCoordinates.get("blank 2 x2"));
  // console.log("blank 3 map x1 test = " + blankCoordinates.get("blank 3 x1"));
  // console.log("blank 3map x2 test = " + blankCoordinates.get("blank 3 x2"));
}

function draw() {
  // background(220);
  
}

function keyPressed() {
  textAlign(LEFT, BASELINE);
  textSize(30);
  textStyle(BOLD);
  text
  if (emptyBlanks) {
    text(key, blankCoordinates.get("blank 1 x1"), blankCoordinates.get("y"));
  } 
}