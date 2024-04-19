let sentiment;
let statusEl;
let submitButton;
let inputBox;
let sentimentResult;

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
