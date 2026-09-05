window.AFP = window.AFP || {};

/* ==========================================================================
   Resums — vista de xules de repàs per domini
   ========================================================================== */
AFP.summaries = (function () {
  function indexView() {
    var list = AFP.summaryData.map(function (s) {
      var d = AFP.util.getDomain(s.domain);
      return (
        '<a class="card card--hover" href="#/resums/' + s.domain + '" style="color:inherit;display:block">' +
          '<div class="card__head">' +
            '<span class="tag tag--' + AFP.util.domainColor(s.domain) + '">' + d.code + "</span>" +
            '<span class="card__title">' + s.titleCa + "</span>" +
            '<span class="ml-auto mono muted-2">' + s.keyPoints.length + " claus</span>" +
          "</div>" +
          '<p class="muted muted-2" style="font-size:var(--fs-sm);margin:0">' + s.intro + "</p>" +
        "</a>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Resums</div>' +
        "<h1>Xules de repàs</h1>" +
        '<p class="muted">El condensat de cada domini per a una revisió ràpida. Ideal per la nit abans de l\u2019examen.</p>' +
        '<div class="grid grid--2">' + list + "</div>" +
      "</div>"
    );
  }

  function itemView(domainId) {
    var did = parseInt(domainId, 10);
    var s = null;
    for (var i = 0; i < AFP.summaryData.length; i++) {
      if (AFP.summaryData[i].domain === did) { s = AFP.summaryData[i]; break; }
    }
    if (!s) return '<div class="content"><div class="empty"><div class="empty__title">Resum no trobat</div><a class="btn btn--primary mt-3" href="#/resums">Torna</a></div></div>';

    var d = AFP.util.getDomain(did);

    var keys = s.keyPoints.map(function (k) {
      return "<li>" + k + "</li>";
    }).join("");

    var must = s.mustRemember.map(function (m) {
      return (
        '<div class="def">' +
          '<span class="def__term mono">' + AFP.util.esc(m.en) + "</span>" +
          '<span class="def__sep">—</span>' +
          '<span class="def__body">' + AFP.util.esc(m.ca) + "</span>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="flex items-center gap-2" style="margin-bottom:var(--space-2)">' +
          '<span class="tag tag--' + AFP.util.domainColor(did) + '">' + d.code + "</span>" +
          '<span class="eyebrow">Resum · ' + d.nameEn + "</span>" +
        "</div>" +
        "<h1>" + s.titleCa + "</h1>" +
        '<p class="muted">' + s.intro + "</p>" +
        '<div class="grid grid--2" style="align-items:start">' +
          '<div class="card">' +
            '<div class="card__head"><span class="card__title">Punts clau</span></div>' +
            '<ul class="theory-list">' + keys + "</ul>" +
          "</div>" +
          '<div class="card">' +
            '<div class="card__head"><span class="card__title">Per no oblidar</span></div>' +
            must +
          "</div>" +
        "</div>" +
        '<div class="flex gap-2 mt-4" style="flex-wrap:wrap">' +
          '<a class="btn btn--primary" href="#/quiz/' + did + '">Prova\u2019t amb elqüestionari</a>' +
          '<a class="btn btn--ghost" href="#/resums">Tots els resums</a>' +
        "</div>" +
      "</div>"
    );
  }

  return {
    indexView: indexView,
    itemView: itemView
  };
})();
