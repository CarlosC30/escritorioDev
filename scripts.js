const btnMenu = document.getElementById("btn-menu");
const nav = document.getElementById("main-nav");

btnMenu.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  btnMenu.setAttribute("aria-expanded", opened);
});


document.querySelectorAll("#main-nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const section = document.querySelector(anchor.getAttribute("href"));
    if (!section) return;

    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
});



const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");

const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalBook = document.getElementById("modal-book");

modalClose.addEventListener("click", () => modal.classList.remove("is-open"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("is-open");
});


document.querySelectorAll(".service").forEach(service => {
  service.addEventListener("click", e => {
    const action = e.target.dataset.action;
    if (!action) return;

    const name = service.dataset.name;
    const stitch = service.dataset.stitch;

    const descriptions = {
      civil: "Atendimento completo em contratos, responsabilidade civil, cobranças e imóveis.",
      trabalhista: "Auxiliamos em reclamações trabalhistas, acordos, rescisões e direitos do empregado.",
      familia: "Especialistas em guarda, pensão, divórcio, reconhecimento de união e acordos.",
      empresarial: "Consultoria, compliance, contratos comerciais e contencioso empresarial."
    };

   
    modalTitle.textContent = name;
    modalBody.textContent = descriptions[stitch] || "Informações em breve.";
    
   
    modal.classList.add("is-open");

   
    modalBook.onclick = () => {
      document.getElementById("service-select").value = name;
      modal.classList.remove("is-open");

      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };
  });
});



document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service-select").value;
  const message = document.getElementById("message").value.trim();

  const text = `
Olá, meu nome é *${name}*.
Telefone: ${phone}

Gostaria de atendimento sobre:
*${service || "Não informado"}*

Mensagem:
${message || "Nenhuma mensagem enviada."}
`;

  const url = "https://wa.me/5562999999999?text=" + encodeURIComponent(text);

  window.open(url, "_blank");
});



document.getElementById("send-email").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service-select").value;
  const message = document.getElementById("message").value.trim();

  const subject = `Atendimento - ${service || "Novo Contato"}`;
  const text = `
Nome: ${name}
Telefone: ${phone}
Serviço desejado: ${service}
Mensagem:
${message}
`;

  const mailto = `mailto:seuemail@seudominio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  window.location.href = mailto;
});



const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".service, .person, .hero, .section-title").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
