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

  items.forEach((el, i) => (el.closest(".shot, .stage, .paper") || el).addEventListener("click", () => show(i)));
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

// Sections ease in as they scroll into view. The hiding style only applies once this script
// is running (it adds the "js" class itself), so a blocked or failed script can never hide content.
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) return;
  document.documentElement.classList.add("js");
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }));
  els.forEach((e) => io.observe(e));
  // Safety net: if anything is still hidden a few seconds after it should have appeared, show everything.
  window.addEventListener("load", () => setTimeout(() => {
    els.forEach((e) => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add("in"); });
  }, 1500));
})();
