window.AFP = window.AFP || {};

/* ==========================================================================
   Estadístiques — historial de quizzes i exàmens, dominis febles
   ========================================================================== */
AFP.stats = (function () {
  function view() {
    var quizHist = AFP.store.getQuizHistory();
    var examHist = AFP.store.getExamHistory();
    var progress = AFP.progress.domainStats();
    var ready = AFP.progress.readiness();

    /* --- Gauge de preparació --- */
    var gaugeC = 200;
    var gaugeR = 80;
    var circ = 2 * Math.PI * gaugeR;
    var offset = circ * (1 - ready / 100);

    var gauge =
      '<div class="hero" style="grid-template-columns:auto 1fr">' +
        '<div class="gauge">' +
          '<svg width="' + gaugeC + '" height="' + gaugeC + '" viewBox="0 0 ' + gaugeC + " " + gaugeC + '">' +
            '<circle class="gauge__track" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="16"/>' +
            '<circle class="gauge__glow" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="16" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"/>' +
            '<circle class="gauge__value" cx="' + gaugeC / 2 + '" cy="' + gaugeC / 2 + '" r="' + gaugeR + '" stroke-width="16" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"/>' +
          "</svg>" +
          '<div class="gauge__center"><div class="gauge__num">' + ready + '</div><div class="gauge__unit">% READY</div></div>' +
        "</div>" +
        "<div>" +
          '<h2 class="mb-2">Preparació</h2>' +
          '<p class="muted muted-2" style="font-size:var(--fs-sm)">Percentatge de temes completats, ponderat pel pes real de cada domini a l\u2019examen. ' + AFP.progress.countDone() + " de " + AFP.progress.countTotalTopics() + ' temes completats.</p>' +
        "</div>" +
      "</div>";

    /* --- Progrés per domini --- */
    var progressRows = progress.map(function (s) {
      return (
        '<div class="domain-row" style="grid-template-columns:1fr auto">' +
          '<div class="domain-row__meta">' +
            '<div class="domain-row__head">' +
              '<span class="tag tag--' + AFP.util.domainColor(s.domain.id) + '">' + s.domain.code + "</span>" +
              '<span class="domain-row__name">' + s.domain.nameCa + "</span>" +
            "</div>" +
            '<div class="bar"><div class="bar__fill" style="width:' + s.pct + '%"></div></div>' +
          "</div>" +
          '<span class="domain-row__pct">' + s.done + "/" + s.total + "</span>" +
        "</div>"
      );
    }).join("");

    /* --- Historial d'exàmens --- */
    var examRows = examHist.length === 0
      ? '<p class="muted muted-2">Encara no has fet cap simulador d\u2019examen.</p>'
      : examHist.slice().reverse().map(function (e) {
          var pct = e.pct !== undefined ? e.pct : Math.round((e.score / e.total) * 100);
          var cls = pct >= 70 ? "teal" : "danger";
          return (
            '<div class="domain-row" style="grid-template-columns:1fr auto">' +
              '<div class="domain-row__meta">' +
                '<div class="domain-row__head">' +
                  '<span class="mono muted-2">' + AFP.util.fmtDate(e.date) + "</span>" +
                  '<span class="tag tag--' + cls + '">' + pct + "%</span>" +
                  (e.passed !== undefined ? '<span class="tag tag--' + (e.passed ? "teal" : "danger") + '">' + (e.passed ? "Aprovat" : "Suspès") + "</span>" : "") +
                "</div>" +
                '<span class="muted-2" style="font-size:var(--fs-xs)">' + e.score + "/" + e.total + " correctes</span>" +
              "</div>" +
              '<span class="domain-row__pct">' + (e.timeUsed ? Math.floor(e.timeUsed / 60) + "m" : "") + "</span>" +
            "</div>"
          );
        }).join("");

    /* --- Historial de quizzes --- */
    var quizRows = quizHist.length === 0
      ? '<p class="muted muted-2">Encara no has fet cap qüestionari.</p>'
      : quizHist.slice().reverse().slice(0, 12).map(function (q) {
          var d = AFP.util.getDomain(q.domainId);
          var pct = q.pct !== undefined ? q.pct : Math.round((q.score / q.total) * 100);
          var cls = pct >= 65 ? "teal" : pct >= 50 ? "warn" : "danger";
          return (
            '<div class="domain-row" style="grid-template-columns:1fr auto">' +
              '<div class="domain-row__meta">' +
                '<div class="domain-row__head">' +
                  '<span class="tag tag--' + AFP.util.domainColor(q.domainId) + '">' + (d ? d.code : q.domainId) + "</span>" +
                  '<span class="mono muted-2">' + AFP.util.fmtDate(q.date) + "</span>" +
                  '<span class="tag tag--' + cls + '">' + pct + "%</span>" +
                "</div>" +
                '<span class="muted-2" style="font-size:var(--fs-xs)">' + q.score + "/" + q.total + " correctes</span>" +
              "</div>" +
              '<a class="btn btn--ghost btn--sm" href="#/quiz/' + q.domainId + '">Repetir</a>' +
            "</div>"
          );
        }).join("");

    /* --- Accions --- */
    var actions =
      '<div class="section-title"><h2>Accions</h2></div>' +
      '<div class="card">' +
        '<div class="flex gap-2" style="flex-wrap:wrap">' +
          '<button class="btn btn--ghost" data-stats="clear">Neteja tot el progrés i historial</button>' +
        "</div>" +
      "</div>";

    return (
      '<div class="content">' +
        '<div class="eyebrow">Estadístiques</div>' +
        "<h1>El teu progrés</h1>" +
        gauge +
        '<div class="section-title"><h2>Progrés per domini</h2></div>' +
        '<div class="card">' + progressRows + "</div>" +
        '<div class="section-title"><h2>Exàmens de simulador</h2><span class="tag">' + examHist.length + "</span></div>" +
        '<div class="card">' + examRows + "</div>" +
        '<div class="section-title"><h2>Qüestionaris</h2><span class="tag">' + quizHist.length + "</span></div>" +
        '<div class="card">' + quizRows + "</div>" +
        actions +
      "</div>"
    );
  }

  function postRender() {
    var btn = document.querySelector("[data-stats='clear']");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (confirm("Segur que vols esborrar tot el progrés, historial i targetes?")) {
        AFP.store.clearAll();
        var main = document.querySelector(".main__body");
        if (main) main.innerHTML = AFP.router.render();
        AFP.app.postRender();
      }
    });
  }

  return {
    view: view,
    postRender: postRender
  };
})();
