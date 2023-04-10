const playBtn = document.getElementById("play");
const musicContainer = document.getElementById("musicContainer");
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const imgCover = document.getElementById("cover");
const title = document.getElementById("title");

// const songs = ["hey", "summer", "ukulele"];
import { title } from "./melonchart.js";
import { rank } from "./melonchart.js";
let songIndex = rank;

loadSong(title[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `https://www.last.fm/music/${artist}/_/${title}`;
  //   imgCover.src = `http://127.0.0.1:5500/images/${song}.jpg`;
}

function playMusic() {
  musicContainer.classList.add("play");

  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

  audio.play();
}

function pauseMusic() {
  musicContainer.classList.remove("play");
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

  audio.pause();
}

function playPrevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = title.length - 1;
  }

  loadSong(title[songIndex]);

  playMusic();
}

function playNextSong() {
  songIndex++;

  if (songIndex > 2) {
    songIndex = 0;
  }

  loadSong(title[songIndex]);
  playMusic();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPer = (currentTime / duration) * 100;

  progress.style.width = `${progressPer}%`;
}

function changeProgress(e) {
  const width = e.target.clientWidth; // 전체 넓이

  const offsetX = e.offsetX; // 현재 x 좌표;

  const duration = audio.duration; // 재생길이

  audio.currentTime = (offsetX / width) * duration;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prevBtn.addEventListener("click", playPrevSong);
nextBtn.addEventListener("click", playNextSong);
audio.addEventListener("ended", playNextSong);
audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", changeProgress);
