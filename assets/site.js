// Click any image marked data-zoom to view it large; arrow keys step through the page's images.
(function () {
  const items = Array.from(document.querySelectorAll("[data-zoom]"));
  if (!items.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<button class="prev" aria-label="Previous image">&#8249;</button><img alt=""><p></p><button class="next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector("p");
  let at = 0;

  function show(i) {
    at = (i + items.length) % items.length;
    const el = items[at];
    img.src = el.dataset.zoom;
    img.alt = el.alt || "";
    cap.textContent = el.dataset.caption || el.alt || "";
    box.classList.add("open");
  }
  function close() { box.classList.remove("open"); img.removeAttribute("src"); }

  items.forEach((el, i) => (el.closest(".shot, .stage") || el).addEventListener("click", () => show(i)));
  box.addEventListener("click", (e) => {
    if (e.target.classList.contains("prev")) show(at - 1);
    else if (e.target.classList.contains("next")) show(at + 1);
    else close();
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
})();
