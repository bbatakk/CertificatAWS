window.AFP = window.AFP || {};

/* ==========================================================================
   App: shell, navegació, tema i pàgina d'inici (dashboard)
   ========================================================================== */
AFP.app = (function () {
  var icons = {
    gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6a6 6 0 1 0 6 6"/><path d="M12 8a4 4 0 1 0 4 4"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    practice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    summary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 0 1 6 0c0 3-3 2-3 5"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    exam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    glossary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    stats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  /* Navegació principal */
  var nav = [
    { label: "Inici", hash: "#/", icon: "gauge" },
    { label: "Teoria", hash: "#/teoria", icon: "book" },
    { label: "Pràctica", hash: "#/practica", icon: "practice" },
    { label: "Resums", hash: "#/resums", icon: "summary" },
    { label: "Qüestionaris", hash: "#/quiz", icon: "quiz" },
    { label: "Simulador", hash: "#/examen", icon: "exam" },
    { label: "Targetes", hash: "#/targetes", icon: "cards" },
    { label: "Glossari", hash: "#/glossari", icon: "glossary" },
    { label: "Estadístiques", hash: "#/estadistiques", icon: "stats" },
    { label: "Guia d'examen", hash: "#/guia", icon: "guide" }
  ];

  function activeHash() {
    return window.location.hash || "#/";
  }

  function navItemHTML(item) {
    var hash = activeHash();
    var isActive = hash === item.hash || (item.hash !== "#/" && hash.indexOf(item.hash) === 0);
    return (
      '<a class="nav__item' + (isActive ? " is-active" : "") + '" href="' + item.hash + '">' +
        '<span class="nav__icon">' + icons[item.icon] + "</span>" +
        "<span>" + item.label + "</span></a>"
    );
  }

  function domainNavHTML() {
    return (
      '<div class="nav__label">Dominis d\u2019examen</div>' +
      AFP.domains.map(function (d) {
        return (
          '<a class="nav__item" href="#/teoria/' + d.id + '">' +
            '<span class="nav__icon tag tag--' + AFP.util.domainColor(d.id) + '" style="width:auto;height:auto;padding:1px 7px;">' + d.code + "</span>" +
            "<span>" + d.nameCa + "</span>" +
            '<span class="nav__badge">' + d.weight + "%</span></a>"
        );
      }).join("")
    );
  }

  function buildShell() {
    var theme = AFP.store.getTheme();
    var pct = AFP.progress.overallPct();

    var html =
      '<div class="sidebar" id="sidebar">' +
        '<div class="sidebar__brand">' +
          '<div class="brand-mark">AI</div>' +
          '<div class="brand-text">' +
            '<span class="brand-text__name">AI Practitioner</span>' +
            '<span class="brand-text__sub">AIF-C01 · Study Lab</span>' +
          "</div>" +
          '<button class="icon-btn ml-auto menu-btn" data-action="close-sidebar" aria-label="Tanca el menú">' + icons.menu + "</button>" +
        "</div>" +
        '<nav class="nav">' +
          nav.map(navItemHTML).join("") +
          domainNavHTML() +
        "</nav>" +
        '<div class="sidebar__foot">' +
          '<div class="readiness-mini">' +
            '<svg class="readiness-mini__ring" width="40" height="40" viewBox="0 0 40 40">' +
              '<circle cx="20" cy="20" r="16" fill="none" stroke="var(--surface-3)" stroke-width="4"/>' +
              '<circle cx="20" cy="20" r="16" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 16) + '" stroke-dashoffset="' + (2 * Math.PI * 16 * (1 - pct / 100)) + '" transform="rotate(-90 20 20)" style="transition: stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)"/>' +
            "</svg>" +
            '<div class="readiness-mini__meta">' +
              '<span class="readiness-mini__val">' + pct + "%</span>" +
              '<span class="readiness-mini__label">Progrés global</span>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="sidebar-backdrop" data-action="close-sidebar"></div>' +
      '<div class="main">' +
        '<header class="header">' +
          '<button class="icon-btn menu-btn" data-action="open-sidebar" aria-label="Obre el menú">' + icons.menu + "</button>" +
          '<div>' +
            '<div class="header__title">AWS Certified AI Practitioner</div>' +
            '<div class="header__crumb" id="header-crumb">AIF-C01</div>' +
          "</div>" +
          '<div class="header__actions">' +
            '<button class="icon-btn" data-action="toggle-theme" aria-label="Canvia de tema">' +
              '<span data-theme-icon>' + (theme === "dark" ? icons.sun : icons.moon) + "</span>" +
            "</button>" +
          "</div>" +
        "</header>" +
        '<div class="main__body">' +
          AFP.router.render() +
        "</div>" +
      "</div>";

    document.getElementById("app").innerHTML = html;
    document.documentElement.setAttribute("data-theme", theme);
    bindShellEvents();
    postRender();
  }

  function bindShellEvents() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el) return;
      var action = el.getAttribute("data-action");
      if (action === "open-sidebar") {
        document.querySelector(".sidebar").classList.add("is-open");
        document.querySelector(".sidebar-backdrop").classList.add("is-open");
      } else if (action === "close-sidebar") {
        document.querySelector(".sidebar").classList.remove("is-open");
        document.querySelector(".sidebar-backdrop").classList.remove("is-open");
      } else if (action === "toggle-theme") {
        var cur = AFP.store.getTheme();
        var next = cur === "dark" ? "light" : "dark";
        AFP.store.setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        var span = document.querySelector("[data-theme-icon]");
        if (span) span.innerHTML = next === "dark" ? icons.sun : icons.moon;
      }
    });
  }

  function setCrumb(text) {
    var c = document.getElementById("header-crumb");
    if (c && text !== undefined) c.textContent = text;
  }

  function postRender() {
    // Recalcula el crumb i el progrés del sidebar
    var sb = document.querySelector(".sidebar");
    if (sb) {
      var pct = AFP.progress.overallPct();
      var ring = sb.querySelector(".readiness-mini__ring circle:last-child");
      if (ring) ring.setAttribute("stroke-dashoffset", 2 * Math.PI * 16 * (1 - pct / 100));
      var val = sb.querySelector(".readiness-mini__val");
      if (val) val.textContent = pct + "%";
    }
    // Post-renderen els mòduls de vista segons la ruta activa
    var hash = window.location.hash || "#/";
    if (hash.indexOf("#/glossari") === 0 && AFP.glossaryView) AFP.glossaryView.postRender();
    if (hash.indexOf("#/quiz/") === 0 && AFP.quiz) AFP.quiz.postRender();
    if (hash.indexOf("#/examen") === 0 && AFP.exam) AFP.exam.postRender();
    if (hash.indexOf("#/teoria") === 0 && AFP.theory) AFP.theory.postRender();
    if (hash.indexOf("#/targetes") === 0 && AFP.flashcards) AFP.flashcards.postRender();
    if (hash.indexOf("#/estadistiques") === 0 && AFP.stats) AFP.stats.postRender();
  }

  /* -------------------------------- Rutes -------------------------------- */

  function dashboard() {
    var ready = AFP.progress.readiness();
    var pct = AFP.progress.overallPct();
    var stats = AFP.progress.domainStats();

    var gaugeC = 160;
    var gaugeR = 68;
    var gaugeCirc = 2 * Math.PI * gaugeR;
    var offset = gaugeCirc * (1 - ready / 100);

    var hero =
      '<div class="hero">' +
        "<div>" +
          '<div class="eyebrow">Exam prep · AIF-C01</div>' +
          '<h1 class="hero__title">Preparació per a l\u2019AWS Certified AI Practitioner</h1>' +
          '<p class="hero__lead">Estudia els 5 dominis de l\u2019examen amb teoria, resums, qüestionaris autoavaluables i un simulador cronometrat. Tot, amb un únic objectiu: aprovar.</p>' +
          '<div class="hero__stats">' +
            '<div class="stat"><span class="stat__num">5</span><span class="stat__label">Dominis</span></div>' +
            '<div class="stat"><span class="stat__num">' + AFP.progress.countTotalTopics() + '</span><span class="stat__label">Temes</span></div>' +
            '<div class="stat"><span class="stat__num">65</span><span class="stat__label">Preguntes examen</span></div>' +
            '<div class="stat"><span class="stat__num">90</span><span class="stat__label">Minuts</span></div>' +
          "</div>" +
          '<div class="mt-4 flex gap-2" style="flex-wrap:wrap">' +
            '<a class="btn btn--primary" href="#/teoria">' + icons.book + ' Comença la teoria</a>' +
            '<a class="btn" href="#/examen">' + icons.exam + ' Fes el simulador</a>' +
          "</div>" +
        "</div>" +
        '<div class="hero__gauge">' +
          '<div class="gauge">' +
            '<svg width="' + gaugeC + '" height="' + gaugeC + '" viewBox="0 0 ' + gaugeC + " " + gaugeC + '">' +
              '<circle class="gauge__track" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="14"/>' +
              '<circle class="gauge__glow" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="14" stroke-dasharray="' + gaugeCirc + '" stroke-dashoffset="' + offset + '"/>' +
              '<circle class="gauge__value" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="14" stroke-dasharray="' + gaugeCirc + '" stroke-dashoffset="' + offset + '"/>' +
            "</svg>" +
            '<div class="gauge__center">' +
              '<div class="gauge__num">' + ready + '</div>' +
              '<div class="gauge__unit">% READY</div>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    var domainProgress =
      '<div class="section-title"><h2>Progrés per domini</h2><span class="tag">' + pct + '% complet</span></div>' +
      '<div class="card">' +
        stats.map(function (s) {
          return (
            '<a class="domain-row" style="color:inherit" href="#/teoria/' + s.domain.id + '">' +
              '<div class="domain-row__meta">' +
                '<div class="domain-row__head">' +
                  '<span class="tag tag--' + AFP.util.domainColor(s.domain.id) + '">' + s.domain.code + "</span>" +
                  '<span class="domain-row__name">' + s.domain.nameCa + "</span>" +
                "</div>" +
                '<div class="bar"><div class="bar__fill" style="width:' + s.pct + '%"></div></div>' +
              "</div>" +
              '<span class="domain-row__pct">' + s.done + "/" + s.total + "</span>" +
            "</a>"
          );
        }).join("") +
      "</div>";

    var quick =
      '<div class="section-title"><h2>Accés ràpid</h2></div>' +
      '<div class="grid grid--3">' +
        quickCard("#/quiz", "quiz", "Qüestionaris", "Autoavalua\u2019t per domini amb nota i explicacions") +
        quickCard("#/examen", "exam", "Simulador", "65 preguntes en 90 minuts, com l\u2019examen real") +
        quickCard("#/targetes", "cards", "Targetes", "Repàs espaiat dels conceptes clau") +
      "</div>";

    return '<div class="content">' + hero + domainProgress + quick + "</div>";
  }

  function quickCard(href, icon, title, desc) {
    return (
      '<a class="card card--hover" href="' + href + '" style="color:inherit">' +
        '<div class="card__head">' +
          '<span class="nav__icon" style="color:var(--accent)">' + icons[icon] + "</span>" +
          '<span class="card__title">' + title + "</span>" +
        "</div>" +
        '<p class="muted muted-2" style="font-size:var(--fs-sm);margin:0">' + desc + "</p>" +
      "</a>"
    );
  }

  function notFound() {
    return (
      '<div class="content"><div class="empty">' +
        '<div class="empty__icon">' + icons.quiz + "</div>" +
        '<div class="empty__title">Pàgina no trobada</div>' +
        '<p class="empty__text">Aquesta secció encara no existeix o està en construcció.</p>' +
        '<a class="btn btn--primary" href="#/">Torna a l\u2019inici</a>' +
      "</div></div>"
    );
  }

  function registerRoutes() {
    AFP.router.register("/", dashboard);
    AFP.router.register("/teoria", function () { return AFP.theory ? AFP.theory.indexView() : placeholder("Teoria"); });
    AFP.router.register("/teoria/:id", function (p) { return AFP.theory ? AFP.theory.topicView(p.id, null) : placeholder("Teoria", p.id); });
    AFP.router.register("/teoria/:id/:topic", function (p) { return AFP.theory ? AFP.theory.topicView(p.id, p.topic) : placeholder("Teoria", p.id); });
    AFP.router.register("/practica", function () { return AFP.practiceView ? AFP.practiceView.indexView() : placeholder("Pràctica"); });
    AFP.router.register("/practica/:id", function (p) { return AFP.practiceView ? AFP.practiceView.itemView(p.id) : placeholder("Pràctica", p.id); });
    AFP.router.register("/resums", function () { return AFP.summaries ? AFP.summaries.indexView() : placeholder("Resums"); });
    AFP.router.register("/resums/:id", function (p) { return AFP.summaries ? AFP.summaries.itemView(p.id) : placeholder("Resums", p.id); });
    AFP.router.register("/quiz", function () { return AFP.quiz ? AFP.quiz.indexView() : placeholder("Qüestionaris"); });
    AFP.router.register("/quiz/:id", function (p) { return AFP.quiz ? AFP.quiz.startView(p.id) : placeholder("Qüestionari", p.id); });
    AFP.router.register("/examen", function () { return AFP.exam ? AFP.exam.indexView() : placeholder("Simulador"); });
    AFP.router.register("/examen/correu", function () { return AFP.exam ? AFP.exam.runView() : placeholder("Simulador"); });
    AFP.router.register("/examen/resultat", function () { return AFP.exam ? AFP.exam.resultView() : placeholder("Simulador"); });
    AFP.router.register("/targetes", function () { return AFP.flashcards ? AFP.flashcards.indexView() : placeholder("Targetes"); });
    AFP.router.register("/targetes/repassa", function () { return AFP.flashcards ? AFP.flashcards.startReview() : placeholder("Targetes"); });
    AFP.router.register("/glossari", function () { return AFP.glossaryView ? AFP.glossaryView.view() : placeholder("Glossari"); });
    AFP.router.register("/estadistiques", function () { return AFP.stats ? AFP.stats.view() : placeholder("Estadístiques"); });
    AFP.router.register("/guia", function () { return AFP.guide ? AFP.guide.view() : placeholder("Guia d'examen"); });
    AFP.router.setFallback(notFound);
  }

  function placeholder(title, id) {
    return (
      '<div class="content">' +
        '<div class="eyebrow">Secció en construcció</div>' +
        "<h1>" + title + "</h1>" +
        '<div class="empty"><div class="empty__icon">' + icons.quiz + '</div>' +
        '<div class="empty__title">Aviat disponible</div>' +
        '<p class="empty__text">Aquest mòdul es desenvoluparà en les properes fases.</p></div>' +
      "</div>"
    );
  }

  function init() {
    registerRoutes();
    buildShell();
  }

  return {
    init: init,
    postRender: postRender,
    setCrumb: setCrumb,
    icons: icons
  };
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", AFP.app.init);
} else {
  AFP.app.init();
}
