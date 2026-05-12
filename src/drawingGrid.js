class DrawingGrid{

  constructor(squareSize){
  
    this.w = windowWidth / squareSize;
    this.h = 2000 / squareSize;
    
    this.squareSize = squareSize;
    this.squares = [];
    this.muralData = [];
    
    this.userInput = [];
    
    //setando os quadrados para cinza no começo
    for (let i = 0; i < this.h; i++){
      this.muralData[i] = []
      for (let j = 0; j < this.w; j++){
      
        this.muralData[i][j] = "#77B1DB";
      }
    }
    
    let line = [];
    
    noStroke();
    for (let i = 0; i < this.h; i++){
      for (let j = 0; j < this.w; j++){
        
        line[j] = new GridSquare(
          j*this.squareSize,
          i*this.squareSize,
          squareSize
        );
      }
      
      this.squares[i] = line;
      line = [];
    }
    
  }
  
  drawGrid(){
  
    for (let i = 0; i < this.h; i++){
      for (let j = 0; j < this.w; j++){
      
        this.squares[i][j].drawSquare(this.muralData[i][j]);
      }
    }
  }

  hasInputId(id){

    for (let i = 0; i < grid.userInput.length; i++){

      if (grid.userInput[i].id == id) return i;
    }

    return null;
  }
}
