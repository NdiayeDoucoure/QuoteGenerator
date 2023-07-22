const quoteTextElement = document.getElementById("quoteText");
const newQuoteButton = document.getElementById("newQuote");
const translateToFrenchButton = document.getElementById("translateToFrench");
const shareTwitterButton = document.getElementById("shareTwitter");

let quotes = [];
let currentQuoteLanguage = "english"; // Par défaut, les citations sont en anglais

// Fonction pour récupérer les citations en anglais depuis l'API "type.fit"
async function fetchEnglishQuotes() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();
    quotes = data.map((quoteData) => quoteData.text);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des citations:",
      error
    );
  }
}

// Fonction pour traduire une citation en français à l'aide de l'API "Mymemory"
async function translateToFrench(quote) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        quote
      )}&langpair=en|fr`
    );
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la traduction:", error);
    return quote;
  }
}

// Fonction pour générer une citation aléatoire en anglais ou en français
async function generateRandomQuote() {
  if (currentQuoteLanguage === "english") {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteTextElement.textContent = randomQuote;
  } else if (currentQuoteLanguage === "french") {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const translatedQuote = await translateToFrench(randomQuote);
    quoteTextElement.textContent = translatedQuote;
  }
}

newQuoteButton.addEventListener("click", async () => {
  await fetchEnglishQuotes();
  generateRandomQuote();
});

translateToFrenchButton.addEventListener("click", async () => {
  currentQuoteLanguage = "french";
  generateRandomQuote();
});

shareTwitterButton.addEventListener("click", function () {
  const textToTweet = quoteTextElement.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    textToTweet
  )}`;
  window.open(tweetUrl, "_blank");
});

// Charger des citations en anglais au démarrage de la page
fetchEnglishQuotes().then(generateRandomQuote);
