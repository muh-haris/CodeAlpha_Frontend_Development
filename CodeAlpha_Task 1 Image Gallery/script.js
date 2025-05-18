const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImages[currentIndex].src;
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => showLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
