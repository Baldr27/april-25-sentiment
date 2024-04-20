let sentiment;
let statusEl;
let submitButton;
let inputBox;
let sentimentResult;
let prediction;
let dibujar = true;
let apiRequest;
let comentarios = [];

/* 
*/

const getData = async () => {
  const apiRequest = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=Jn09UdSb3aA&key=AIzaSyDZ9MqeC6ebJXBJNY5X1kACBpHCmUaJtCM&order=relevance';
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

let comentariosAnalizados = [];

async function setup() {
  noCanvas();
  sentiment = ml5.sentiment('movieReviews', modelReady);
  statusEl = createP('Loading Model...');
  submitButton = createButton('Obtener puntajes');
  submitButton.mousePressed(analizeCommentsSentiments);
  submitButton.addClass('btn btn-outline-primary text-dark')

  // cargar enseguida los comentarios para evitar problemas de asincronia
  try {
    await getData();
  } catch (error) {
    console.log(error);
  }
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
  let commentText = createP(comment);
  commentText.parent(card);
  let scoreText = createP(`Puntaje: ${score}`);
  scoreText.parent(card);
  card.parent("#cardRow")
}

function pickColor(card, score) {
  if (score > 0.5) {
    card.addClass('card col-2 btn btn-outline-success');
  } else {
    card.addClass('card col-2 btn btn-outline-danger')
  }
}