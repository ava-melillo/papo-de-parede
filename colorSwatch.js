class ColorSwatch{

  constructor(posX, posY, size, colorValue){
  
    this.pos = {x: posX, y: posY}
    this.size = size;
    this.colorValue = colorValue;
  }
  
  drawColor(posY){

    this.pos.y = posY;
  
    fill(this.colorValue);
    square(this.pos.x, this.pos.y, this.size);
  }
  
  isOnColor(){
  
    if ((mouseX > this.pos.x) && (mouseX < this.pos.x + this.size) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.size)){
      
      return true;
    }
  }
}
