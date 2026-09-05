window.AFP = window.AFP || {};

/* ==========================================================================
   Qüestionaris per domini — motor + corrector
   ========================================================================== */
AFP.quiz = (function () {
  var session = null;      // estat del qüestionari en curs
  var LETTERS = ["A", "B", "C", "D", "E"];

  /* ---------------------------- Vistes ---------------------------- */

  function indexView() {
    var list = AFP.domains.map(function (d) {
      var qs = AFP.quizByDomain[d.id].length;
      return (
        '<a class="card card--hover" href="#/quiz/' + d.id + '" style="color:inherit;display:block">' +
          '<div class="card__head">' +
            '<span class="tag tag--' + AFP.util.domainColor(d.id) + '">' + d.code + "</span>" +
            '<span class="card__title">' + d.nameCa + "</span>" +
            '<span class="ml-auto mono muted-2">' + qs + " preg.</span>" +
          "</div>" +
          '<p class="muted muted-2" style="font-size:var(--fs-sm);margin:0">' + d.descCa + "</p>" +
        "</a>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Qüestionaris</div>' +
        "<h1>Tria un domini</h1>" +
        '<p class="muted">Respon les preguntes, corregeix-les al final i mira la nota i les explicacions. Preguntes d\u2019elecció única i de resposta múltiple, com l\u2019examen real.</p>' +
        '<div class="grid grid--2">' + list + "</div>" +
      "</div>"
    );
  }

  function startView(domainId) {
    var d = AFP.util.getDomain(parseInt(domainId, 10));
    if (!d) return notFound();

    var qs = AFP.quizByDomain[d.id].slice();
    if (qs.length === 0) return noQuestions(d);

    // Barreja l'ordre de les preguntes
    qs = AFP.util.shuffle(qs);

    session = {
      domain: d,
      questions: qs,
      answers: qs.map(function () { return null; }), // null = sense respondre, [] = múltiple (índexs seleccionats)
      index: 0
    };

    return renderQuiz();
  }

  function renderQuiz() {
    var s = session;
    var q = s.questions[s.index];
    var total = s.questions.length;
    var answered = s.answers.filter(function (a) { return a !== null && a !== ""; }).length;

    var mult = q.type === "multiple";
    var badge = mult ? '<span class="tag tag--violet">Selecciona ' + q.answer.length + "</span>" : '<span class="tag">Elecció única</span>';

    var opts = q.options.map(function (opt, i) {
      var sel = mult
        ? (s.answers[s.index] || []).indexOf(i) >= 0
        : s.answers[s.index] === i;
      var cls = "option" + (sel ? " is-selected" : "");
      var marker = mult
        ? '<span class="option__check">' + (sel ? AFP.app.icons.check : "") + "</span>"
        : '<span class="option__radio"></span>';
      return (
        '<div class="' + cls + '" data-opt="' + i + '" data-mult="' + (mult ? 1 : 0) + '">' +
          marker +
          '<span class="option__letter">' + LETTERS[i] + "</span>" +
          '<span class="option__text">' + AFP.util.esc(opt) + "</span>" +
        "</div>"
      );
    }).join("");

    var progress = Math.round(((s.index) / total) * 100);

    var html =
      '<div class="content content--quiz">' +
        '<div class="quiz-bar">' +
          '<div class="quiz-bar__meta">' +
            '<span class="tag tag--' + AFP.util.domainColor(s.domain.id) + '">' + s.domain.code + "</span>" +
            '<span>' + s.domain.nameCa + "</span>" +
          "</div>" +
          '<div class="quiz-bar__count mono">' + (s.index + 1) + " / " + total + "</div>" +
        "</div>" +
        '<div class="bar mt-2" style="margin-bottom:var(--space-5)">' +
          '<div class="bar__fill" style="width:' + progress + '%"></div>' +
        "</div>" +
        '<div class="card question-card">' +
          '<div class="flex items-center gap-2" style="margin-bottom:var(--space-4)">' + badge + "</div>" +
          '<h2 class="question-card__prompt">' + AFP.util.esc(q.promptCa) + "</h2>" +
          (q.promptEn ? '<p class="muted-2" style="font-size:var(--fs-sm)">' + AFP.util.esc(q.promptEn) + "</p>" : "") +
          '<div class="options">' + opts + "</div>" +
          '<div class="flex" style="justify-content:space-between;margin-top:var(--space-5)">' +
            '<button class="btn btn--ghost" data-quiz="prev"' + (s.index === 0 ? " disabled style=\"opacity:.4;pointer-events:none\"" : "") + ">Anterior</button>" +
            (s.index < total - 1
              ? '<button class="btn btn--primary" data-quiz="next">Següent</button>'
              : '<button class="btn btn--primary" data-quiz="submit">Corregeix (' + answered + "/" + total + ")</button>") +
          "</div>" +
        "</div>" +
      "</div>";

    return html;
  }

  /* ---------------------------- Interacció ---------------------------- */

  function bind() {
    var root = document.querySelector(".content--quiz");
    if (!root) return;

    root.addEventListener("click", function (e) {
      var opt = e.target.closest(".option");
      if (opt) {
        var oi = parseInt(opt.getAttribute("data-opt"), 10);
        var mult = opt.getAttribute("data-mult") === "1";
        var q = session.questions[session.index];

        if (mult) {
          var cur = (session.answers[session.index] || []).slice();
          var idx = cur.indexOf(oi);
          if (idx >= 0) cur.splice(idx, 1);
          else cur.push(oi);
          session.answers[session.index] = cur;
        } else {
          session.answers[session.index] = oi;
        }
        refresh();
        return;
      }

      var btn = e.target.closest("[data-quiz]");
      if (!btn) return;
      var action = btn.getAttribute("data-quiz");

      if (action === "next") { session.index++; refresh(); }
      else if (action === "prev") { session.index--; refresh(); }
      else if (action === "submit") { submit(); }
    });
  }

  function refresh() {
    var main = document.querySelector(".main__body");
    if (main) main.innerHTML = renderQuiz();
    bind();
  }

  function submit() {
    var s = session;
    var total = s.questions.length;
    var correct = 0;
    var withinDomain = [];

    s.questions.forEach(function (q, i) {
      var a = s.answers[i];
      var ok = isCorrect(q, a);
      if (ok) correct++;
      withinDomain.push({ question: q, given: a, correct: ok });
    });

    var scorePct = Math.round((correct / total) * 100);
    var grade = gradeLabel(scorePct);

    // Guarda l'històric del quiz
    AFP.store.addQuizResult({
      domainId: s.domain.id,
      score: correct,
      total: total,
      pct: scorePct,
      date: Date.now()
    });

    session.result = { correct: correct, total: total, pct: scorePct, grade: grade, items: withinDomain };

    var main = document.querySelector(".main__body");
    if (main) main.innerHTML = renderResult();
    bindResult();
  }

  function isCorrect(q, a) {
    if (a === null || a === "" || a === undefined) return false;
    if (q.type === "multiple") {
      var given = a.slice().sort().join(",");
      var expect = q.answer.slice().sort().join(",");
      return given === expect;
    }
    return a === q.answer[0];
  }

  function gradeLabel(pct) {
    if (pct >= 90) return { label: "Excel·lent", color: "teal" };
    if (pct >= 75) return { label: "Molt bé", color: "teal" };
    if (pct >= 65) return { label: "Aprovat", color: "accent" };
    if (pct >= 50) return { label: "Justet", color: "warn" };
    return { label: "Cal repassar", color: "danger" };
  }

  /* ---------------------------- Resultat ---------------------------- */

  function renderResult() {
    var r = session.result;
    var d = session.domain;

    var scoreColor = r.pct >= 65 ? "teal" : "danger";

    var items = r.items.map(function (it, i) {
      var q = it.question;
      var picked = pickSummary(q, it.given);
      var rowCls = it.correct ? "result-item is-ok" : "result-item is-bad";
      var mark = it.correct
        ? '<span class="tag tag--teal">Correcta</span>'
        : '<span class="tag tag--danger">Incorrecta</span>';
      return (
        '<div class="' + rowCls + '">' +
          '<div class="result-item__head">' +
            '<span class="mono muted-2">' + (i + 1) + ".</span>" +
            '<span class="result-item__prompt">' + AFP.util.esc(q.promptCa) + "</span>" +
            '<span class="ml-auto">' + mark + "</span>" +
          "</div>" +
          '<div class="result-item__answers">' + picked + "</div>" +
          '<div class="result-item__explain muted">' + AFP.util.esc(q.explainCa) + "</div>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="content">' +
        '<div class="eyebrow">Resultat · ' + d.code + " " + d.nameCa + "</div>" +
        '<div class="card result-hero">' +
          '<div class="result-hero__score" style="color:var(--' + scoreColor + ')">' + r.correct + '<span>/' + r.total + "</span></div>" +
          '<div class="result-hero__meta">' +
            '<div class="stat"><span class="stat__num">' + r.pct + "%</span><span class=\"stat__label\">encert</span></div>" +
            '<span class="tag tag--' + r.grade.color + '" style="margin-left:var(--space-3)">' + r.grade.label + "</span>" +
          "</div>" +
          '<div class="flex gap-2" style="margin-left:auto;flex-wrap:wrap">' +
            '<a class="btn" href="#/quiz/' + d.id + '" data-quiz-retry-title>Refés-lo</a>' +
            '<a class="btn btn--ghost" href="#/quiz">Altres dominis</a>' +
          "</div>" +
        "</div>" +
        '<div class="section-title"><h2>Revisió de respostes</h2></div>' +
        '<div class="result-list">' + items + "</div>" +
      "</div>"
    );
  }

  function pickSummary(q, given) {
    var parts = ["<span class='muted-2' style='font-size:var(--fs-xs)'>La teva resposta: </span>"];
    if (given === null || given === "" || given === undefined) {
      parts.push("<em class='muted-2'>Sense respondre</em>");
    } else {
      var g = q.type === "multiple" ? given : [given];
      parts.push("<span class='mono'>" + g.map(function (i) { return LETTERS[i] + ". " + AFP.util.esc(q.options[i]); }).join(" · ") + "</span>");
    }
    parts.push("<span class='muted-2' style='font-size:var(--fs-xs)'> · Correcta: </span>");
    parts.push("<span class='mono' style='color:var(--teal)'>" + q.answer.map(function (i) { return LETTERS[i] + ". " + AFP.util.esc(q.options[i]); }).join(" · ") + "</span>");
    return parts.join("");
  }

  function bindResult() {
    /* no cal interacció addicional per ara */
  }

  /* ---------------------------- Utilitats ---------------------------- */

  function notFound() {
    return '<div class="content"><div class="empty"><div class="empty__title">Domini no trobat</div><a class="btn btn--primary mt-3" href="#/quiz">Torna</a></div></div>';
  }

  function noQuestions(d) {
    return '<div class="content"><div class="empty"><div class="empty__title">Encara no hi ha preguntes</div><p class="empty__text">Les preguntes del domini ' + d.code + " es carregaran a la Fase 4.</p><a class=\"btn btn--primary\" href=\"#/quiz\">Torna</a></div></div>";
  }

  return {
    indexView: indexView,
    startView: startView,
    postRender: bind
  };
})();
