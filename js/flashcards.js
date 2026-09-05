window.AFP = window.AFP || {};

/* ==========================================================================
   Targetes (flashcards) — repàs espaiat simple (Leitner reduït)

   Caixes (box):
     0 = nova (mai vista)
     1 = en aprenentatge
     2 = dominada
   El botó de la dreta avança de box (0→1→2), el de l'esquerra retrocedeix a 0.
   ========================================================================== */
AFP.flashcards = (function () {
  var state = null; // { deck, index, flipped }

  function boxOf(id) {
    var s = AFP.store.getFlashcardState();
    return s[id] === undefined ? 0 : s[id];
  }

  function deck() {
    return AFP.flashcardData;
  }

  function indexView() {
    var all = deck();
    var boxes = { 0: 0, 1: 0, 2: 0 };
    all.forEach(function (c) { boxes[boxOf(c.id)]++; });

    var total = all.length;
    var mastered = boxes[2];

    return (
      '<div class="content">' +
        '<div class="eyebrow">Targetes</div>' +
        "<h1>Repàs espaiat</h1>" +
        '<p class="muted">Gira cada targeta, valora si la saps i deixa que el sistema et repassi més les que encara no domines.</p>' +
        '<div class="hero" style="grid-template-columns:1fr auto">' +
          "<div>" +
            '<div class="hero__stats">' +
              '<div class="stat"><span class="stat__num">' + total + '</span><span class="stat__label">Targetes</span></div>' +
              '<div class="stat"><span class="stat__num">' + boxes[0] + '</span><span class="stat__label">Noves</span></div>' +
              '<div class="stat"><span class="stat__num">' + boxes[1] + '</span><span class="stat__label">En aprenentatge</span></div>' +
              '<div class="stat"><span class="stat__num">' + mastered + '</span><span class="stat__label">Dominades</span></div>' +
            "</div>" +
            '<div class="mt-4">' +
              '<a class="btn btn--primary" href="#/targetes/repassa">Comença el repàs</a>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="section-title"><h2>Com funciona?</h2></div>' +
        '<div class="card">' +
          "<ul class=\"theory-list\">" +
            "<li>Una targeta mostra el <b>concepte</b>; gira-la per veure la <b>definició</b>.</li>" +
            "<li>Si l'<b>encertes</b>, avança de caixa; si la <b>falles</b>, torna al principi.</li>" +
            "<li>Les targetes noves i difícils surten més sovint que les dominades.</li>" +
          "</ul>" +
        "</div>" +
      "</div>"
    );
  }

  function startReview() {
    // Prioritza: caixa 0 abans que 1 abans que 2
    var all = deck();
    var score = { 0: 0, 1: 1, 2: 2 };
    var sorted = all.slice().sort(function (a, b) {
      var ba = score[boxOf(a.id)] !== undefined ? score[boxOf(a.id)] : 0;
      var bb = score[boxOf(b.id)] !== undefined ? score[boxOf(b.id)] : 0;
      return ba - bb;
    });
    state = { deck: sorted, index: 0, flipped: false };
    return renderCard();
  }

  function currentCard() {
    return state.deck[state.index];
  }

  function renderCard() {
    if (!state || state.index >= state.deck.length) {
      return finishView();
    }
    var c = currentCard();
    var d = AFP.util.getDomain(c.domain);
    var box = boxOf(c.id);
    var boxLabel = box === 0 ? "Nova" : box === 1 ? "En aprenentatge" : "Dominada";

    return (
      '<div class="content content--flashcards">' +
        '<div class="quiz-bar">' +
          '<div class="quiz-bar__meta">' +
            '<span class="tag tag--' + AFP.util.domainColor(c.domain) + '">' + d.code + "</span>" +
            '<span>' + d.nameCa + "</span>" +
          "</div>" +
          '<div class="quiz-bar__count mono">' + (state.index + 1) + " / " + state.deck.length + "</div>" +
        "</div>" +
        '<div class="bar mt-2" style="margin-bottom:var(--space-5)">' +
          '<div class="bar__fill" style="width:' + Math.round((state.index / state.deck.length) * 100) + '%"></div>' +
        "</div>" +
        '<div class="flashcard" data-flip>' +
          '<div class="flashcard__inner' + (state.flipped ? " is-flipped" : "") + '">' +
            '<div class="flashcard__face flashcard__front">' +
              '<span class="tag tag--warn" style="position:absolute;top:14px;left:14px">' + boxLabel + "</span>" +
              '<div class="flashcard__text">' + AFP.util.esc(c.front) + "</div>" +
              '<span class="flashcard__hint muted-2">Clica per girar</span>' +
            "</div>" +
            '<div class="flashcard__face flashcard__back">' +
              '<div class="flashcard__text">' + AFP.util.esc(c.back) + "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="flashcard-controls">' +
          '<button class="btn" data-card="fail"' + (state.flipped ? "" : " disabled style=\"opacity:.45;pointer-events:none\"") + '>No la sé</button>' +
          '<button class="btn btn--primary" data-card="pass"' + (state.flipped ? "" : " disabled style=\"opacity:.45;pointer-events:none\"") + ">La sé →</button>" +
        "</div>" +
        '<div class="flex" style="justify-content:center;margin-top:var(--space-4)">' +
          '<a class="btn btn--ghost btn--sm" href="#/targetes">Surt del repàs</a>' +
        "</div>" +
      "</div>"
    );
  }

  function finishView() {
    var all = deck();
    var mastered = all.filter(function (c) { return boxOf(c.id) === 2; }).length;
    return (
      '<div class="content">' +
        '<div class="empty">' +
          '<div class="empty__title">Repàs completat</div>' +
          '<p class="empty__text">Has dominat ' + mastered + ' de ' + all.length + " targetes. Torna-hi demà per consolidar-ho.</p>" +
          '<div class="flex gap-2">' +
            '<a class="btn btn--primary" href="#/targetes/repassa">Una altra volta</a>' +
            '<a class="btn btn--ghost" href="#/targetes">Vista general</a>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function postRender() {
    var root = document.querySelector(".content--flashcards");
    if (!root) return;

    root.addEventListener("click", function (e) {
      var card = e.target.closest("[data-flip]");
      if (card && !state.flipped) {
        state.flipped = true;
        var inner = card.querySelector(".flashcard__inner");
        if (inner) inner.classList.add("is-flipped");
        // re-allow buttons: re-render per evitar duplicar listeners
        rerender();
        return;
      }

      var btn = e.target.closest("[data-card]");
      if (btn) {
        var action = btn.getAttribute("data-card");
        advance(action);
      }
    });

    // prevent duplicate listeners
    root.__fcBound = true;
  }

  function advance(action) {
    var c = currentCard();
    if (action === "pass") {
      // encert: puja de caixa
      var b = boxOf(c.id);
      AFP.store.setFlashcardBox(c.id, Math.min(2, b + 1));
    } else {
      // fallada: baixa a caixa 0
      AFP.store.setFlashcardBox(c.id, 0);
    }
    state.index++;
    state.flipped = false;
    rerender();
  }

  function rerender() {
    var main = document.querySelector(".main__body");
    if (main) main.innerHTML = renderCard();
    postRender();
  }

  return {
    indexView: indexView,
    postRender: postRender,
    startReview: startReview
  };
})();
