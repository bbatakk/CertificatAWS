window.AFP = window.AFP || {};

/* ==========================================================================
   Pràctica — vista de laboratoris i exercicis
   (les dades són a AFP.practice, aquest mòdul és AFP.practiceView)
   ========================================================================== */
AFP.practiceView = (function () {
  function items() {
    return AFP.practice;
  }

  function levelTag(level) {
    return level === "intermediate"
      ? '<span class="tag tag--violet">Avançat</span>'
      : '<span class="tag tag--teal">Bàsic</span>';
  }

  function kindTag(kind) {
    return kind === "lab"
      ? '<span class="tag tag--accent">Laboratori</span>'
      : '<span class="tag tag--warn">Exercici</span>';
  }

  function indexView() {
    var labs = items().filter(function (i) { return i.kind === "lab"; });
    var ex = items().filter(function (i) { return i.kind === "exercise"; });

    function cards(list) {
      return list.map(function (i) {
        var d = AFP.util.getDomain(i.domain);
        return (
          '<a class="card card--hover" href="#/practica/' + i.id + '" style="color:inherit;display:block">' +
            '<div class="card__head">' +
              '<span class="tag tag--' + AFP.util.domainColor(i.domain) + '">' + d.code + "</span>" +
              '<span class="card__title">' + i.titleCa + "</span>" +
            "</div>" +
            '<p class="muted muted-2" style="font-size:var(--fs-sm);margin:0 0 var(--space-2)">' + i.intro + "</p>" +
            '<div class="flex gap-2">' + kindTag(i.kind) + levelTag(i.level) + "</div>" +
          "</a>"
        );
      }).join("");
    }

    return (
      '<div class="content">' +
        '<div class="eyebrow">Pràctica</div>' +
        "<h1>Aprèn fent</h1>" +
        '<p class="muted">Laboratoris guiats pas a pas a la consola d\u2019AWS i exercicis d\u2019escenari com els de l\u2019examen, amb solució raonada.</p>' +
        '<div class="section-title"><h2>Laboratoris</h2><span class="tag">consola AWS</span></div>' +
        '<div class="grid grid--2">' + cards(labs) + "</div>" +
        '<div class="section-title"><h2>Exercicis d\u2019escenari</h2><span class="tag">raonament</span></div>' +
        '<div class="grid grid--2">' + cards(ex) + "</div>" +
      "</div>"
    );
  }

  function itemView(id) {
    var it = null;
    var all = items();
    for (var i = 0; i < all.length; i++) { if (all[i].id === id) { it = all[i]; break; } }
    if (!it) return '<div class="content"><div class="empty"><div class="empty__title">Ítem no trobat</div><a class="btn btn--primary mt-3" href="#/practica">Torna</a></div></div>';

    var d = AFP.util.getDomain(it.domain);

    var body = "";
    if (it.kind === "lab") {
      var steps = it.steps.map(function (s, i) {
        return '<li class="lab-step"><span class="lab-step__num mono">' + (i + 1) + "</span><span>" + s + "</span></li>";
      }).join("");
      body =
        '<div class="card">' +
          '<div class="card__head"><span class="card__title">Passos</span></div>' +
          '<ol class="lab-steps">' + steps + "</ol>" +
        "</div>";
    } else {
      body =
        '<div class="card">' +
          '<div class="card__head"><span class="card__title">Enunciat</span></div>' +
          '<p class="exercise-problem">' + it.problem + "</p>" +
          '<details class="exercise-solution">' +
            '<summary>Mostra la solució</summary>' +
            '<div class="exercise-solution__body">' + it.solution + "</div>" +
          "</details>" +
        "</div>";
    }

    return (
      '<div class="content">' +
        '<div class="flex items-center gap-2" style="margin-bottom:var(--space-2)">' +
          '<span class="tag tag--' + AFP.util.domainColor(it.domain) + '">' + d.code + "</span>" +
          '<span class="eyebrow">' + d.nameEn + "</span>" +
        "</div>" +
        "<h1>" + it.titleCa + "</h1>" +
        '<div class="flex gap-2" style="margin-bottom:var(--space-4)">' + kindTag(it.kind) + levelTag(it.level) + "</div>" +
        '<p class="practice-intro">' + it.intro + "</p>" +
        body +
        (it.outcome
          ? '<div class="callout callout--tip">' +
              '<div class="callout__head"><span class="tag tag--teal">Resultat</span><span class="callout__title">Què hauràs après</span></div>' +
              '<div class="callout__body">' + it.outcome + "</div>" +
            "</div>"
          : "") +
        '<div class="flex gap-2 mt-4">' +
          '<a class="btn btn--ghost" href="#/practica">← Tots els laboratoris i exercicis</a>' +
          '<a class="btn btn--primary" href="#/quiz/' + it.domain + '">Prova\u2019t amb el qüestionari</a>' +
        "</div>" +
      "</div>"
    );
  }

  return {
    indexView: indexView,
    itemView: itemView
  };
})();
