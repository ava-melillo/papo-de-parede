class ColorPicker{

  constructor(){
  
    this.colorValues = ["#0c2789","#960101","#016847","#c47a03","#eae2d5", "#330000"];
    this.colorSwatches = [];
    this.currentColor = this.colorValues[0];
    
    this.div = createElement('div');
    
    this.fullWidth = 500;
    
    //proporçao do espaço entre as cores, em relaçao à largura das cores:
    let gapSize = 1;
    
    //proporçao entre a cor e o bloco completo de seleçao de cores (this.fullWidth):
    let proportion = this.colorValues.length + gapSize * (this.colorValues.length - 1);
    
    //posiçao em X do primeiro colorSwatch:
    let initPos = (width - this.fullWidth)/2;
    
    let posX;
    this.posY = windowHeight - 50 + window.scrollY;
    
    let colorSize = this.fullWidth / proportion;
    
    for (let i = 0; i < this.colorValues.length; i++){
      
      posX = initPos + (i * colorSize * (1 + gapSize));
      
      this.colorSwatches[i] = new ColorSwatch(posX, this.posY, colorSize, this.colorValues[i]);
      
    }
    
  }
  
  drawColors(){
    
    strokeWeight(4);
    stroke(255);

    this.updatePosition();
  
    for (let i = 0; i < this.colorValues.length; i++){
      
      this.colorSwatches[i].drawColor(this.posY);
      
    }
  }
  
  isOnColors(){
  
    for (let i = 0; i < this.colorValues.length; i++){
    
      if (this.colorSwatches[i].isOnColor() == true){
      
        return i;
      }
    }
    
    return null;
  }

  updatePosition(){

    this.posY = windowHeight - 100 + window.scrollY;
  }
}
