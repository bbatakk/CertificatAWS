window.AFP = window.AFP || {};

/* ==========================================================================
   Guia d'examen — format, puntuació, pla d'estudi i consells
   ========================================================================== */
AFP.guide = (function () {
  function card(title, body) {
    return '<div class="card"><div class="card__head"><span class="card__title">' + title + "</span></div>" + body + "</div>";
  }

  function li(items) {
    return '<ul class="theory-list">' + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  }

  function view() {
    var fmt = AFP.examConfig;

    var format = card("Format de l'examen", [
      '<div class="hero__stats">',
        '<div class="stat"><span class="stat__num">' + fmt.totalQuestions + '</span><span class="stat__label">Preguntes</span></div>',
        '<div class="stat"><span class="stat__num">' + fmt.durationMinutes + '</span><span class="stat__label">Minuts</span></div>',
        '<div class="stat"><span class="stat__num">' + fmt.passingScore + '/1000</span><span class="stat__label">Nota per aprovar</span></div>',
        '<div class="stat"><span class="stat__num">100 $</span><span class="stat__label">Preu (USD)</span></div>',
      "</div>",
      li([
        "<b>50 preguntes puntuen</b> i <b>15 no puntuen</b> (experimentals; no saps quines són).",
        "Tipus: <b>elecció única</b> (1 correcta de 4) i <b>resposta múltiple</b> (2 o més de 5; sense puntuació parcial).",
        "Puntuació <b>escalada de 100 a 1000</b>; aprovar requereix uns <b>700</b> (~70% d'encerts).",
        "Idiomes disponibles: <b>anglès</b>, japonès, coreà, xinès simplificat, entre d'altres.",
        "Entrega: <b>Pearson VUE</b> (centre d'exàmens o online amb proctor).",
        "Validesa: <b>3 anys</b>. Espera entre intents: <b>14 dies</b>."
      ])
    ]);

    var domains = AFP.domains.map(function (d) {
      return (
        '<div class="domain-row" style="grid-template-columns:1fr auto">' +
          '<div class="domain-row__meta">' +
            '<div class="domain-row__head">' +
              '<span class="tag tag--' + AFP.util.domainColor(d.id) + '">' + d.code + "</span>" +
              '<span class="domain-row__name">' + d.nameEn + "</span>" +
            "</div>" +
            '<div class="bar"><div class="bar__fill" style="width:' + d.weight + '%"></div></div>' +
          "</div>" +
          '<span class="domain-row__pct">' + Math.round((d.weight / 100) * fmt.totalQuestions) + " preg.</span>" +
        "</div>"
      );
    }).join("");

    var weights = card("Pes de cada domini (prioritza per aquí)", [
      domains,
      '<p class="muted nested" style="font-size:var(--fs-sm)">Domini 2 + 3 junts = <b>52%</b> de l\u2019examen. Si tens poc temps, comença per aquells.</p>'
    ]);

    var plan = card("Pla d'estudi suggerit (4–6 setmanes)", li([
      "<b>Setmana 1:</b> Domini 1 (Fonaments d'IA/ML) + qüestionari.",
      "<b>Setmana 2:</b> Domini 2 (Fonaments GenAI) + qüestionari.",
      "<b>Setmana 3:</b> Domini 3 (Aplicacions FMs, el més pesat) + laboratoris.",
      "<b>Setmana 4:</b> Domini 4 i 5 (Responsible AI + Seguretat/Governança).",
      "<b>Setmana 5–6:</b> simuladors complets + repàs de dominis febles.",
      "Fes <b>4–6 simuladors complets</b> abans de reservar l'examen."
    ]));

    var strategy = card("Durant l'examen", li([
      "Tens ~<b>83 segons per pregunta</b>. No et quedis penjat en una: marca-la i continua.",
      "Les de <b>resposta múltiple</b> no donen puntuació parcial: marca TOTES les correctes.",
      "<b>Mai deixis una pregunta en blanc</b>: si s'acaba el temps, contesta alguna cosa.",
      "Llegeix bé els escenaris: busca la <b>tasca</b> (visió, veu, text, generació) abans de triar servei."
    ]));

    var mistakes = card("Errors comuns a evitar", li([
      "Memoritzar noms de serveis <b>sense els seus casos d'ús</b>: l'examen fa preguntes d'escenari.",
      "Saltar-se els dominis <b>4 i 5</b> ('només' són un 14% cadascun, però les preguntes sovint són contraintuïtives).",
      "Fer <b>un sol simulador</b>: cal diversos per detectar els punts febles.",
      "Confondre <b>Bedrock vs SageMaker</b>, o <b>Transcribe vs Polly</b>.",
      "Estudiar amb <b>dumps</b>: AWS els prohibeix i poden fer-te perdre la certificació."
    ]));

    var resources = card("Recursos oficials gratuïts", li([
      "AWS Skill Builder: curs i <b>preguntes oficials de pràctica</b> d'AIF-C01.",
      "AWS Cloud Quest i <b>PartyRock</b> per practicar GenAI sense codi.",
      "Documentació oficial d'<b>Amazon Bedrock</b> i dels serveis d'IA.",
      "Aquesta mateixa web: teoria, resums, qüestionaris i simulador."
    ]));

    return (
      '<div class="content">' +
        '<div class="eyebrow">Guia d\u2019examen</div>' +
        "<h1>Preparació per a l\u2019AIF-C01</h1>" +
        '<p class="muted">Tot el que has de saber sobre l\u2019examen AWS Certified AI Practitioner: format, ponderació, pla d\u2019estudi i consells.</p>' +
        format +
        '<div class="section-title"><h2>Distribució de preguntes</h2></div>' +
        weights +
        '<div class="section-title"><h2>Com preparar-te</h2></div>' +
        plan +
        '<div class="section-title"><h2>Consells i errors</h2></div>' +
        strategy +
        mistakes +
        '<div class="section-title"><h2>Recursos</h2></div>' +
        resources +
        '<div class="flex gap-2 mt-4" style="flex-wrap:wrap">' +
          '<a class="btn btn--primary" href="#/examen">Fes un simulador</a>' +
          '<a class="btn btn--ghost" href="#/estadistiques">Mira el teu progrés</a>' +
        "</div>" +
      "</div>"
    );
  }

  return { view: view };
})();
