class GridSquare{

  constructor(posX, posY, size){
    
    this.size = size;
    //this.collor = squareCollor;
    this.pos = {
      x: posX,
      y: posY
    };
  
  }
  
  drawSquare(collor){
  
    noStroke();
    fill(collor);
    square(this.pos.x, this.pos.y, this.size);
  }
  


}
