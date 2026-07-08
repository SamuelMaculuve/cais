const pages = [
  ["index.html", "Home"],
  ["about.html", "Sobre"],
  ["services.html", "Serviços"],
  ["portfolio.html", "Portfólio"],
  ["process.html", "Processo"],
  ["industries.html", "Indústrias"],
  ["insights.html", "Insights"],
  ["faq.html", "FAQ"],
  ["contact.html", "Contacto"]
];

const current = location.pathname.split("/").pop() || "index.html";

function icon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" aria-hidden="true"></i>`;
}

function renderHeader() {
  const target = document.querySelector("[data-header]");
  if (!target) return;

  target.innerHTML = `
    <header class="site-header" id="site-header">
      <div class="nav-shell">
        <a class="brand" href="index.html" aria-label="CAIS Comunicação e Consultoria">
          <img src="assets/img/cais-logo.png" alt="CAIS Comunicação & Consultoria" width="180" height="140">
        </a>
        <nav class="nav-links" aria-label="Menu principal">
          ${pages.map(([href, label]) => `<a href="${href}" ${current === href ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <a class="btn btn-primary nav-cta" href="contact.html">${icon("send")} Falar connosco</a>
        <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">${icon("menu")}</button>
      </div>
    </header>`;
}

function renderFooter() {
  const target = document.querySelector("[data-footer]");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="shell grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div>
          <img src="assets/img/cais-logo.png" alt="CAIS Comunicação & Consultoria" class="mb-6 w-36 bg-white p-3" width="180" height="140">
          <p class="max-w-sm text-sm leading-7 text-white/65">Clareza, posicionamento e influência para instituições, profissionais e marcas que querem comunicar com direção.</p>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-black uppercase tracking-wide text-[var(--gold-soft)]">Mapa</h2>
          <div class="grid gap-3 text-sm">
            <a href="services.html">Serviços</a>
            <a href="portfolio.html">Portfólio</a>
            <a href="process.html">Processo</a>
            <a href="contact.html">Contacto</a>
          </div>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-black uppercase tracking-wide text-[var(--gold-soft)]">Especialidades</h2>
          <div class="grid gap-3 text-sm text-white/65">
            <span>Comunicação institucional</span>
            <span>Consultoria de carreira</span>
            <span>Conteúdo audiovisual</span>
            <span>Mentoria estratégica</span>
          </div>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-black uppercase tracking-wide text-[var(--gold-soft)]">Contacto</h2>
          <div class="grid gap-3 text-sm">
            <a href="mailto:hello@cais.co.mz">hello@cais.co.mz</a>
            <a href="tel:+258840000000">+258 84 000 0000</a>
            <span class="text-white/65">Maputo, Moçambique</span>
          </div>
        </div>
      </div>
      <div class="shell mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 CAIS Comunicação & Consultoria. Todos os direitos reservados.</p>
        <p>Website estático preparado para futura integração CMS.</p>
      </div>
    </footer>`;
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    const iconEl = toggle.querySelector("i");
    if (iconEl) iconEl.setAttribute("data-lucide", open ? "x" : "menu");
    if (window.lucide) window.lucide.createIcons();
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .4 });

  counters.forEach((counter) => observer.observe(counter));
}

function initFaq() {
  document.querySelectorAll(".faq-button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });
}

function initForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (status) status.textContent = "Obrigado. A sua mensagem foi preparada para envio na futura integração do formulário.";
    form.reset();
  });
}

renderHeader();
renderFooter();
initNav();
initReveal();
initCounters();
initFaq();
initForm();
if (window.lucide) window.lucide.createIcons();
