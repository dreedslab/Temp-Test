'use strict';
//Get Quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];
//Show new quote
function newQuote() {
  loading();
  // Math.trunc(Math.random() * getQuotes.length) + 1;
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length) + 1];

  //Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Great Unknown!';
  } else {
    authorText.textContent = quote.author;
  }
  //Check the quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //Set Quote , Hide Loader
  quoteText.textContent = quote.text;
  complete();

  quoteText.textContent = quote.text;
}

async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }
}

//Tweet Qute
function postQuote() {
  const facebookrUrl = `https://www.facebook.com/facebook?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(facebookrUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
facebookBtn.addEventListener('click', postQuote);

//On Load
getQuotes();

// loading();
