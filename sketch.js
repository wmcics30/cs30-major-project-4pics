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

    // if (this.numBlanks > 3) {
    //   let startP =
    // }
    let startP = cellWidth + this.xPlacement;
    for (let i = 0; i < 2; i++) {
      line(startP - cellWidth, this.yPlacement + 2*cellHeight, i + this.lineSize + this.xPlacement, this.yPlacement+ 2*cellHeight);
    }
  }
}

class Tile {
  constructor(img) {
    this.img = img;
  }
}

let gridSize = 2;
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
  cellHeight = height/gridSize/3;
  cellWidth = height/gridSize/3;
  // board = create2dArray(gridSize);
  level1 = new Level("ice", lvl1p1, lvl1p2, lvl1p3, lvl1p4);
  level1.pictures();
  level1.display();
  // level1.determineBlanks();
}

function draw() {
  // background(220);
  
}

