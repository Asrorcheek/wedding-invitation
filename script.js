const experience = document.querySelector("#experience");
const openButton = document.querySelector("#openInvitation");
const openingNote = document.querySelector("#openingNote");
const petalField = document.querySelector("#petals");

for (let index = 0; index < 16; index += 1) {
  const petal = document.createElement("i");
  const size = 8 + (index % 4) * 3;
  petal.className = `petal petal-${index % 3}`;
  petal.style.left = `${4 + ((index * 19) % 92)}%`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.animationDelay = `${(index % 8) * 0.28}s`;
  petal.style.animationDuration = `${5.8 + (index % 5) * 0.7}s`;
  petalField.append(petal);
}

openButton.addEventListener("click", () => {
  experience.classList.add("is-open");
  openButton.setAttribute("aria-expanded", "true");
  openingNote.textContent = "Muhabbat bilan…";
});
