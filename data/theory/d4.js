window.AFP = window.AFP || {};

/* Domini 4: Guidelines for Responsible AI — teoria en català */
AFP.theoryD4 = [
  {
    id: "4.1",
    titleCa: "Principis de Responsible AI d'AWS",
    intro: "AWS defineix uns principis per desenvolupar i usar la IA de manera segura i justa. Saber-los és la base de tot el domini.",
    blocks: [
      { t: "p", c: "Els principis guien l'ús responsable d'IA, ML i GenAI. Les dimensions que l'examen valora són:" },
      { t: "list", items: [
        "<b>Fairness</b> (equitat) — evitar biaixos injustos.",
        "<b>Explainability</b> (explicabilitat) — entendre com i per què decideix.",
        "<b>Robustness</b> (robustesa) — funcionar bé en condicions extremes o adverses.",
        "<b>Privacy and Security</b> (privacitat i seguretat) — protegir dades i sistemes.",
        "<b>Transparency</b> (transparència) — comunicar clarament quan i com s'usa IA.",
        "<b>Governance</b> (governança) — processos, controls i supervisió."
      ] },
      { t: "callout", kind: "exam", title: "Memo", c: "AAPL — aquestes dimensions també es poden agrupar en: <b>fairness, explicabilitat, transparència, privacitat, robustesa i governança</b>." }
    ]
  },
  {
    id: "4.2",
    titleCa: "Biaix i equitat",
    intro: "Els models hereten els biaixos de les seves dades. Detecta'l i corregeix-lo.",
    blocks: [
      { t: "def", en: "Bias (biaix)", ca: "Error sistemàtic que fa que un model afavoreixi o perjudiqui injustament un grup. Sovint prové de dades d'entrenament esbiaixades." },
      { t: "p", c: "Tipus habituals: <b>sample bias</b> (les dades no representen la realitat), <b>label bias</b> (etiquetes esbiaixades), <b>confirmation bias</b>." },
      { t: "p", c: "La <b>fairness</b> busca que els resultats siguin equitativos. L'eina d'AWS per ajudar-hi és <b>Amazon SageMaker Clarify</b>:" },
      { t: "list", items: [
        "Detecta biaix en les <b>dades</b> i en les <b>prediccions</b>.",
        "Mesura disparitats entre grups (ex.: sexe, ètnia).",
        "Ajuda amb la <b>interpretabilitat</b> (quines features influeixen en cada predicció)."
      ] },
      { t: "callout", kind: "tip", title: "Biaix en GenAI", c: "Els models generatius poden reproduir biaixos de les dades amb què es van pre-entrenar. Es mitiga amb guardrails, avaluació contínua i diversitat de dades." }
    ]
  },
  {
    id: "4.3",
    titleCa: "Toxicitat i moderació",
    intro: "Els models poden generar text tòxic, ofensiu o nociu. Cal moderar.",
    blocks: [
      { t: "def", en: "Toxicity (toxicitat)", ca: "Contingut generat ofensiu, abusiu o nociu (odi, assetjament, violència)." },
      { t: "p", c: "Com es controla amb AWS:" },
      { t: "list", items: [
        "<b>Bedrock Guardrails</b> — filtres de toxicitat i temes denegats.",
        "<b>Amazon Rekognition</b> — moderació de contingut visual (imatges inadequades).",
        "<b>Amazon Comprehend</b> — detecció de toxicitat i llenguatge abusiu en text."
      ] },
      { t: "callout", kind: "exam", title: "Clau", c: "La <b>moderació</b> és el procés de detectar i bloquejar contingut inadequat; es pot fer amb serveis dedicats (Rekognition, Comprehend) o amb guardrails al model." }
    ]
  },
  {
    id: "4.4",
    titleCa: "Transparència i explicabilitat",
    intro: "Dues paraules semblants però diferents, i l'examen les distingeix.",
    blocks: [
      { t: "def", en: "Interpretability", ca: "Entendre el <b>funcionament intern</b> del model (com pren la decisió)." },
      { t: "def", en: "Explainability", ca: "Explicar una <b>predicció concreta</b> en termes humans (per què aquest resultat)." },
      { t: "def", en: "Transparency", ca: "Comunicar <b>obertament</b> que s'usa IA, com funciona i per a què." },
      { t: "p", c: "AWS ho facilita amb:" },
      { t: "list", items: [
        "<b>SageMaker Clarify</b> — explicabilitat (quines features pesen més).",
        "<b>Model cards</b> (fitxes de model) — documentar propòsit, dades, limitacions i rendiment."
      ] },
      { t: "callout", kind: "tip", title: "Recorda", c: "Interpretabilitat = com funciona per dins. Explicabilitat = explicar una resposta concreta. Transparència = ser obert sobre l'ús de la IA." }
    ]
  },
  {
    id: "4.5",
    titleCa: "Supervisió humana",
    intro: "La IA responsable no suprimeix les persones: les manté al cicle de decisions importants.",
    blocks: [
      { t: "def", en: "Human-in-the-loop", ca: "Disseny on una <b>persona revisa o aprova</b> les decisions del model, especialment les d'alt impacte." },
      { t: "p", c: "Quan cal supervisió humana?" },
      { t: "list", items: [
        "Decisions que <b>afecten persones</b> significativament (finances, salut, ocupació).",
        "Quan el model té <b>confiança baixa</b>.",
        "Contingut generat que es publicarà o s'usarà en entorns crítics."
      ] },
      { t: "p", c: "Un exemple: un codi generat per IA es <b>revisa</b> abans d'anar a producció. El desenvolupador que usa Amazon Q continua sent responsable del resultat." }
    ]
  },
  {
    id: "4.6",
    titleCa: "Privacitat",
    intro: "La IA processa dades personals, i això té implicacions legals i ètiques.",
    blocks: [
      { t: "p", c: "Principis de privacitat en IA:" },
      { t: "list", items: [
        "<b>Minimització de dades</b> — recollir només el necessari.",
        "<b>No usar dades sensibles</b> sense consentiment.",
        "<b>Anonimització / PII redaction</b> — eliminar o emmascarar dades personals.",
        "<b>Control d'accés</b> — només qui ha de, hi accedeix.",
        "<b>Compliment normatiu</b> — GDPR, HIPAA… (es veu al Domini 5)."
      ] },
      { t: "p", c: "A Bedrock hi ha <b>Guardrails amb redacció de PII</b> que emmascaren automàticament noms, correus, telèfons, etc." },
      { t: "callout", kind: "exam", title: "Memo", c: "<b>PII</b> (Personally Identifiable Information) = dades que identifiquen una persona. Redactar PII = amagar-les de les respostes." }
    ]
  },
  {
    id: "4.7",
    titleCa: "Desinformació i al·lucinació",
    intro: "Els models poden generar informació falsa de manera convincent.",
    blocks: [
      { t: "p", c: "La <b>desinformació</b> és un risc de la IA generativa: contingut fals però creïble que pot enganyar. Hi ha dos vessants:" },
      { t: "list", items: [
        "<b>Hallucination</b> — el model inventa dades perquè genera per probabilitat (Domini 2).",
        "<b>Deepfakes</b> — imatges/àudio/vídeo manipupats per semblar reals.",
        "<b>Ús maliciós</b> — generar desinformació a gran escala de manera intencionada."
      ] },
      { t: "p", c: "Mitigació: RAG (fonts reals), guardrails, marques d'aigua (watermarking) per identificar contingut generat, i política de transparència quan s'usa IA." },
      { t: "callout", kind: "tip", title: "Idea per a l'examen", c: "Reduir l'al·lucinació passa per <b>fonamentar</b> el model en dades reals (RAG) i limitar-lo amb guardrails, més que no pas per un simple prompt." }
    ]
  },
  {
    id: "4.8",
    titleCa: "Bedrock Guardrails",
    intro: "La peça pràctica d'AWS per aplicar la IA responsable sobre models de Bedrock. Acostuma a ser preguntada.",
    blocks: [
      { t: "p", c: "Els <b>Guardrails</b> de Bedrock defineixen polítiques de contingut que s'apliquen a les respostes dels models:" },
      { t: "list", items: [
        "<b>Denied topics</b> — temes que el model ha de rebutjar.",
        "<b>Toxicity filters</b> — bloquejar llenguatge ofensiu.",
        "<b>PII redaction</b> — emmascarar dades personals.",
        "<b>Word filters</b> — vocabulari o paraules prohibides."
      ] },
      { t: "p", c: "S'apliquen de manera <b>centralitzada</b> (una política per a molts models) i es poden personalitzar per cas d'ús." },
      { t: "callout", kind: "exam", title: "Clau", c: "Guardrails = els 'rails' que mantenen els models dins del que és segur i permès. Recorda els quatre tipus de control." }
    ]
  }
];
