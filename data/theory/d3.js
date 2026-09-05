window.AFP = window.AFP || {};

/* Domini 3: Applications of Foundation Models — teoria en català */
AFP.theoryD3 = [
  {
    id: "3.1",
    titleCa: "Amazon Bedrock (visió general)",
    intro: "Bedrock és el servei estrella de l'examen. Entén bé què és i què no és.",
    blocks: [
      { t: "def", en: "Amazon Bedrock", ca: "Servei <b>totalment gestionat</b> que permet accedir a una varietat de <b>foundation models</b> (d'Amazon i de tercers) mitjançant una <b>única API unificada</b>, sense gestionar infraestructura." },
      { t: "p", c: "Per què és útil? En lloc d'integrar cada proveïdor per separat, Bedrock et dóna un únic punt d'accés (API) a <b>Amazon Titan</b>, <b>Anthropic Claude</b>, <b>Meta Llama</b>, <b>Mistral</b>, <b>Cohere</b>, entre d'altres." },
      { t: "list", items: [
        "<b>Serverless</b> — no has d'aprovisionar servidors.",
        "<b>Seguretat i privacitat</b> — les teves dades no s'usen per reentrenar els models dels proveïdors.",
        "<b>Ecosistema</b> — Playground, Knowledge Bases, Agents, Guardrails, avaluació i customització."
      ] },
      { t: "callout", kind: "exam", title: "Memo", c: "Bedrock = accedir a models de tercers amb una sola API gestionada. SageMaker = construir/entrenar els teus propis models." }
    ]
  },
  {
    id: "3.2",
    titleCa: "Bedrock: models i Playground",
    intro: "Dins de Bedrock pots provar els models sense escriure codi, al Playground.",
    blocks: [
      { t: "p", c: "El <b>Playground</b> de Bedrock és la interfície de consola on proves els models amb prompts, ajustes paràmetres (temperature, top-p) i compares respostes entre models." },
      { t: "h", c: "Models destacats" },
      { t: "table", head: ["Model", "Especialitat"], rows: [
        ["<b>Amazon Titan</b>", "Text general i embeddings (representacions vectorials)."],
        ["<b>Anthropic Claude</b>", "Raonament avançat, redacció i conversa d'alta qualitat."],
        ["<b>Meta Llama</b>", "Models oberts per a text general."],
        ["<b>Cohere</b>", "Text i embeddings."],
        ["<b>Stability AI / Stable Diffusion</b>", "Generació d'imatges."]
      ] },
      { t: "p", c: "També hi ha models per a <b>embeddings</b>: converteixen text en vectors numèrics, essencials per a la cerca semàntica i el RAG." },
      { t: "callout", kind: "tip", title: "Recorda", c: "Els <b>embeddings</b> (vectors) són la peça tècnica darrere de les Knowledge Bases i la cerca per significat, no per paraules exactes." }
    ]
  },
  {
    id: "3.3",
    titleCa: "Bedrock: Knowledge Bases (RAG)",
    intro: "Les Knowledge Bases implementen RAG de manera gestionada i manejable.",
    blocks: [
      { t: "p", c: "Una <b>Knowledge Base</b> de Bedrock connecta els teus documents (a S3, per exemple) amb un magatzem de vectors i permet que el model hi <b>recuperi</b> la informació rellevant abans de respondre (RAG)." },
      { t: "list", items: [
        "Els documents es divideixen en <b>chunks</b> i es converteixen en <b>embeddings</b>.",
        "Els embeddings es guarden en una <b>vector database</b> (OpenSearch Serverless, Amazon Aurora, Pinecone, FAISS…).",
        "Quan preguntes, el sistema <b>retroba</b> els fragments més semblants i els afegeix al prompt (augmented generation)."
      ] },
      { t: "callout", kind: "exam", title: "Clau", c: "Les Knowledge Bases serveixen per <b>fonamentar les respostes en els TEUS documents</b> i reduir al·lucinacions, mantenint la informació actualitzada sense reentrenar el model." }
    ]
  },
  {
    id: "3.4",
    titleCa: "Bedrock: Agents i Guardrails",
    intro: "Dues capacitats de Bedrock per construir aplicacions més potents i segures.",
    blocks: [
      { t: "def", en: "Bedrock Agents", ca: "Permeten construir <b>agents conversacionals</b> que, a més de parlar, poden <b>executar accions</b> (cridar APIs, consultar bases de dades) mitjançant orquestració i eines." },
      { t: "def", en: "Bedrock Guardrails", ca: "Salvaguardes de contingut que <b>limiten les respostes</b> segons les teves polítiques: temes denegats, filtres de toxicitat, redacció de <b>PII</b>, i lèxic prohibit." },
      { t: "callout", kind: "tip", title: "Recorda", c: "Agents = fer coses (accions). Guardrails = limitar què es pot dir (contingut). Es veuen amb més detall al Domini 4." }
    ]
  },
  {
    id: "3.5",
    titleCa: "Bedrock: fine-tuning i avaluació",
    intro: "Bedrock també permet customitzar models i avaluar-los de manera gestionada.",
    blocks: [
      { t: "p", c: "<b>Model customization</b> (fine-tuning) a Bedrock permet entrenar un FM base amb les teves dades <b>privades</b>, sense que aquestes surtin del teu entorn." },
      { t: "p", c: "El <b>continued pre-training</b> és una variant per ensenyar coneixement nou de domini sense partir de zero." },
      { t: "h", c: "Avaluació (Bedrock Evaluations)" },
      { t: "list", items: [
        "<b>Model evaluation</b> — comparar models automàticament o amb 'models-as-a-judge'.",
        "<b>Human evaluation</b> — la teva equip valora les respostes.",
        "Ajusta el model adequat per a cada cas d'ús amb dades reals."
      ] },
      { t: "p", c: "Recorda: customitza només si prompt engineering i RAG no són suficients (ordre del Domini 2)." }
    ]
  },
  {
    id: "3.6",
    titleCa: "Amazon Q",
    intro: "L'assistent d'IA generativa d'AWS, en dues variants.",
    blocks: [
      { t: "def", en: "Amazon Q Business", ca: "Assistent d'IA generativa per a <b>usuaris de negoci</b>: respon preguntes, resumeix i genera contingut basant-se en les dades empresarials de l'organització (connectat a fonts com S3, SharePoint, etc.)." },
      { t: "def", en: "Amazon Q Developer", ca: "Assistent de <b>codi</b> per a desenvolupadors dins l'IDE (evolució de CodeWhisperer): suggereix codi, refactoritza, explica i ajuda a migrar." },
      { t: "callout", kind: "exam", title: "Memo", c: "Q Business = negoci/empresa. Q Developer = programador. No els confonguis: l'examen pregunta quin usar segons l'usuari." }
    ]
  },
  {
    id: "3.7",
    titleCa: "Amazon SageMaker",
    intro: "La plataforma per a qui vol construir els seus propis models de ML, de l'inici al final.",
    blocks: [
      { t: "p", c: "<b>SageMaker</b> és el servei de ML per <b>construir, entrenar i desplegar</b> els teus propis models a escala. A diferència de Bedrock (usar FMs), SageMaker és per a ML clàssic i per entrenar models propis." },
      { t: "h", c: "Peces importants per a l'examen" },
      { t: "table", head: ["Eina", "Funció"], rows: [
        ["<b>SageMaker Studio</b>", "Entorn integrat (IDE) per al cicle complet de ML."],
        ["<b>SageMaker JumpStart</b>", "Catàleg de models i solucions preconstruïdes per començar ràpid (també té FMs)."],
        ["<b>SageMaker Canvas</b>", "Eina <b>no-code</b> (visual) per crear models sense programar."],
        ["<b>SageMaker Clarify</b>", "Detectar <b>biaix</b> i explicar prediccions (interpretabilitat)."]
      ] },
      { t: "callout", kind: "exam", title: "Distinció crítica", c: "Bedrock vs SageMaker: Bedrock per aprofitar FMs ja fets; SageMaker per construir models des de zero i tenir control total." }
    ]
  },
  {
    id: "3.8",
    titleCa: "Serveis d'IA d'AWS",
    intro: "AWS té serveis 'ready-made' per a tasques concretes, sense entrenar res. És un dels punts més preguntats: saber quin servei correspon a cada necessitat.",
    blocks: [
      { t: "table", head: ["Servei", "Què fa"], rows: [
        ["<b>Amazon Rekognition</b>", "Anàlisi d'<b>imatges i vídeo</b>: objectes, escenes, cares, moderació, text en imatge."],
        ["<b>Amazon Comprehend</b>", "<b>NLP</b>: extreure entitats, sentiment, idioma, temes."],
        ["<b>Amazon Transcribe</b>", "<b>Speech-to-text</b>: convertir àudio/parla en text."],
        ["<b>Amazon Polly</b>", "<b>Text-to-speech</b>: convertir text en veu natural."],
        ["<b>Amazon Translate</b>", "Traducció automàtica entre idiomes."],
        ["<b>Amazon Textract</b>", "Extreure text i dades de <b>documents escanejats</b> (forms, taules)."],
        ["<b>Amazon Lex</b>", "Construir <b>chatbots</b> i interfícies conversacionals de veu."],
        ["<b>Amazon Kendra</b>", "<b>Cerca empresarial</b> intel·ligent sobre el teu contingut."]
      ] },
      { t: "p", c: "Aquests serveis són <b>API</b>: hi crides, pagues per ús i no gestiones cap model. Són el camí més ràpid per afegir IA a una aplicació." },
      { t: "callout", kind: "tip", title: "Són 'per team'?", c: "Memoritza els parells servei↔tasca: són una font segura de preguntes fàcils si els tens clars." }
    ]
  },
  {
    id: "3.9",
    titleCa: "Selecció del servei i del model",
    intro: "L'habilitat transversal: donat un escenari, triar la millor opció. Aquí es combina tot el que has après.",
    blocks: [
      { t: "h", c: "Què necessites? → Què faries servir?" },
      { t: "table", head: ["Necessitat", "Millor opció"], rows: [
        ["Un chatbot amb documents interns", "Bedrock + Knowledge Bases (RAG)"],
        ["Una app de transcripció d'àudio", "Amazon Transcribe"],
        ["Detectar objectes en fotos", "Amazon Rekognition"],
        ["Convertir text a veu", "Amazon Polly"],
        ["Analitzar el sentiment de ressenyes", "Amazon Comprehend"],
        ["Els teus propis models de ML a escala", "Amazon SageMaker"],
        ["FMs de tercers amb una API unificada", "Amazon Bedrock"]
      ] },
      { t: "h", c: "Criteris per triar un model dins Bedrock" },
      { t: "list", items: [
        "<b>Cost</b> — preu per token o imatge.",
        "<b>Latència</b> — velocitat de resposta.",
        "<b>Precisió / qualitat</b> — adequat a la tasca.",
        "<b>Context window</b> — per a documents llargs.",
        "<b>Llicència</b> — models oberts vs. propietaris.",
        "<b>Capacitats</b> — multimodal? raonament? codi?"
      ] },
      { t: "callout", kind: "exam", title: "Estratègia", c: "En escenaris, primer identifica la <b>tasca</b> (visió, veu, text, generació), després el <b>servei o model</b> que la resol més senzill. Revisa sempre trade-offs: cost vs. qualitat vs. latència." }
    ]
  }
];
