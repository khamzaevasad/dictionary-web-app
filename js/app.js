import "./mode.js";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordContainer = document.getElementById("wordContainer");
const player = document.getElementById("player");
const playerBtn = document.getElementById("playerBtn");
const searchBtn = document.getElementById("searchBtn");

playerBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playerBtn.textContent = "⏸";
  } else {
    player.pause();
    playerBtn.textContent = "▶";
  }
});

searchBtn.addEventListener("click", () => {
  let searchVal = document.getElementById("searchTerm").value;

  fetch(`${url}${searchVal}`)
    .then((data) => data.json())
    .then((data) => {
      const item = data[0];

      const { word, phonetic, phonetics, meanings, license, sourceUrls } = item;
      const audio = phonetics[0];

      //   wordContainer.innerHTML = "";

      const searchTitle = document.querySelector(".search-title");
      const promotion = document.querySelector(".promotion");
      const meaningTitle = document.querySelector(".meaning-title");

      searchTitle.textContent = word;
      promotion.textContent = phonetic;
      player.src = audio.audio;
      meaningTitle.textContent = meanings[0].partOfSpeech;
      console.log(meaningTitle);
    });
});
