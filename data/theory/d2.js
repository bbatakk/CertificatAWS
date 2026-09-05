window.AFP = window.AFP || {};

/* Domini 2: Fundamentals of Generative AI — teoria en català */
AFP.theoryD2 = [
  {
    id: "2.1",
    titleCa: "Què és la IA generativa",
    intro: "La IA generativa crea contingut nou, no només classifica o prediu. És el cor de l'examen AIF-C01.",
    blocks: [
      { t: "p", c: "Mentre que la IA 'tradicional' (ML) aprèn a <b>classificar</b> o <b>predir</b> (una imatge és un gat?, quin serà el preu?), la <b>IA generativa</b> (GenAI) aprèn els patrons de les dades i els usa per <b>crear contingut nou</b>: text, imatges, música, codi i vídeo." },
      { t: "h", c: "L'evolució dels models generatius" },
      { t: "list", items: [
        "<b>GANs</b> (Generative Adversarial Networks) — dos models que competeixen (generador vs. discriminant). Bons per a imatges.",
        "<b>Models de difusió</b> (diffusion) — aprenen a revertir el soroll per generar imatges de gran qualitat.",
        "<b>Transformers</b> — l'arquitectura que ha revolucionat el text i que domina avui els LLM."
      ] },
      { t: "p", c: "Tot això ha desembocat en els anomenats <b>foundation models</b> (FM), que es veuen a continuació." },
      { t: "callout", kind: "tip", title: "Idea", c: "GenAI = crear coses noves. Aquest és el canvi conceptual respecte del ML clàssic que l'examen vol que tinguis clar." }
    ]
  },
  {
    id: "2.2",
    titleCa: "Foundation models i LLMs",
    intro: "El concepte estrella del curs. Has d'entendre què és un foundation model i per què és tan potent.",
    blocks: [
      { t: "def", en: "Foundation Model (FM)", ca: "Model d'IA molt gran <b>pre-entrenat</b> amb quantitats massives de dades i que es pot <b>adaptar</b> a moltes tasques diferents (no 'una tasca, un model')." },
      { t: "def", en: "Large Language Model (LLM)", ca: "Un foundation model especialitzat en <b>llenguatge natural</b>: entendre i generar text." },
      { t: "p", c: "El poder dels FM ve de l'<b>aprenentatge per transferència</b>: s'entrenen una sola vegada (caríssim) amb dades enormes, i després tu els aprofites amb molt poc esforç mitjançant prompts, RAG o fine-tuning." },
      { t: "p", c: "Exemples de FM: <b>Amazon Titan</b>, <b>Anthropic Claude</b>, <b>Meta Llama</b>, <b>Mistral</b>, <b>Cohere</b>, <b>Stability AI</b> (imatges)." },
      { t: "callout", kind: "exam", title: "Clau", c: "Un FM no és 'per a una sola cosa': és <b>multitasca</b> (traduir, resumir, respondre, escriure codi…) gràcies al seu pre-entrenament generalista." }
    ]
  },
  {
    id: "2.3",
    titleCa: "Transformers i atenció",
    intro: "L'arquitectura Transformer és la base de gairebé tots els LLM moderns. Cal saber-la a nivell conceptual.",
    blocks: [
      { t: "p", c: "Els <b>transformers</b> (2017) van substituir les xarxes recurrents per una idea clau: el mecanisme d'<b>atenció</b> (attention)." },
      { t: "def", en: "Attention", ca: "Mecanisme que permet al model <b>ponderar la importància</b> de cada paraula respecte de les altres en una seqüència, independentment de la seva distància." },
      { t: "p", c: "Amb <b>self-attention</b>, el model mira totes les paraules d'una frase alhora i decideix quines són rellevants per generar la següent. Això permet processar molt llargues seqüències i <b>paral·lelitzar</b> l'entrenament." },
      { t: "p", c: "D'aquí surten els models de <b>encoder-decoder</b> o els models <b>autoregressius</b> (predict the next token), que és com generen text els LLM actuals." },
      { t: "callout", kind: "tip", title: "Per si t'ho pregunten", c: "El transformer és la raó tècnica per la qual els LLM entenen context llarg i produeixen text coherent. No cal entrar en matemàtica: l'examen avalua el concepte." }
    ]
  },
  {
    id: "2.4",
    titleCa: "Tokens, paràmetres i context",
    intro: "Tres conceptes que mesuren la 'mida' i capacitat d'un LLM, i que surten constantment.",
    blocks: [
      { t: "def", en: "Token", ca: "Unitat mínima de text que el model processa. Pot ser una paraula o un fragment de paraula. Els models <b>cobren per token</b> i tenen un límit de tokens." },
      { t: "def", en: "Parameters (paràmetres)", ca: "Els valors interns (pesos) que el model ha après durant l'entrenament. Més paràmetres = model més gran i capac (per exemple, 'un model de 70B de paràmetres')." },
      { t: "def", en: "Context window", ca: "El nombre <b>màxim de tokens</b> que el model pot tenir en compte alhora, sumant l'entrada (prompt) i la sortida (resposta). Expressat en tokens o K (ex.: 200K de context)." },
      { t: "callout", kind: "exam", title: "Trampa habitual", c: "El <b>context window</b> no és el mateix que el <b>nombre de paràmetres</b>. Un model pot tenir molts paràmetres però una finestra de context petita." },
      { t: "p", c: "Aquestes tres magnituds influeixen directament en el <b>cost</b> i la <b>capacitat</b> d'un model, un criteri clau a l'hora de triar-lo (Domini 3)." }
    ]
  },
  {
    id: "2.5",
    titleCa: "Prompt engineering",
    intro: "Com demanem les coses al model determina la qualitat de la resposta. Aquesta és una habilitat molt preguntada.",
    blocks: [
      { t: "p", c: "El <b>prompt</b> és l'entrada que donem al model. El <b>prompt engineering</b> és l'habilitat de redactar-lo bé per obtenir respostes útils i precises — <b>sense tocar el model</b>." },
      { t: "h", c: "Tècniques bàsiques" },
      { t: "table", head: ["Tècnica", "Què és"], rows: [
        ["<b>Zero-shot</b>", "Donar només la instrucció, sense exemples."],
        ["<b>Few-shot</b>", "Donar uns quants exemples al prompt abans de la tasca (in-context learning)."],
        ["<b>Chain-of-thought (CoT)</b>", "Demanar al model que raoni 'pas a pas' abans de respondre."],
        ["<b>Role prompting</b>", "Assignar un rol ('actua com a expert en…')."]
      ] },
      { t: "callout", kind: "tip", title: "Bones pràctiques", c: "Instruccions clares, context rellevant, format de sortida especificat i exemples quan calgui. Un bon prompt millora el resultat sense cap canvi al model ni cost extra." }
    ]
  },
  {
    id: "2.6",
    titleCa: "Paràmetres d'inferència",
    intro: "A l'hora de generar, hi ha paràmetres que controlen la creativitat i la determinació del model. Sortiran en preguntes concretes.",
    blocks: [
      { t: "table", head: ["Paràmetre", "Efecte"], rows: [
        ["<b>Temperature</b>", "Controla l'<b>aleatorietat</b>: valors baixos (0.1) = respostes deterministes i previsibles; valors alts (0.9) = més creatives i variades."],
        ["<b>Top-p</b> (nucleus sampling)", "Limita la generació a un subconjunt de tokens acumulant una probabilitat p."],
        ["<b>Top-k</b>", "Limita a les k opcions més probables."],
        ["<b>Max tokens</b>", "Límit de longitud de la resposta generada."]
      ] },
      { t: "callout", kind: "exam", title: "Recorda", c: "<b>Temperature baixa</b> → respostes factuals, consistents (útil per a respostes objectives). <b>Temperature alta</b> → més originalitat (útil per a idees creatives), però més risc d'al·lucinar." }
    ]
  },
  {
    id: "2.7",
    titleCa: "Pre-entrenament, fine-tuning i RAG",
    intro: "Hi ha diverses maneres de 'fer servir' un model, amb cost i esforç molt diferents. És el tall més rellevant del Domini 2 i enllaça amb Bedrock (Domini 3).",
    blocks: [
      { t: "h", c: "1. Pre-entrenament (pre-training)" },
      { t: "p", c: "Entrenar un model <b>des de zero</b> amb dades massives. És <b>caríssim</b> (milions de dòlars i mesos de càlcul). Només ho fan grans laboratoris; tu gairebé mai ho faràs." },
      { t: "h", c: "2. Fine-tuning" },
      { t: "p", c: "Partir d'un FM pre-entrenat i <b>continuar entrenant-lo</b> amb un dataset propi i més petit per especialitzar-lo. Més barat que el pre-entrenament, però requereix dades etiquetades i càlcul." },
      { t: "h", c: "3. RAG (Retrieval-Augmented Generation)" },
      { t: "def", en: "RAG", ca: "Tècnica que <b>recupera informació d'una font externa</b> (documents, bases de dades) i la injecta al prompt perquè el model respongui amb base real i actualitzada, <b>sense reentrenar</b>." },
      { t: "table", head: ["Opció", "Esforç", "Ús típic"], rows: [
        ["Prompt engineering", "Nul·la", "Millorar respostes sense tocar res"],
        ["RAG", "Mitjà (documents + índex)", "Donar al model el TEU coneixement actualitzat"],
        ["Fine-tuning", "Alt (dades + càlcul)", "Canviar l'estil o especialitzar el model"],
        ["Pre-entrenament", "Enorme", "Només laboratoris d'IA"]
      ] },
      { t: "callout", kind: "exam", title: "Regla d'ordre", c: "Prova abans <b>prompt engineering</b>, després <b>RAG</b> i només si és necessari dedica't al <b>fine-tuning</b>. Aquest 'ordre' apareix a l'examen." }
    ]
  },
  {
    id: "2.8",
    titleCa: "Al·lucinacions i avaluació",
    intro: "Els models generatius poden equivocar-se de manera convincent, i això s'ha de mesurar i mitigar.",
    blocks: [
      { t: "def", en: "Hallucination (al·lucinació)", ca: "Contingut generat que sona convincent però és <b>fals o inventat</b>. Passa perquè el model prediu tokens probables, no 'veritats'." },
      { t: "p", c: "Com mitigar-la: usar <b>RAG</b> (fonamentar en fonts reals), afegir <b>guardrails</b>, demanar cites, baixar la temperature i incloure instruccions explícites de no inventar." },
      { t: "h", c: "Avaluació de models generatius" },
      { t: "p", c: "Avaluar un model generatiu és més subjectiu que un de classificació. S'usen:" },
      { t: "list", items: [
        "<b>Mètriques automàtiques</b> — BLEU, ROUGE (semblança amb referències) o perplexity.",
        "<b>Avaluació humana</b> — jutges humans valorant rellevància, fluïdesa, correcció.",
        "<b>Model-as-a-judge</b> — un altre LLM avalua les respostes segons criteris.",
        "<b>Benchmarks</b> — conjunts estàndard de proves per comparar models (cobertura de tasques, robustesa, toxicitat, biaix)."
      ] }
    ]
  }
];
