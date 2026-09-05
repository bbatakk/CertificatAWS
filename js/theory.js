window.AFP = window.AFP || {};

/* ==========================================================================
   Teoria — renderitzat dels temes, navegació, progrés i adreces d'interès
   ========================================================================== */
AFP.theory = (function () {
  var theoryByDomain = { 1: "theoryD1", 2: "theoryD2", 3: "theoryD3", 4: "theoryD4", 5: "theoryD5" };

  function getTopics(domainId) {
    var key = theoryByDomain[domainId];
    return (key && AFP[key]) ? AFP[key] : [];
  }

  /* ---------------------------- Bloc renderer ---------------------------- */

  function renderBlock(b, ctx) {
    switch (b.t) {
      case "h":
        return "<h3 class=\"theory-h\">" + b.c + "</h3>";
      case "p":
        return "<p>" + b.c + "</p>";
      case "list":
        return "<ul class=\"theory-list\">" + b.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
      case "def":
        return (
          '<div class="def">' +
            '<span class="def__term mono">' + AFP.util.esc(b.en) + "</span>" +
            '<span class="def__sep">—</span>' +
            '<span class="def__body">' + b.ca + "</span>" +
          "</div>"
        );
      case "callout":
        var kind = b.kind || "tip";
        var kindLabel = kind === "warn" ? "Atenció" : kind === "exam" ? "Clau d'examen" : "Consell";
        var kindTag = kind === "warn" ? "danger" : kind === "exam" ? "accent" : "teal";
        return (
          '<aside class="callout callout--' + kind + '">' +
            '<div class="callout__head"><span class="tag tag--' + kindTag + '">' + kindLabel + "</span>" +
            (b.title ? '<span class="callout__title">' + b.title + "</span>" : "") + "</div>" +
            "<div class=\"callout__body\">" + b.c + "</div>" +
          "</aside>"
        );
      case "table":
        var head = b.head.map(function (h) { return "<th>" + h + "</th>"; }).join("");
        var rows = b.rows.map(function (r) {
          return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
        }).join("");
        return (
          '<div class="table-wrap"><table class="theory-table">' +
            "<thead><tr>" + head + "</tr></thead>" +
            "<tbody>" + rows + "</tbody>" +
          "</table></div>"
        );
      default:
        return "";
    }
  }

  /* ---------------------------- Vistes ---------------------------- */

  function indexView() {
    var list = AFP.domains.map(function (d) {
      var topics = getTopics(d.id);
      var done = 0;
      var p = AFP.store.getProgress();
      topics.forEach(function (t) { if (p[t.id]) done++; });

      var topicLinks = d.topics.map(function (tp) {
        var hasContent = topics.some(function (t) { return t.id === tp.id; });
        if (!hasContent) return '<span class="toc-item toc-item--muted" title="En preparació">' + tp.id + " · " + tp.titleCa + "</span>";
        var doneCls = p[tp.id] ? " is-done" : "";
        return (
          '<a class="toc-item' + doneCls + '" href="#/teoria/' + d.id + "/" + tp.id + '">' +
            '<span class="toc-item__code mono">' + tp.id + "</span>" +
            '<span class="toc-item__title">' + tp.titleCa + "</span>" +
            (p[tp.id] ? '<span class="toc-item__check">✓</span>' : "") +
          "</a>"
        );
      }).join("");

      return (
        '<div class="card">' +
          '<div class="card__head">' +
            '<span class="tag tag--' + AFP.util.domainColor(d.id) + '">' + d.code + "</span>" +
            '<span class="card__title">' + d.nameCa + "</span>" +
            '<span class="ml-auto mono muted-2">' + done + "/" + d.topics.length + "</span>" +
          "</div>" +
          '<p class="muted muted-2" style="font-size:var(--fs-sm)">' + d.nameEn + " · " + d.weight + "% de l'examen</p>" +
          '<div class="toc">' + topicLinks + "</div>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Teoria</div>' +
        "<h1>Els 5 dominis de l'examen</h1>" +
        '<p class="muted">Estudia bloc a bloc. Marca els temes com a completats per seguir el teu progrés. Els termes tècnics apareixen en <b>anglès</b> (com a l\u2019examen).</p>' +
        '<div class="grid">' + list + "</div>" +
      "</div>"
    );
  }

  function topicView(domainId, topicId) {
    var did = parseInt(domainId, 10);
    var d = AFP.util.getDomain(did);
    if (!d) return notFound();

    var topics = getTopics(did);
    var topicList = d.topics;
    var topicIndex = -1;
    for (var i = 0; i < topicList.length; i++) {
      if (topicList[i].id === (topicId || topicList[0].id)) { topicIndex = i; break; }
    }
    if (topicIndex < 0) topicIndex = 0;
    var tp = topicList[topicIndex];
    var content = null;
    for (var j = 0; j < topics.length; j++) {
      if (topics[j].id === tp.id) { content = topics[j]; break; }
    }

    var prev = topicIndex > 0 ? topicList[topicIndex - 1] : null;
    var next = topicIndex < topicList.length - 1 ? topicList[topicIndex + 1] : null;
    var bookmarked = AFP.store.getBookmarks().indexOf(tp.id) >= 0;
    var done = AFP.store.getProgress()[tp.id] === true;

    // Barra lateral de temes del domini
    var tocLinks = topicList.map(function (t) {
      var active = t.id === tp.id;
      var has = topics.some(function (c) { return c.id === t.id; });
      return (
        '<a class="toc-item' + (active ? " is-active" : "") + (has ? "" : " toc-item--muted") + '" href="#/teoria/' + did + "/" + t.id + '">' +
          '<span class="toc-item__code mono">' + t.id + "</span>" +
          '<span class="toc-item__title">' + t.titleCa + "</span>" +
        "</a>"
      );
    }).join("");

    var blocksHtml = content
      ? content.blocks.map(function (b) { return renderBlock(b); }).join("")
      : '<div class="empty" style="margin-top:var(--space-4)"><div class="empty__title">Contingut en preparació</div><p class="empty__text">Aquest tema es redactarà en properes actualitzacions.</p></div>';

    return (
      '<div class="content theory-page" data-domain="' + did + '" data-topic="' + tp.id + '">' +
        '<div class="theory-grid">' +

          '<aside class="theory-side">' +
            '<a class="sidebar-link" href="#/teoria/' + did + '">← El domini ' + d.code + "</a>" +
            '<div class="toc">' + tocLinks + "</div>" +
          "</aside>" +

          '<article class="theory-body">' +
            '<div class="flex items-center gap-2" style="margin-bottom:var(--space-2)">' +
              '<span class="tag tag--' + AFP.util.domainColor(did) + '">' + d.code + "</span>" +
              '<span class="eyebrow">' + d.nameEn + " · " + d.weight + "%</span>" +
            "</div>" +
            "<h1>" + tp.titleCa + "</h1>" +
            (content ? '<p class="theory-intro">' + content.intro + "</p>" : "") +
            '<div class="theory-actions">' +
              '<button class="btn btn--sm" data-topic-action="done">' + (done ? "✓ Completat" : "Marca com a completat") + "</button>" +
              '<button class="btn btn--ghost btn--sm" data-topic-action="bookmark">' + (bookmarked ? "★ Guardat" : "☆ Desa") + "</button>" +
            "</div>" +
            '<div class="theory-content">' + blocksHtml + "</div>" +

            '<nav class="theory-nav">' +
              (prev ? '<a class="btn" href="#/teoria/' + did + "/" + prev.id + '">← ' + prev.titleCa + "</a>" : '<span class="btn btn--ghost" style="opacity:.4;pointer-events:none">←</span>') +
              (next ? '<a class="btn btn--primary" href="#/teoria/' + did + "/" + next.id + '">' + next.titleCa + " →</a>" : '<span class="btn btn--primary" style="opacity:.4;pointer-events:none">Final del domini</span>') +
            "</nav>" +
          "</article>" +

        "</div>" +
      "</div>"
    );
  }

  function postRender() {
    var page = document.querySelector(".theory-page");
    if (!page) return;
    var actions = page.querySelectorAll("[data-topic-action]");
    var topicId = page.getAttribute("data-topic");
    actions.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var act = btn.getAttribute("data-topic-action");
        if (act === "done") {
          var p = AFP.store.getProgress();
          var done = p[topicId] === true;
          AFP.store.setTopicDone(topicId, !done);
        } else if (act === "bookmark") {
          AFP.store.toggleBookmark(topicId);
        }
        var main = document.querySelector(".main__body");
        if (main) {
          main.innerHTML = AFP.router.render();
        }
        AFP.app.postRender();
      });
    });
  }

  function notFound() {
    return '<div class="content"><div class="empty"><div class="empty__title">Domini no trobat</div><a class="btn btn--primary mt-3" href="#/teoria">Torna</a></div></div>';
  }

  return {
    indexView: indexView,
    topicView: topicView,
    postRender: postRender
  };
})();
