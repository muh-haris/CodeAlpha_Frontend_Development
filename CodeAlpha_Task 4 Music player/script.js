const songs = [
  { name: "song1", title: "Godsown", artist: "Apexbeats" },
  { name: "song2", title: "Starlight", artist: "Apexbeats" },
  { name: "song3", title: "World", artist: "Apexbeats" }
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = "❚❚";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentIndex]);
  playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(songs[currentIndex]);
  playSong();
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  if (audio.duration) {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", nextSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Load first song
loadSong(songs[currentIndex]);
