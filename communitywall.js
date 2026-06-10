//Bem vinde ao codigo da porta de banheiro da ava!
//Por favor, fique à vontade. Não repara a bagunça.

/*

*****Coisos fazer:*****
 
 -/ manter posicao dos swatches fixa
 - limpar essas variáveis q tao antes do preload
 -/ ta dando erro quando o mouse desenha numa coordenada maior q a do canvas (ja resolvi a menor)
 -/ mandar ver no banco de dados ne. boa sorte

*/

let squareSize = 5;
let inputMaxLength = 400;
let numShownDrawings = 50;
let colorBg = "#EAE3DC";

let bgRef = "bg.webp";
let bg;

let grid;
let colorPicker;

let movingMouseWheel = false;
let endedScroll = false;

let dbSnapshot = null;
let inputId = null;

function preload(){

  bg = loadImage(bgRef);
}

function setup() {

  pixelDensity(1);
  createCanvas(windowWidth, 3000);
  
  //image(bg, 0, 0, windowWidth, 0);
  //image(bg, 0, bg.height, windowWidth, 0);
  background(colorBg);
  
  grid = new DrawingGrid(squareSize);
  grid.drawGrid();
  
  colorPicker = new ColorPicker();
  colorPicker.drawColors();
  
}

function draw() {

  if (movingMouseWheel == false){

    if (endedScroll == true){

        reloadGrid();
        endedScroll = false;
    }
  }
  
  if (mouseIsPressed){
  
    paintSquare();
  }

  movingMouseWheel = false;
}

function paintSquare(){
  
  //confere se esta selecionando cores, em vez de tentando desenhar no mural:
  if (colorPicker.isOnColors() != null) return;
  
  if(mouseX < 0 || mouseY < 0 ) return;
  
  // i e j sao as coordenadas do quadrado onde o mouse esta nesse momento
  let i = floor(mouseY/squareSize);
  let j = floor(mouseX/squareSize);

  let currentSquare = {id: j.toString() + i.toString(), posX: j, posY: i, color: colorPicker.currentColor}


  let currentId = findColoredSquare(grid.userInput, currentSquare.id);

  if (currentId != null) grid.userInput[currentId] = currentSquare;
  else {

    grid.userInput.push(currentSquare);
  }

  if (grid.userInput.length > inputMaxLength){
    
    let temp = grid.userInput[0];

    grid.squares[temp.posY][temp.posX].drawSquare( grid.muralData[temp.posY][temp.posX]);
    grid.userInput.shift();

  }

  grid.squares[i][j].drawSquare( currentSquare.color );

}

function mouseClicked(){

  if (colorPicker.isOnColors() != null){
  
     colorPicker.currentColor =  colorPicker.colorValues[colorPicker.isOnColors()];
  }
}

function mouseWheel() {
  movingMouseWheel = true;
  endedScroll = true;
}

function reloadGrid(){

  //image(bg, 0, 0, windowWidth, 0);
  //image(bg, 0, bg.height, windowWidth, 0);
  background(colorBg);


  grid.drawGrid();

  let pixel;
  for (let i = 0; i < grid.userInput.length; i++){

    pixel = grid.userInput[i];
    grid.squares[pixel.posY][pixel.posX].drawSquare(pixel.color);
  }
  

  colorPicker.drawColors();

}

function findColoredSquare(drawing, squareId){

  for (let i = 0; i < drawing.length; i++){

        if (drawing[i].id == squareId) return i;
      }

      return null;

}
