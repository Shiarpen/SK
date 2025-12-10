// =====================
// Configuración global
// =====================
const WHATSAPP_NUMBER = "51999999999"; // <-- cámbialo aquí una sola vez

// =====================
// Utilidades
// =====================
function buildWhatsAppLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const encoded = encodeURIComponent(message);
  return `${base}?text=${encoded}`;
}

// =====================
// Carrusel (hero)
// =====================
const slides = document.querySelectorAll(".hero__slide");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("carouselDots");

let currentSlideIndex = 0;
let autoSlideInterval;

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("hero__dot");
    if (index === 0) dot.classList.add("hero__dot--active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
}

function setActiveDot(index) {
  const dots = dotsContainer.querySelectorAll(".hero__dot");
  dots.forEach((dot) => dot.classList.remove("hero__dot--active"));
  dots[index].classList.add("hero__dot--active");
}

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach((slide) => slide.classList.remove("hero__slide--active"));

  currentSlideIndex = (index + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add("hero__slide--active");
  setActiveDot(currentSlideIndex);
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function prevSlideFunc() {
  showSlide(currentSlideIndex - 1);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

// Inicializar carrusel
if (slides.length) {
  createDots();
  startAutoSlide();

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlideFunc();
    startAutoSlide();
  });

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("hero__dot")) {
      const index = parseInt(e.target.dataset.index, 10);
      showSlide(index);
      startAutoSlide();
    }
  });
}

// =====================
// Menú responsive
// =====================
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("header__nav--open");
  });

  // Cerrar menú al hacer click en un enlace
  mainNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("header__nav-link")) {
      mainNav.classList.remove("header__nav--open");
    }
  });
}

// =====================
// Botones "Comprar por WhatsApp"
// =====================
const productButtons = document.querySelectorAll(".product-card__btn");

productButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const productName = card?.dataset.product || "Producto SK Kids Wear";
    const message = `Hola, quiero comprar el siguiente producto de SK Kids Wear: ${productName}. ¿Está disponible?`;
    const link = buildWhatsAppLink(message);
    window.open(link, "_blank");
  });
});

// =====================
// Contacto por WhatsApp
// =====================
const contactoBtn = document.getElementById("btnContactoWhatsApp");
if (contactoBtn) {
  contactoBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre")?.value || "";
    const mensaje = document.getElementById("mensaje")?.value || "";
    const finalMessage =
      `Hola, soy ${nombre || "un cliente"} y me gustaría hacer una consulta: ` +
      `${mensaje || "(escribe aquí tu mensaje)"}`;
    const link = buildWhatsAppLink(finalMessage);
    window.open(link, "_blank");
  });
}

// =====================
// Año dinámico en footer
// =====================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
