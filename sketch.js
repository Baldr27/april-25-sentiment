let sentiment;
let statusEl;
let scoreButton;
let inputBox;
let sentimentResult;
let prediction;
let dibujar = true;
let apiRequest;
let commits = [];
let inputLink;
let loadButton;
let commitsAnalizados = [];
let nextButton;
let prevButton;
let page = 0;

const getData = async () => {
  commits = [];
  commitsAnalizados = [];
  select('#cardRow').html('');
  const inputValue = inputLink.value();
  const parts = inputValue.split('/');
  const author = parts[3];
  const repo = parts[4];
  fillLink(author, repo, page);
  const response = await fetch(apiRequest);
  const data = await response.json();

  // validar para ver  si la respuesta contiene datos
  if (data && data.length > 0) {
    // agregar de a uno los commentarios uwu
    data.forEach(commit => {
      commits.push({ texto: commit.commit.message });
    });
  } else {
    console.log('No se encontraron commits.');
  }
  analyzeCommitsSentiments();
}

function fillLink(author, repo, page){
  apiRequest = `https://api.github.com/repos/${author}/${repo}/commits?page=${page}`;
}

function setup() {
  noCanvas();
  sentiment = ml5.sentiment('movieReviews', modelReady);
  statusEl = createP('Loading Model...');
  inputLink = createInput('Repo link');
  inputLink.id('inputLink');
  repoLink = inputLink.value;
  loadButton=createButton('Load Repo')
  loadButton.id('loadButton');
  loadButton.addClass('btn bg-success btn-outline-success text-dark')
  loadButton.mousePressed(async function(){
    try {
      await getData();
    } catch (error) {
      console.log(error);
    }
  })
  // scoreButton = createButton('Get Analysis');
  // scoreButton.id('scoreButton');
  // scoreButton.mousePressed(analyzeCommitsSentiments);
  // scoreButton.addClass('btn bg-primary btn-outline-primary text-dark')
  
  nextButton = createButton('Next Page');
  nextButton.id('nextButton');
  nextButton.addClass('btn bg-primary btn-outline-grey text-dark')
  nextButton.mousePressed(async function(){
    page = page + 1;
    console.log(page);
    try{
      await getData();
      updatePageNumber();
    }catch (error){
      console.log(error);
    }
  })
  prevButton = createButton('Previous Page');
  prevButton.id('prevButton');
  prevButton.addClass('btn bg-primary btn-outline-grey text-dark')
  prevButton.mousePressed(async function(){
    page = page - 1;
    console.log(page);
    try{
      await getData();
      updatePageNumber();
    }catch (error){
      console.log(error);
    }
  })

  createSpan('Page: ').id('pageLabel');
  createSpan().id('pageNumber');
}

function updatePageNumber(){
  select('#pageNumber').html(page);
}

function analyzeCommitsSentiments() {
  dibujar = true;
  for (let i = 0; i < commits.length; i++) {
    getSentiment(commits[i].texto);
  }
}


function getSentiment(commit) {
  prediction = sentiment.predict(commit);
  console.log("Commit: " + commit + " Puntaje: " + prediction.score);
  commitsAnalizados.push({ commit: commit, puntaje: prediction.score });
}

function modelReady() {
  statusEl.html('Model Loaded');
}

function draw() {
  if (dibujar == true) {
    for (let i = 0; i < commitsAnalizados.length; i++) {
      createCard(commitsAnalizados[i].commit, commitsAnalizados[i].puntaje);
    }
    dibujar = false;
  }

}

function createCard(commit, score) {
  let card = createDiv('');
  pickColor(card, score);
  let scoreText = createP(`Puntaje: ${score}`);
  scoreText.parent(card);
  let commitText = createP(commit);
  commitText.parent(card);
  card.parent("#cardRow")
}

function pickColor(card, score) {
  let defClass = "card col-2 btn overflow-auto";
  if (score > 0.8) {
    card.addClass(`${defClass} btn-success bg-success`);
  } if(score<0.2) {
    card.addClass(`${defClass} btn-danger bg-danger`)
  }if(score>=0.21 && score<=0.4){
    card.addClass(`${defClass} btn-info bg-info`);
  }if(score>=0.4 && score<=0.6){
    card.addClass(`${defClass} btn-primary bg-primary`);
  }else{
    card.addClass(`${defClass} btn-secondary bg-secondary`);
  }
}
