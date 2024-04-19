let sentiment;
let statusEl;
let submitButton;
let inputBox;
let sentimentResult;
let prediction;
const comentarios = [
  { "texto": "¡Hoy es el mejor día de mi vida! Me siento increíblemente feliz." },
  { "texto": "No puedo dejar de sonreír. Todo está saliendo perfectamente." },
  { "texto": "Me encanta cuando el sol brilla y todo parece más brillante." },
  { "texto": "La felicidad simplemente fluye cuando estoy rodeado de amigos y familia." },
  { "texto": "¡Qué día tan maravilloso para estar vivo!" },
  { "texto": "Ver a mi perro correr felizmente por el parque siempre alegra mi día." },
  { "texto": "Me siento tan afortunado de tener personas increíbles en mi vida." },
  { "texto": "Este pastel de chocolate es simplemente celestial. ¡Me hace tan feliz!" },
  { "texto": "Cada vez que veo a mi hijo sonreír, todo en el mundo parece correcto." },
  { "texto": "La música siempre me levanta el ánimo, especialmente esta canción." },
  { "texto": "Estoy emocionado por lo que el futuro me depara. Todo es posible." },
  { "texto": "La risa es contagiosa, y hoy he reído más de lo que he llorado." },
  { "texto": "El amor incondicional de mi mascota siempre me hace sentir cálido y feliz." },
  { "texto": "A veces, la felicidad está en las pequeñas cosas, como una taza de té caliente en una tarde fría." },
  { "texto": "Despertar sintiéndome renovado y listo para enfrentar el día es una sensación maravillosa." },
];

let comentariosAnalizados = [];


function setup(){
  noCanvas();

  sentiment = ml5.sentiment('movieReviews', modelReady);

  statusEl = createP('Loading Model...');
  inputBox = createInput('Today is the happiest day and is full of rainbows!');
  inputBox.attribute('size', '75');
  submitButton = createButton('submit');
  sentimentResult = createP('sentiment score:');

  submitButton.mousePressed(getSentiment);
}

function getSentiment(comment){
  prediction = sentiment.predict(comment);
  sentimentResult.html(`Sentiment score: ${prediction.score}`);
  comentariosAnalizados.push([comment,prediction.score])
}

function modelReady(){
  statusEl.html('Model Loaded');
}
