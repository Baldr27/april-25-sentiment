let sentiment;
let statusEl;
let scoreButton;
let inputBox;
let sentimentResult;
let prediction;
let dibujar = true;
let apiRequest;
let comentarios = [];
let inputLink;
let loadButton;
let comentariosAnalizados = [];

const getData = async () => {
  fillLink(inputLink.value());
  const response = await fetch(apiRequest);
  const data = await response.json();

  // validar para ver  si la respuesta contiene datos
  if (data.items && data.items.length > 0) {
    // agregar de a uno los commentarios uwu
    data.items.forEach(comment => {
      comentarios.push({ texto: comment.snippet.topLevelComment.snippet.textDisplay });
    });
    //console.log('Comentarios agregados:', comentarios);
  } else {
    console.log('No se encontraron comentarios.');
  }
}

function fillLink(id){
  apiRequest = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId='+id+'&key=AIzaSyDZ9MqeC6ebJXBJNY5X1kACBpHCmUaJtCM&order=relevance';
}

function setup() {
  noCanvas();
  sentiment = ml5.sentiment('movieReviews', modelReady);
  statusEl = createP('Loading Model...');
  inputLink = createInput('Id de video');
  videoId = inputLink.value;
  loadButton=createButton('Cargar video')
  loadButton.addClass('btn btn-outline-success text-dark')
  loadButton.mousePressed(async function(){
    try {
      await getData();
    } catch (error) {
      console.log(error);
    }
  })
  scoreButton = createButton('Obtener puntajes');
  scoreButton.mousePressed(analizeCommentsSentiments);
  scoreButton.addClass('btn btn-outline-primary text-dark')
  
  // cargar enseguida los comentarios para evitar problemas de asincronia

}

function analizeCommentsSentiments() {
  dibujar = true;
  for (let i = 0; i < comentarios.length; i++) {
    getSentiment(comentarios[i].texto);
  }
}


function getSentiment(comment) {
  prediction = sentiment.predict(comment);
  console.log("Comentario: " + comment + " Puntaje: " + prediction.score);
  comentariosAnalizados.push({ comentario: comment, puntaje: prediction.score });
}

function modelReady() {
  statusEl.html('Model Loaded');
}

function draw() {
  if (dibujar == true) {
    for (let i = 0; i < comentariosAnalizados.length; i++) {
      createCard(comentariosAnalizados[i].comentario, comentariosAnalizados[i].puntaje);
    }
    console.log(dibujar)
    dibujar = false;
    console.log(dibujar)
  }

}

function createCard(comment, score) {
  let card = createDiv('');
  pickColor(card, score);
  let scoreText = createP(`Puntaje: ${score}`);
  scoreText.parent(card);
  let commentText = createP(comment);
  commentText.parent(card);
  card.parent("#cardRow")
}

function pickColor(card, score) {
  let defClass = "card col-2 btn overflow-auto";
  if (score > 0.8) {
    card.addClass(`${defClass} btn-success text-success bg-success`);
  } if(score<0.2) {
    card.addClass(`${defClass} btn-danger text-danger bg-danger`)
  }if(score>=0.21 && score<=0.4){
    card.addClass(`${defClass} btn-info text-info bg-info`);
  }if(score>=0.4 && score<=0.6){
    card.addClass(`${defClass} btn-primary text-primary bg-primary`);
  }else{
    card.addClass(`${defClass} btn-secondary text-secondary bg-secondary`);
  }
}
