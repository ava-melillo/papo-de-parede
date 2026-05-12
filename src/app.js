// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
import { query, orderBy, limitToLast } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmDpDtvfBYq08bXCEDp7wwkRDhKVJezog",
  authDomain: "bathroom-stall-simulator.firebaseapp.com",
  databaseURL: "https://bathroom-stall-simulator-default-rtdb.firebaseio.com",
  projectId: "bathroom-stall-simulator",
  storageBucket: "bathroom-stall-simulator.firebasestorage.app",
  messagingSenderId: "302411037135",
  appId: "1:302411037135:web:e8ac29cc5b6dad84817aba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

function writeDrawingData(inputId, input){

  const reference = ref(db, 'inputs/' + inputId);

  set(reference, input);

}

const inputRef = ref(db, 'inputs');
const idRef = ref(db, 'userCounter');

let interacted = false;
let idUpdated = false;

onValue(idRef, (snapshot) =>{

  const id = snapshot.val();

  if (inputId == null){

    //idUpdated = true;
    inputId = id;
  }
})

onValue(inputRef, (snapshot) => {

  const data = snapshot.val();

  if (dbSnapshot == null){

    dbSnapshot = data;

    loadDrawingDb(dbSnapshot);

  } 
  if (interacted && idUpdated == false){

    set(idRef, inputId);
    idUpdated = true;
    console.log("inputId atualizou: " + inputId);
  }
})

document.addEventListener("mouseup", (event) => {

  // esse if é pra nao criar um novo item vazio na base de dados, caso a pessoa nao desenhe nada
  if (interacted == false){

    interacted = true;
    inputId = inputId + 1;
  }

  if (dbSnapshot != null) writeDrawingData(inputId, grid.userInput);
})

function findSquare(drawing, squareId){

  for (let i = 0; i < drawing.length; i++){

        if (drawing[i].id == squareId) return i;
      }

      return null;

}

function loadDrawingDb(drawingsData){

  const drawings = drawingsData.slice(-10);
  
  console.log(drawings);

  let squareId;
  let idFound;

  drawings.forEach(drawing => {
    
    for (let i = 0; i < grid.h; i++){
      for (let j = 0; j < grid.w; j++){
      
        squareId = j.toString() + i.toString();
        idFound = findSquare(drawing, squareId);

        if (idFound != null) grid.muralData[i][j] = drawing[idFound].color;
      }
    }
  });

  reloadGrid();
}