let sentiment;
let statusEl;
let submitButton;
let inputBox;
let sentimentResult;
let prediction;
<<<<<<< Updated upstream
let token = AIzaSyDZ9MqeC6ebJXBJNY5X1kACBpHCmUaJtCM;

=======
let dibujar = true;
>>>>>>> Stashed changes
const comentarios = [
  { "texto": "¡Hoy es el mejor día de mi vida! Me siento increíblemente feliz.A veces, simplemente necesito un abrazo para sentirme un poco mejorA veces, simplemente necesito un abrazo para sentirme un poco mejorA veces, simplemente necesito un abrazo para sentirme un poco mejorA veces, simplemente necesito un abrazo para sentirme un poco mejorA veces, simplemente necesito un abrazo para sentirme un poco mejorA veces, simplemente necesito un abrazo para sentirme un poco mejor" },
  { "texto": "No puedo dejar de sonreír. Todo está saliendo perfectamente." },
  { "texto": "Me encanta cuando el sol brilla y todo parece más brillante." },
  { "texto": "La felicidad simplemente fluye cuando estoy rodeado de amigos y familia." },
  { "texto": "¡Qué día tan maravilloso para estar vivo!" },
  { "texto": "Ver a mi perro correr felizmente por el parque siempre alegra mi día." },
  { "texto": "Me siento tan afortunado de tener personas increíbles en mi vida." },
  { "texto": "Este pastel de chocolate es simplemente celestial. ¡Me hace tan feliz!" },
  { "texto": "Cada vez que veo a mi hijo sonreír, todo en el mundo parece correcto." },
  { "texto": "No puedo evitar sentirme triste cuando pienso en las personas que ya no están con nosotros." },
  { "texto": "A veces, la soledad se siente abrumadora, y es difícil sacudirse esa sensación." },
  { "texto": "Extraño los días de verano cuando todo era más simple y sin preocupaciones." },
  { "texto": "Es difícil mantener una sonrisa cuando el mundo parece estar en caos." },
  { "texto": "La tristeza parece envolverme como una manta en estos días oscuros." },
  { "texto": "La pérdida de un ser querido deja un vacío que nunca parece llenarse." },
  { "texto": "A veces, simplemente necesito un abrazo para sentirme un poco mejor." },
];

let comentariosAnalizados = [];


function setup() {
  noCanvas();
  sentiment = ml5.sentiment('movieReviews', modelReady);
  statusEl = createP('Loading Model...');
  submitButton = createButton('Obtener puntajes');
  submitButton.mousePressed(analizeCommentsSentiments);
  submitButton.addClass('btn btn-outline-primary text-dark')
}

function analizeCommentsSentiments(error) {
  dibujar=true;
  if (error) {
    console.log(error)
  } else {

    for (let i = 0; i < comentarios.length; i++) {
      getSentiment(comentarios[i].texto)
    }
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
  if(dibujar==true){
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
  pickColor(card,score);
  let commentText = createP(comment);
  commentText.parent(card);
  let scoreText = createP(`Puntaje: ${score}`);
  scoreText.parent(card);
  card.parent("#cardRow")
}

function pickColor(card,score){
  if(score>0.5){
    card.addClass('card col-2 btn btn-outline-success');
  }else{
    card.addClass('card col-2 btn btn-outline-danger')
  }
}