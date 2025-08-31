import "./mode.js";
import { getData } from "./request.js";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordContainer = document.getElementById("wordContainer");
const player = document.getElementById("player");
const playerBtn = document.getElementById("playerBtn");
const searchBtn = document.getElementById("searchBtn");
const nounMeaningContainer = document.querySelector(".meaning-lists");
const verbMeaningLists = document.querySelector(".verb-meaning-lists");
const empty = document.getElementById("empty");

playerBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playerBtn.src = "../images/icon-play.svg";
  } else {
    player.pause();
    playerBtn.src = "../images/icon-play.svg";
  }
});

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  nounMeaningContainer.innerHTML = "";
  let searchVal = document.getElementById("searchTerm").value;
  const data = await getData(`${url}${searchVal}`);

  if (!data || data.length === 0) {
    empty.classList.remove("hidden");
    wordContainer.classList.add("hidden");
    return;
  } else {
    wordContainer.classList.remove("hidden");
  }

  const item = data[0];
  const { phonetics, meanings, sourceUrls } = item;
  const audio = phonetics[0];

  const definitions = item.meanings.flatMap((m) =>
    m.definitions.map((d) => d.definition)
  );

  const verbMeanings = item.meanings.filter((m) => m.partOfSpeech === "verb");

  const verbDefinitions = verbMeanings.flatMap((m) =>
    m.definitions.map((d) => d.definition)
  );

  console.log(verbDefinitions);

  if (item) {
    const searchTitle = document.querySelector(".search-title");
    const promotion = document.querySelector(".promotion");
    const meaningTitle = document.querySelector(".meaning-title");
    const footerBold = document.querySelector(".footer-bold");
    const wordEx = document.querySelector(".word-ex");
    const verb = document.getElementById("verb");
    const srcWord = document.getElementById("srcWord");

    searchTitle.textContent = item.word;
    promotion.textContent = item.phonetic;
    player.src = audio.audio;
    meaningTitle.textContent = meanings[0].partOfSpeech;
    footerBold.textContent = meanings[0].synonyms;
    verb.textContent = verbDefinitions;
    wordEx.textContent = verbDefinitions;
    srcWord.href = sourceUrls;
    srcWord.textContent = sourceUrls;

    definitions.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list");
      const img = document.createElement("img");
      img.src = "../images/Oval.svg";
      img.alt = "oval";
      img.classList.add("ovel");
      const p = document.createElement("p");
      p.classList.add("list-subtitle");
      p.textContent = item;
      li.append(img, p);
      nounMeaningContainer.appendChild(li);
    });
  }

  // wordContainer.classList.remove("hidden");
});

// searchBtn.addEventListener("click", () => {
//   let searchVal = document.getElementById("searchTerm").value;

//   fetch(`${url}${searchVal}`)
//     .then((data) => data.json())
//     .then((data) => {
//       const item = data[0];

//       const { word, phonetic, phonetics, meanings, license, sourceUrls } = item;
//       const audio = phonetics[0];

//       //   wordContainer.innerHTML = "";

//       const searchTitle = document.querySelector(".search-title");
//       const promotion = document.querySelector(".promotion");
//       const meaningTitle = document.querySelector(".meaning-title");

//       searchTitle.textContent = word;
//       promotion.textContent = phonetic;
//       player.src = audio.audio;
//       meaningTitle.textContent = meanings[0].partOfSpeech;
//       console.log(meaningTitle);
//     });
// });
