// Catálogo de servicios: filtros por categoría, búsqueda y ventana de detalle.

document.addEventListener("DOMContentLoaded", () => {
  const state = { categoria: "todos", busqueda: "" };

  const els = {
    filterList: document.getElementById("filter-list"),
    grid: document.getElementById("services-grid"),
    resultsCount: document.getElementById("results-count"),
    resultsTitle: document.getElementById("results-title"),
    searchInput: document.getElementById("search-input"),
    searchForm: document.getElementById("search-form"),
    modalRoot: document.getElementById("modal-root"),
    navToggle: document.getElementById("nav-toggle"),
    nav: document.getElementById("site-nav"),
  };

  function contarPorCategoria(id) {
    return id === "todos"
      ? SERVICIOS.length
      : SERVICIOS.filter((s) => s.categoria === id).length;
  }

  function renderFiltros() {
    els.filterList.innerHTML = CATEGORIAS.map(
      (cat) => `
      <li>
        <button type="button" data-cat="${cat.id}"
          class="${cat.id === state.categoria ? "active" : ""}">
          <span>${cat.nombre}</span>
          <span class="count">${contarPorCategoria(cat.id)}</span>
        </button>
      </li>`
    ).join("");
  }

  els.filterList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (!btn) return;
    state.categoria = btn.dataset.cat;
    renderFiltros();
    render();
  });

  els.searchForm.addEventListener("submit", (e) => e.preventDefault());
  els.searchInput.addEventListener("input", (e) => {
    state.busqueda = e.target.value.trim().toLowerCase();
    render();
  });

  function serviciosFiltrados() {
    return SERVICIOS.filter((s) => {
      const okCat = state.categoria === "todos" || s.categoria === state.categoria;
      const okTexto =
        !state.busqueda ||
        (s.nombre + " " + s.resumen + " " + s.descripcion)
          .toLowerCase()
          .includes(state.busqueda);
      return okCat && okTexto;
    });
  }

  function nombreCategoria(id) {
    const cat = CATEGORIAS.find((c) => c.id === id);
    return cat ? cat.nombre : id;
  }

  function tarjeta(s) {
    return `
      <article class="service-card">
        <div class="card-top">
          <span class="tag">${nombreCategoria(s.categoria)}</span>
          ${s.destacado ? '<span class="badge-featured">Destacado</span>' : ""}
        </div>
        <h3>${s.nombre}</h3>
        <p class="summary">${s.resumen}</p>
        <dl class="service-meta">
          <div><dt>Duración</dt><dd>${s.duracion}</dd></div>
          <div><dt>Modalidad</dt><dd>${s.modalidad}</dd></div>
          <div><dt>Nivel</dt><dd>${s.nivel}</dd></div>
        </dl>
        <div class="card-actions">
          <button type="button" class="btn-ghost" data-detalle="${s.id}">Ver detalle</button>
          <a class="btn-solid" href="views/solicitar-asesoria.html?servicio=${s.id}">Solicitar asesoría</a>
        </div>
      </article>`;
  }

  function render() {
    const lista = serviciosFiltrados();

    els.resultsTitle.textContent =
      state.categoria === "todos"
        ? "Todos los servicios"
        : nombreCategoria(state.categoria);

    els.resultsCount.textContent =
      lista.length === 1 ? "1 servicio" : `${lista.length} servicios`;

    if (lista.length === 0) {
      els.grid.innerHTML = `
        <div class="empty-state">
          <p>No hay servicios que coincidan con la búsqueda.</p>
          <p>Prueba con otras palabras o revisa todas las categorías.</p>
        </div>`;
      return;
    }

    els.grid.innerHTML = lista.map(tarjeta).join("");
  }

  function abrirModal(id) {
    const s = SERVICIOS.find((x) => x.id === id);
    if (!s) return;

    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-overlay>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-head">
            <div>
              <span class="modal-tag">${nombreCategoria(s.categoria)}</span>
              <h2 id="modal-title">${s.nombre}</h2>
            </div>
            <button type="button" class="modal-close" data-cerrar>Cerrar</button>
          </div>

          <p class="desc">${s.descripcion}</p>

          <dl class="modal-facts">
            <div><dt>Modalidad</dt><dd>${s.modalidad}</dd></div>
            <div><dt>Duración estimada</dt><dd>${s.duracion}</dd></div>
            <div><dt>Nivel</dt><dd>${s.nivel}</dd></div>
          </dl>

          <h3>Entregables</h3>
          <ul class="entregables">
            ${s.entregables.map((e) => `<li>${e}</li>`).join("")}
          </ul>

          <div class="modal-actions">
            <a class="btn-ghost" href="#" data-cerrar>Seguir explorando</a>
            <a class="btn-solid" href="views/solicitar-asesoria.html?servicio=${s.id}">Solicitar asesoría</a>
          </div>
        </div>
      </div>`;

    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    els.modalRoot.innerHTML = "";
    document.body.style.overflow = "";
  }

  els.grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-detalle]");
    if (btn) abrirModal(btn.dataset.detalle);
  });

  els.modalRoot.addEventListener("click", (e) => {
    if (e.target.matches("[data-overlay]") || e.target.closest("[data-cerrar]")) {
      e.preventDefault();
      cerrarModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });

  if (els.navToggle) {
    els.navToggle.addEventListener("click", () => {
      els.nav.classList.toggle("open");
    });
  }

  renderFiltros();
  render();
});
