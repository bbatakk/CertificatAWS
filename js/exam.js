window.AFP = window.AFP || {};

/* ==========================================================================
   Simulador d'examen — cronometrat, ponderat per domini, amb informe final
   ========================================================================== */
AFP.exam = (function () {
  var LETTERS = ["A", "B", "C", "D", "E"];
  var state = null;      // { questions, answers, answersSaved, endAt, interval, startedAt }
  var remainder = null;  // temps restant en ms (per recomençar després de navegació)

  var PASSING_PCT = 70;  // ~700/1000 equival a ≈70% d'encerts

  function msToClock(ms) {
    if (ms < 0) ms = 0;
    var totalSec = Math.floor(ms / 1000);
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* ---------------------------- Confecció de l'examen ---------------------------- */

  function buildExam() {
    var total = AFP.examConfig.totalQuestions;
    var picked = [];

    // Assigna a cada domini un nombre de preguntes proporcional al pes
    AFP.domains.forEach(function (d) {
      var n = Math.round((d.weight / 100) * total);
      var pool = AFP.quizBank.filter(function (q) { return q.domain === d.id; });
      var sel = AFP.util.shuffle(pool).slice(0, n);
      picked = picked.concat(sel);
    });

    // Si arrodonint no arribem a 65, omple amb preguntes aleatòries restants
    if (picked.length < total) {
      var rest = AFP.quizBank.filter(function (q) { return picked.indexOf(q) < 0; });
      picked = picked.concat(AFP.util.shuffle(rest).slice(0, total - picked.length));
    }
    // Si ens passem, retalla
    if (picked.length > total) picked = picked.slice(0, total);

    return AFP.util.shuffle(picked);
  }

  /* ---------------------------- Vistes ---------------------------- */

  function indexView() {
    var total = AFP.quizBank.length;
    var perDomain = AFP.domains.map(function (d) {
      var n = Math.round((d.weight / 100) * AFP.examConfig.totalQuestions);
      return '<div class="domain-row" style="grid-template-columns:1fr auto">' +
        '<div class="domain-row__head" style="align-items:center">' +
          '<span class="tag tag--' + AFP.util.domainColor(d.id) + '">' + d.code + "</span>" +
          '<span class="domain-row__name">' + d.nameCa + "</span>" +
        "</div>" +
        '<span class="domain-row__pct">' + n + " preg.</span>" +
      "</div>";
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Simulador d\u2019examen</div>' +
        "<h1>Exam en condicions reals</h1>" +
        '<div class="hero" style="grid-template-columns:1.4fr 1fr">' +
          "<div>" +
            '<p class="hero__lead">' + AFP.examConfig.totalQuestions + " preguntes aleatòries en " + AFP.examConfig.durationMinutes + " minuts, ponderades segons el pes real de cada domini. El cronòmetre s\u2019envia sol en acabar el temps.</p>" +
            '<div class="hero__stats">' +
              '<div class="stat"><span class="stat__num">' + AFP.examConfig.totalQuestions + '</span><span class="stat__label">Preguntes</span></div>' +
              '<div class="stat"><span class="stat__num">' + AFP.examConfig.durationMinutes + '</span><span class="stat__label">Minuts</span></div>' +
              '<div class="stat"><span class="stat__num">' + AFP.examConfig.passingScore + '</span><span class="stat__label">Nota per aprovar</span></div>' +
            "</div>" +
            '<div class="mt-4">' +
              '<button class="btn btn--primary" data-exam="start">Comença l\u2019examen</button>' +
            "</div>" +
          "</div>" +
          '<div class="card">' +
            '<div class="eyebrow" style="margin-bottom:var(--space-3)">Distribució de preguntes</div>' +
            perDomain +
          "</div>" +
        "</div>" +
        '<div class="section-title"><h2>Abans de començar</h2></div>' +
        '<div class="card">' +
          "<p class=\"muted\" style=\"margin:0\">Consells per treure'n profit:</p>" +
          "<ul class=\"muted\" style=\"font-size:var(--fs-sm)\">" +
            "<li>Busca un lloc tranquil i no facis pauses: el cronòmetre no es para.</li>" +
            "<li>Les de resposta múltiple no donen puntuació parcial: cal marcar totes les correctes.</li>" +
            "<li>Deixa les difícils pel final; no deixis cap sense respondre.</li>" +
            "<li>L\u2019informe final et mostra els punts febles per domini, no només la nota.</li>" +
          "</ul>" +
        "</div>" +
        '<p class="muted-2" style="text-align:center;margin-top:var(--space-5)">Banc disponible: ' + total + " preguntes originals alineades al blueprint.</p>" +
      "</div>"
    );
  }

  function runView() {
    if (!state) {
      // Primer accés: confeccionem
      state = {
        questions: buildExam(),
        answers: [],
        startedAt: Date.now(),
        endAt: Date.now() + AFP.examConfig.durationMinutes * 60000,
        finished: false,
        index: 0
      };
      state.answers = state.questions.map(function () { return null; });
      if (remainder !== null) state.endAt = Date.now() + remainder;
      remainder = null;
    }
    return renderRun();
  }

  function renderRun() {
    var q = state.questions[state.index];
    if (!q) { finish(); return resultView(); }

    var mult = q.type === "multiple";
    var badge = mult ? '<span class="tag tag--violet">Selecciona ' + q.answer.length + "</span>" : '<span class="tag">Elecció única</span>';

    var opts = q.options.map(function (opt, i) {
      var sel = mult ? (state.answers[state.index] || []).indexOf(i) >= 0 : state.answers[state.index] === i;
      var cls = "option" + (sel ? " is-selected" : "");
      var marker = mult ? '<span class="option__check">' + (sel ? AFP.app.icons.check : "") + "</span>" : '<span class="option__radio"></span>';
      return '<div class="' + cls + '" data-opt="' + i + '" data-mult="' + (mult ? 1 : 0) + '">' +
        marker +
        '<span class="option__letter">' + LETTERS[i] + "</span>" +
        '<span class="option__text">' + AFP.util.esc(opt) + "</span>" +
      "</div>";
    }).join("");

    var answered = state.answers.filter(function (a) { return a !== null; }).length;
    var d = AFP.util.getDomain(q.domain);
    var progress = Math.round((state.index / state.questions.length) * 100);

    return (
      '<div class="content content--exam">' +
        '<div class="exam-topbar">' +
          '<div class="quiz-bar__meta">' +
            '<span class="tag tag--' + AFP.util.domainColor(q.domain) + '">' + d.code + "</span>" +
            '<span class="muted-2 mono" style="font-size:var(--fs-xs)">' + (state.index + 1) + "/" + state.questions.length + "</span>" +
          "</div>" +
          '<div class="exam-timer" data-timer>' + msToClock(state.endAt - Date.now()) + "</div>" +
        "</div>" +
        '<div class="bar" style="margin-bottom:var(--space-5)"><div class="bar__fill" style="width:' + progress + '%"></div></div>' +
        '<div class="card question-card">' +
          '<div class="flex items-center gap-2" style="margin-bottom:var(--space-4)">' + badge + "</div>" +
          '<h2 class="question-card__prompt">' + AFP.util.esc(q.promptCa) + "</h2>" +
          (q.promptEn ? '<p class="muted-2" style="font-size:var(--fs-sm)">' + AFP.util.esc(q.promptEn) + "</p>" : "") +
          '<div class="options">' + opts + "</div>" +
          '<div class="flex" style="justify-content:space-between;margin-top:var(--space-5);flex-wrap:wrap;gap:var(--space-2)">' +
            '<button class="btn btn--ghost" data-exam="prev"' + (state.index === 0 ? " disabled style=\"opacity:.4;pointer-events:none\"" : "") + ">Anterior</button>" +
            (state.index < state.questions.length - 1
              ? '<button class="btn btn--primary" data-exam="next">Següent</button>'
              : '<button class="btn btn--primary" data-exam="finish">Finalitza l\u2019examen</button>') +
          "</div>" +
        "</div>" +
        '<div class="flex items-center" style="justify-content:space-between;margin-top:var(--space-4)">' +
          '<span class="muted-2" style="font-size:var(--fs-xs)">' + answered + "/" + state.questions.length + " respostes</span>" +
          '<button class="btn btn--ghost btn--sm" data-exam="abandon">Abandona</button>' +
        "</div>" +
      "</div>"
    );
  }

  function startTimer() {
    if (state.interval) clearInterval(state.interval);
    state.interval = setInterval(function () {
      var left = state.endAt - Date.now();
      var el = document.querySelector("[data-timer]");
      if (el) {
        el.textContent = msToClock(left);
        if (left < 30000) el.classList.add("is-warning");
      }
      if (left <= 0) {
        finish();
        var main = document.querySelector(".main__body");
        if (main) main.innerHTML = resultView();
      }
    }, 1000);
  }

  function finish() {
    if (state.finished) return;
    state.finished = true;
    if (state.interval) clearInterval(state.interval);

    // correcció
    var perDomain = {};
    var correct = 0;
    state.questions.forEach(function (q, i) {
      var ok = checkAnswer(q, state.answers[i]);
      if (ok) correct++;
      if (!perDomain[q.domain]) perDomain[q.domain] = { correct: 0, total: 0 };
      perDomain[q.domain].total++;
      if (ok) perDomain[q.domain].correct++;
    });

    var total = state.questions.length;
    var pct = Math.round((correct / total) * 100);
    var passed = pct >= PASSING_PCT;

    state.result = {
      correct: correct,
      total: total,
      pct: pct,
      passed: passed,
      perDomain: perDomain,
      timeUsed: Math.round((Date.now() - state.startedAt) / 1000)
    };

    AFP.store.addExamResult({
      score: correct,
      total: total,
      pct: pct,
      passed: passed,
      perDomain: perDomain,
      date: Date.now(),
      timeUsed: state.result.timeUsed
    });
  }

  function checkAnswer(q, a) {
    if (a === null || a === undefined) return false;
    if (q.type === "multiple") {
      var g = a.slice().sort().join(",");
      var e = q.answer.slice().sort().join(",");
      return g === e;
    }
    return a === q.answer[0];
  }

  function resultView() {
    if (!state || !state.result) return '<div class="content"><div class="empty"><div class="empty__title">Cap examen iniciat</div><a class="btn btn--primary mt-3" href="#/examen">Torna</a></div></div>';

    var r = state.result;
    var verdict = r.passed
      ? '<span class="tag tag--teal">Aprovat</span>'
      : '<span class="tag tag--danger">Suspès</span>';
    var mins = Math.floor(r.timeUsed / 60);
    var secs = r.timeUsed % 60;

    var perDomain = AFP.domains.map(function (d) {
      var pd = r.perDomain[d.id] || { correct: 0, total: 0 };
      var p = pd.total === 0 ? 0 : Math.round((pd.correct / pd.total) * 100);
      var weak = p > 0 && p < PASSING_PCT;
      return (
        '<div class="domain-row" style="grid-template-columns:1fr auto">' +
          '<div class="domain-row__meta">' +
            '<div class="domain-row__head">' +
              '<span class="tag tag--' + AFP.util.domainColor(d.id) + '">' + d.code + "</span>" +
              '<span class="domain-row__name">' + d.nameCa + "</span>" +
              (weak ? '<span class="tag tag--danger">a reforçar</span>' : "") +
            "</div>" +
            '<div class="bar"><div class="bar__fill' + (weak ? "" : " bar__fill--teal") + '" style="width:' + p + '%"></div></div>' +
          "</div>" +
          '<span class="domain-row__pct">' + pd.correct + "/" + pd.total + "</span>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Informe de l\u2019examen</div>' +
        '<div class="card result-hero">' +
          '<div class="result-hero__score" style="color:var(--' + (r.passed ? "teal" : "danger") + ')">' + r.pct + '<span>%</span></div>' +
          '<div class="result-hero__meta">' +
            '<div>' + verdict + "</div>" +
            '<p class="muted-2" style="font-size:var(--fs-xs);margin:var(--space-2) 0 0">' + r.correct + " de " + r.total + " correctes · temps " + mins + "m " + secs + "s</p>" +
          "</div>" +
          '<div class="flex gap-2" style="margin-left:auto;flex-wrap:wrap">' +
            '<button class="btn btn--primary" data-exam="restart">Torna-ho a provar</button>' +
            '<a class="btn btn--ghost" href="#/">Inici</a>' +
          "</div>" +
        "</div>" +
        '<div class="section-title"><h2>Rendiment per domini</h2><span class="tag">Ponderació real</span></div>' +
        '<div class="card">' + perDomain + "</div>" +
        '<p class="muted-2" style="margin:var(--space-3) 0;font-size:var(--fs-sm)">Els dominis marcats com \u201ca reforçar\u201d estan per sota del ' + PASSING_PCT + "%: centra el repàs allà.</p>" +
      "</div>"
    );
  }

  /* ---------------------------- Interacció ---------------------------- */

  function bind() {
    var body = document.querySelector(".main__body");
    if (!body) return;
    if (body.__examBound) return;  // evita listeners duplicats
    body.__examBound = true;

    // Gestionem els clics a tot el cos de l'examen mitjançant delegació
    body.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-exam]");
      var opt = e.target.closest(".option");

      if (opt && state && !state.finished) {
        var oi = parseInt(opt.getAttribute("data-opt"), 10);
        var mult = opt.getAttribute("data-mult") === "1";
        var q = state.questions[state.index];
        if (mult) {
          var cur = (state.answers[state.index] || []).slice();
          var idx = cur.indexOf(oi);
          if (idx >= 0) cur.splice(idx, 1); else cur.push(oi);
          state.answers[state.index] = cur;
        } else {
          state.answers[state.index] = oi;
        }
        refresh();
        return;
      }

      if (!btn) return;
      var action = btn.getAttribute("data-exam");

      if (action === "start") { startExam(); }
      else if (action === "next") { state.index++; refresh(); }
      else if (action === "prev") { state.index--; refresh(); }
      else if (action === "finish") { finish(); var m = document.querySelector(".main__body"); if (m) m.innerHTML = resultView(); }
      else if (action === "abandon") { abandon(); }
      else if (action === "restart") { restart(); }
    });
  }

  function restart() {
    stopAndClear();
    window.location.hash = "#/examen/correu";
  }

  function refresh() {
    var main = document.querySelector(".main__body");
    if (main) main.innerHTML = renderRun();
  }

  function startExam() {
    stopAndClear();
    window.location.hash = "#/examen/correu";
  }

  function abandon() {
    if (confirm("Segur que vols abandonar l'examen? Es perdrà el progrés.")) {
      stopAndClear();
      window.location.hash = "#/examen";
    }
  }

  function stopAndClear() {
    if (state && state.interval) clearInterval(state.interval);
    state = null;
    remainder = null;
  }

  function postRender() {
    var hash = window.location.hash;
    if (hash.indexOf("#/examen/correu") === 0 && state && !state.finished) {
      startTimer();
      bind();
    } else if (hash.indexOf("#/examen") === 0) {
      bind();
    }
  }

  return {
    indexView: indexView,
    runView: runView,
    resultView: resultView,
    postRender: postRender
  };
})();
