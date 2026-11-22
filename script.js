// Debate map: open one side at a time. Each side is linkable (#for, #against, #law, #now).
const sides = ["for", "against", "law", "now"];
const cards = document.querySelectorAll(".card[data-side]");
const panels = document.querySelectorAll(".panel[data-side]");

function open(side, scroll) {
  cards.forEach(c => c.setAttribute("aria-expanded", String(c.dataset.side === side)));
  panels.forEach(p => { p.hidden = p.dataset.side !== side; });
  if (scroll) document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
}

cards.forEach(c => c.addEventListener("click", () => {
  if (location.hash !== "#" + c.dataset.side) location.hash = c.dataset.side;
  else open(c.dataset.side, false);
}));

document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => {
  location.hash = b.dataset.go;
}));

function fromHash() {
  const h = location.hash.slice(1);
  if (sides.includes(h)) open(h, true);
}
addEventListener("hashchange", fromHash);
if (sides.includes(location.hash.slice(1))) fromHash(); else open("for", false);

// YouTube embeds load only on the real site (GitHub Pages / local preview).
// Elsewhere (like the Claude preview) a plain link shows instead.
const canEmbed = /github\.io$|localhost|127\.0\.0\.1/.test(location.hostname) || location.protocol === "file:";
document.querySelectorAll("[data-youtube]").forEach(el => {
  const id = el.dataset.youtube;
  if (canEmbed && id) {
    el.classList.remove("slot");
    el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${el.dataset.title || "Video"}" loading="lazy" allowfullscreen></iframe>`;
  }
});
