window.AFP = window.AFP || {};

/* ==========================================================================
   Glossari — vista de termes clau amb cerca
   ========================================================================== */
AFP.glossaryView = (function () {
  function view() {
    var terms = AFP.glossaryData.slice();

    var letters = {};
    terms.forEach(function (t) {
      var l = t.term.charAt(0).toUpperCase();
      if (!letters[l]) letters[l] = [];
      letters[l].push(t);
    });

    var navLetters = Object.keys(letters).sort().map(function (l) {
      return '<a class="tag" href="#/glossari" data-filter="' + l + '" style="cursor:pointer">' + l + "</a>";
    }).join("");

    var list = terms.map(function (t) {
      var l = t.term.charAt(0).toUpperCase();
      return (
        '<div class="card" style="padding:var(--space-4)" data-letter="' + l + '">' +
          '<div class="flex items-center gap-2" style="margin-bottom:6px">' +
            '<span class="mono" style="color:var(--accent);font-weight:600">' + AFP.util.esc(t.term) + "</span>" +
          "</div>" +
          '<p class="muted" style="margin:0;font-size:var(--fs-sm)">' + AFP.util.esc(t.defCa) + "</p>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Glossari · Termes clau</div>' +
        "<h1>Glossari</h1>" +
        '<p class="muted">Termes essencials per a l\u2019examen AIF-C01. Fes clic a una lletra per filtrar o escriu per cercar.</p>' +
        '<div class="flex gap-2" style="flex-wrap:wrap;margin-bottom:var(--space-4)">' +
          '<a class="tag tag--accent" href="#/glossari" data-filter="all" style="cursor:pointer">Tots</a>' +
          navLetters +
        "</div>" +
        '<div class="flex gap-2" style="margin-bottom:var(--space-5)">' +
          '<input class="glossary-search" type="search" placeholder="Cerca un terme…" style="flex:1;max-width:360px" />' +
        "</div>" +
        '<div class="grid glossary-list">' + list + "</div>" +
        '<div class="stat"><span class="stat__num" id="glossary-count" style="font-size:1rem">' + terms.length + "</span><span class=\"stat__label\">termes</span></div>" +
      "</div>"
    );
  }

  /* Estils inline mínims per al cercador ja que encara no hi ha .input al CSS */
  function postRender() {
    var input = document.querySelector(".glossary-search");
    var list = document.querySelector(".glossary-list");
    var count = document.getElementById("glossary-count");
    if (!input || !list) return;
    input.style.cssText = "padding:10px 14px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--surface);color:var(--text);font-family:var(--font-body);font-size:var(--fs-sm)";
    input.addEventListener("input", function () {
      var q = input.value.toLowerCase().trim();
      Array.prototype.forEach.call(list.children, function (el) {
        var term = (el.querySelector(".mono") ? el.querySelector(".mono").textContent : "").toLowerCase();
        el.style.display = (!q || term.indexOf(q) >= 0) ? "" : "none";
      });
      if (count) {
        var shown = Array.prototype.filter.call(list.children, function (e) { return e.style.display !== "none"; }).length;
        count.textContent = shown;
      }
    });
  }

  return { view: view, postRender: postRender };
})();
