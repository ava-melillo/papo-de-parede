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

    if (collor == null || collor == undefined){

      fill(255, 0);
    }
    else{

      fill(collor);
    }

    square(this.pos.x, this.pos.y, this.size);
  }
}
