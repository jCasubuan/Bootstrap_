// Navbar Scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY >= 56) navbar.classList.add("navbar-scrolled");
    else navbar.classList.remove("navbar-scrolled");
});

const player = document.getElementById("player");
const bar = document.getElementById("musicPlayerBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const playerImage = document.getElementById("playerImage");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

// Build playlist from your tiles
let playlist = [];
document.querySelectorAll(".music-card").forEach(card => {
    const tile = card.querySelector(".music-tile");
    const title = card.querySelector(".music-title").innerText;
    const img = card.querySelector("img").src;

    playlist.push({
        src: tile.getAttribute("data-src"),
        title: title,
        img: img
    });
});

let currentIndex = 0;

// Play song by index
function loadSong(index) {
    currentIndex = index;
    const song = playlist[index];

    player.src = song.src;
    player.play();

    playerImage.src = song.img;

    const parts = song.title.split(" – ");
    playerTitle.innerHTML = parts[0];
    playerArtist.innerHTML = parts[1] ?? "";

    bar.style.display = "flex";
    playPauseBtn.innerText = "⏸";
}

// Tile click handler
document.querySelectorAll(".music-tile").forEach((tile, index) => {
    tile.addEventListener("click", () => {
        tile.classList.add("loading");

        setTimeout(() => {
            tile.classList.remove("loading");
            loadSong(index);
        }, 1500);
    });
});

// Play / Pause
const playPauseIcon = document.getElementById("playPauseIcon");

playPauseBtn.addEventListener("click", () => {
    if (player.paused) {
        player.play();
        playPauseIcon.innerText = "pause";
    } else {
        player.pause();
        playPauseIcon.innerText = "play_arrow";
    }
});

// Next
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

// Previous
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
});