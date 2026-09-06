window.AFP = window.AFP || {};

/* ==========================================================================
   Ampliació del banc de preguntes — més varietat per als qüestionaris
   (s'afegeixen a AFP.quizBank i es recalcula AFP.quizByDomain)
   ========================================================================== */

(function () {
  var extra = [
    /* ---------------- DOMINI 1 (afegits) ---------------- */
    {
      id: "q-1-14", domain: 1, type: "single",
      promptCa: "Una empresa vol predir el preu futur d'una propietat (un valor continu). De quin tipus de problema de ML es tracta?",
      options: ["Regressió", "Classificació", "Clustering", "Detecció d'anomalies"],
      answer: [0],
      explainCa: "Predir un valor continu (preu, demanda) és un problema de regressió. La classificació prediu categories discretes."
    },
    {
      id: "q-1-15", domain: 1, type: "single",
      promptCa: "Quin conjunt de dades es reserva EXCLUSIVAMENT per avaluar el model al final, sense tocar-lo mai durant l'entrenament?",
      options: ["El test set", "El training set", "El validation set", "Les features"],
      answer: [0],
      explainCa: "El test set simula dades futures mai vistes i només s'usa al final per mesurar el rendiment real del model."
    },
    {
      id: "q-1-16", domain: 1, type: "single",
      promptCa: "Què provoca un learning rate massa alt durant l'entrenament?",
      options: [
        "Que l'entrenament oscil·li i no convergeixi",
        "Que l'entrenament sigui més precís",
        "Que el dataset es faci més gran",
        "Res; és indiferent"
      ],
      answer: [0],
      explainCa: "Un learning rate massa alt fa passos tan grans que l'algorisme salta per sobre de l'òptim i oscil·la sense convergir."
    },
    {
      id: "q-1-17", domain: 1, type: "multiple",
      promptCa: "Quines dues opcions són exemples d'aplicació d'aprenentatge supervisat? (Selecciona 2)",
      options: [
        "Classificar correus com a spam o no spam",
        "Predir si un client es donarà de baixa",
        "Agrupar clients semblants sense etiquetes",
        "Reduir la dimensionalitat de les dades",
        "Detectar anomalies en logs sense etiquetes"
      ],
      answer: [0, 1],
      explainCa: "Classificar spam i predir l'abandonament usen dades etiquetades (supervisat). Agrupar i reduir dimensions sense etiquetes és no supervisat."
    },
    {
      id: "q-1-18", domain: 1, type: "single",
      promptCa: "Què és el gradient descent?",
      options: [
        "L'algorisme que ajusta els paràmetres per minimitzar la pèrdua",
        "Una mètrica d'avaluació",
        "Un tipus de xarxa neuronal",
        "Un servei d'AWS"
      ],
      answer: [0],
      explainCa: "El gradient descent és l'algorisme d'optimització que mou els paràmetres en la direcció que redueix la loss function."
    },
    {
      id: "q-1-19", domain: 1, type: "single",
      promptCa: "En un problema mèdic, preferim detectar TOTS els casos de malaltia encara que hi hagi falses alarmes. Quina mètrica importa més?",
      options: ["Recall", "Precision", "Accuracy", "El nombre de samples"],
      answer: [0],
      explainCa: "El recall prioritza trobar tots els positius reals (evitar falsos negatius), encara que augmentin els falsos positius."
    },
    {
      id: "q-1-20", domain: 1, type: "single",
      promptCa: "Quina arquitectura de xarxa neuronal és més adequada per processar imatges?",
      options: [
        "CNN (Convolutional Neural Networks)",
        "LSTM",
        "RNN",
        "Un transformer sempre"
      ],
      answer: [0],
      explainCa: "Les CNN estan especialitzades en visió per computador (imatges), per la seva capacitat de detectar patrons locals."
    },
    {
      id: "q-1-21", domain: 1, type: "single",
      promptCa: "Quan fas inferència en mode batch (per lots)?",
      options: [
        "Quan no cal resposta en temps real i pots processar moltes dades alhora",
        "Quan necessites resposta immediata per a una sola petició",
        "Quan el model encara no està entrenat",
        "Sempre que fas qualsevol predicció"
      ],
      answer: [0],
      explainCa: "La inferència batch processa lots de dades de manera programada i econòmica, sense exigir latència baixa."
    },

    /* ---------------- DOMINI 2 (afegits) ---------------- */
    {
      id: "q-2-17", domain: 2, type: "single",
      promptCa: "Què vol dir que un model és 'multimodal'?",
      options: [
        "Que pot treballar amb més d'un tipus de dades (text, imatges, àudio)",
        "Que té molts paràmetres",
        "Que és de codi obert",
        "Que es pot desplegar a moltes regions"
      ],
      answer: [0],
      explainCa: "Un model multimodal accepta i genera diversos tipus d'entrada/sortida, com text i imatges alhora."
    },
    {
      id: "q-2-18", domain: 2, type: "single",
      promptCa: "Quina tècnica demana al model raonar 'pas a pas' abans de donar la resposta final?",
      options: ["Chain-of-thought", "Zero-shot", "Fine-tuning", "Pre-entrenament"],
      answer: [0],
      explainCa: "Chain-of-thought (CoT) instrueix el model a mostrar el raonament intermedi, millorant la precisió en tasques complexes."
    },
    {
      id: "q-2-19", domain: 2, type: "single",
      promptCa: "Per què els models generatius poden 'al·lucinar'?",
      options: [
        "Perquè prediuen les paraules més probables, no veritats comprovades",
        "Perquè tenen virus informàtics",
        "Perquè el maquinari falla",
        "Perquè el prompt és massa curt sempre"
      ],
      answer: [0],
      explainCa: "Els LLM generen token a token per probabilitat; de vegades produeixen seqüències plausibles però factualment falses (al·lucinacions)."
    },
    {
      id: "q-2-20", domain: 2, type: "single",
      promptCa: "Què diferencia el prompt engineering del fine-tuning?",
      options: [
        "El prompt engineering no modifica el model; el fine-tuning el reentrena",
        "Són el mateix",
        "El fine-tuning no modifica el model",
        "El prompt engineering redueix la mida del model"
      ],
      answer: [0],
      explainCa: "El prompt engineering només canvia les instruccions; el fine-tuning ajusta els pesos del model amb dades pròpies."
    },
    {
      id: "q-2-21", domain: 2, type: "multiple",
      promptCa: "Quines dues opcions influeixen en el cost d'ús d'un LLM? (Selecciona 2)",
      options: [
        "El nombre de tokens processats",
        "La mida del model (nombre de paràmetres)",
        "El color del fons de la pàgina",
        "La marca del navegador",
        "El dia de la setmana"
      ],
      answer: [0, 1],
      explainCa: "Es paga per token i els models més grans (més paràmetres) tenen un preu per token superior."
    },
    {
      id: "q-2-22", domain: 2, type: "single",
      promptCa: "En quin escenari és més adequat el fine-tuning?",
      options: [
        "Quan cal canviar de manera estable l'estil o especialitzar el model en un domini",
        "Quan només volem afegir documents de consulta",
        "Quan no tenim cap dada",
        "Quan el prompt ja resol el problema"
      ],
      answer: [0],
      explainCa: "El fine-tuning és per quan cal una especialització profunda i estable. Per afegir coneixement extern, RAG és més adequat."
    },
    {
      id: "q-2-23", domain: 2, type: "single",
      promptCa: "Què és el 'pre-entrenament' d'un foundation model?",
      options: [
        "El primer entrenament massiu amb dades enormes que estableix les capacitats base",
        "Una tècnica de prompt",
        "Un ajustament barat amb poques dades",
        "El desplegament del model"
      ],
      answer: [0],
      explainCa: "El pre-entrenament és l'entrenament inicial a gran escala (caríssim) que dóna al FM les seves capacitats generals."
    },
    {
      id: "q-2-24", domain: 2, type: "single",
      promptCa: "Com es pot reduir el risc que un model inventi dades en una resposta?",
      options: [
        "Fonamentant-lo amb RAG en fonts reals",
        "Apujant la temperature",
        "Eliminant el context window",
        "No llegint mai les respostes"
      ],
      answer: [0],
      explainCa: "RAG aporta informació real al prompt, reduint la necessitat del model d'inventar. Apujar la temperature ho empitjora."
    },

    /* ---------------- DOMINI 3 (afegits) ---------------- */
    {
      id: "q-3-19", domain: 3, type: "single",
      promptCa: "Quin servei d'AWS construeix chatbots i interfícies conversacionals?",
      options: ["Amazon Lex", "Amazon Polly", "Amazon Forecast", "Amazon Kendra"],
      answer: [0],
      explainCa: "Lex és el servei per construir bots conversacionals i d'àudio (la tecnologia darrere d'Alexa)."
    },
    {
      id: "q-3-20", domain: 3, type: "single",
      promptCa: "Un client vol traduir automàticament el seu lloc web a 10 idiomes. Quin servei fa servir?",
      options: ["Amazon Translate", "Amazon Transcribe", "Amazon Polly", "Amazon Lex"],
      answer: [0],
      explainCa: "Translate fa traducció automàtica entre idiomes. Transcribe i Polly són de parla; Lex és de conversa."
    },
    {
      id: "q-3-21", domain: 3, type: "single",
      promptCa: "Quina eina de Bedrock permet veure quins models hi ha disponibles i provar-los amb prompts?",
      options: ["Bedrock Playground", "Bedrock Guardrails", "SageMaker Canvas", "Amazon Q"],
      answer: [0],
      explainCa: "El Playground de Bedrock deixa triar el model, provar prompts i ajustar paràmetres d'inferència sense codi."
    },
    {
      id: "q-3-22", domain: 3, type: "single",
      promptCa: "Quin servei prediu valors futurs d'una sèrie temporal (p. ex., vendes setmanals)?",
      options: ["Amazon Forecast", "Amazon Rekognition", "Amazon Comprehend", "Amazon Textract"],
      answer: [0],
      explainCa: "Forecast és per a prediccions de sèries temporals. Els altres són de visió, text i documents."
    },
    {
      id: "q-3-23", domain: 3, type: "single",
      promptCa: "Què fa SageMaker Clarify?",
      options: [
        "Detectar biaix i explicar les prediccions dels models",
        "Generar imatges",
        "Convertir text a veu",
        "Traduir idiomes"
      ],
      answer: [0],
      explainCa: "Clarify ajuda a detectar biaixos i proporciona explicabilitat, afavorint la IA responsable (Domini 4)."
    },
    {
      id: "q-3-24", domain: 3, type: "multiple",
      promptCa: "Quines dues opcions descriuen Amazon Bedrock? (Selecciona 2)",
      options: [
        "Accés a FMs de diversos proveïdors amb una API unificada",
        "Servei totalment gestionat (sense aprovisionar servidors)",
        "Un motor de bases de dades relacionals",
        "Un servei de xarxa CDN",
        "Un registre de dominis"
      ],
      answer: [0, 1],
      explainCa: "Bedrock és un servei gestionat que unifica l'accés a FMs de tercers (Titan, Claude, Llama…)."
    },
    {
      id: "q-3-25", domain: 3, type: "single",
      promptCa: "Quin servei d'AWS usa embeddings i cerca semàntica per trobar respostes en la documentació d'una empresa?",
      options: ["Amazon Kendra", "Amazon Polly", "Amazon Transcribe", "Amazon Lex"],
      answer: [0],
      explainCa: "Kendra és la cerca empresarial intel·ligent, que entén el significat (semàntica) més que les paraules exactes."
    },
    {
      id: "q-3-26", domain: 3, type: "single",
      promptCa: "Quin criteri NO és rellevant per triar un model dins de Bedrock?",
      options: [
        "El color de la interfície del Playground",
        "El cost per token",
        "La latència de resposta",
        "El context window del model"
      ],
      answer: [0],
      explainCa: "Cost, latència, context i precisió són criteris reals. El color de la interfície no influeix en la tria del model."
    },

    /* ---------------- DOMINI 4 (afegits) ---------------- */
    {
      id: "q-4-10", domain: 4, type: "single",
      promptCa: "Quina dimensió de la IA responsable es refereix a funcionar bé davant entrades extremes o adverses?",
      options: ["Robustesa", "Fairness", "Transparència", "Privacitat"],
      answer: [0],
      explainCa: "La robustesa és la capacitat del model de mantenir un comportament segur i correcte en condicions difícils o malintencionades."
    },
    {
      id: "q-4-11", domain: 4, type: "single",
      promptCa: "Com es mitiga el biaix d'un model de ML?",
      options: [
        "Detectar-lo amb eines com SageMaker Clarify i corregir les dades",
        "Ignorant-lo completament",
        "Apujant la temperature",
        "Amagant els resultats"
      ],
      answer: [0],
      explainCa: "S'ha de detectar (Clarify) i corregir, sovint millorant les dades d'entrenament perquè siguin representatives."
    },
    {
      id: "q-4-12", domain: 4, type: "single",
      promptCa: "Què és un 'deepfake'?",
      options: [
        "Contingut multimèdia manipulat per semblar real (imatge/vídeo/àudio)",
        "Un error en el gradient descent",
        "Un tipus de base de dades",
        "Un servei d'AWS"
      ],
      answer: [0],
      explainCa: "Un deepfake és contingut fals generat o manipulat per IA que sembla autèntic, un risc de desinformació."
    },
    {
      id: "q-4-13", domain: 4, type: "multiple",
      promptCa: "Quines dues pràctiques afavoreixen una IA responsable en una app generativa? (Selecciona 2)",
      options: [
        "Aplicar guardrails de contingut",
        "Mantenir supervisió humana en decisions importants",
        "Deixar els prompts sense cap control",
        "Ocultar als usuaris que parlen amb una IA",
        "Entrenar només amb dades esbiaixades"
      ],
      answer: [0, 1],
      explainCa: "Guardrails i supervisió humana (human-in-the-loop) són pràctiques de Responsible AI. Amagar l'ús d'IA va contra la transparència."
    },
    {
      id: "q-4-14", domain: 4, type: "single",
      promptCa: "Per què cal transparència en un sistema que usa IA generativa?",
      options: [
        "Perquè els usuaris sàpiguen que interactuen amb una IA i quines implicacions té",
        "Per reduir el cost",
        "Per accelerar el model",
        "No cal mai transparència"
      ],
      answer: [0],
      explainCa: "La transparència informa els usuaris sobre l'ús de la IA, les seves limitacions i com es tracten les seves dades."
    },
    {
      id: "q-4-15", domain: 4, type: "single",
      promptCa: "Quin element NO forma part de Bedrock Guardrails?",
      options: [
        "Escalat automàtic de servidors",
        "Filtres de toxicitat",
        "Temes denegats",
        "Redacció de PII"
      ],
      answer: [0],
      explainCa: "Guardrails controla contingut (toxicitat, temes, PII, paraules). L'escalat de servidors és una qüestió d'infraestructura, no de guardrails."
    },

    /* ---------------- DOMINI 5 (afegits) ---------------- */
    {
      id: "q-5-14", domain: 5, type: "single",
      promptCa: "Amb quin servei encriptes les teves dades en repòs a AWS?",
      options: ["AWS KMS", "Amazon Polly", "Amazon Rekognition", "Amazon Lex"],
      answer: [0],
      explainCa: "KMS gestiona les claus de xifrat. S'integra amb S3, EBS, Bedrock, etc., per xifrar en repòs."
    },
    {
      id: "q-5-15", domain: 5, type: "single",
      promptCa: "Què aconsegueixes fent servir PrivateLink per a Bedrock?",
      options: [
        "Accedir-hi sense que el trànsit passi per Internet públic",
        "Augmentar la latència",
        "Eliminar la necessitat d'IAM",
        "Reduir el nombre de tokens"
      ],
      answer: [0],
      explainCa: "PrivateLink (VPC Endpoints) connecta els teus recursos a Bedrock de manera privada, millorant seguretat i compliment."
    },
    {
      id: "q-5-16", domain: 5, type: "single",
      promptCa: "Quin servei registra 'qui ha fet què' mitjançant les crides a l'API?",
      options: ["AWS CloudTrail", "Amazon Polly", "Amazon Forecast", "Amazon Translate"],
      answer: [0],
      explainCa: "CloudTrail és el registre d'auditoria de les crides API. És essencial per a seguretat i compliment."
    },
    {
      id: "q-5-17", domain: 5, type: "multiple",
      promptCa: "Quines dues opcions són responsabilitat del CLIENT segons el model compartit? (Selecciona 2)",
      options: [
        "Configurar rols i polítiques IAM",
        "Xifrar les seves dades",
        "La seguretat física del datacenter",
        "El manteniment de l'hipervisor",
        "La infraestructura de xarxa física"
      ],
      answer: [0, 1],
      explainCa: "El client gestiona IAM i el xifrat de les seves dades. La capa física i l'hipervisor són responsabilitat d'AWS."
    },
    {
      id: "q-5-18", domain: 5, type: "single",
      promptCa: "Què garanteixes complir triant la regió correcta per al teu servei d'IA?",
      options: [
        "Els requisits de residència de dades",
        "Que el model és gratuït",
        "Que no cal aplicar IAM",
        "Que no hi ha cap normativa"
      ],
      answer: [0],
      explainCa: "La regió determina on es processen i emmagatzemen les dades, satisfent requisits de residència (GDPR, HIPAA…)."
    },
    {
      id: "q-5-19", domain: 5, type: "single",
      promptCa: "Què documenten les 'model cards'?",
      options: [
        "El propòsit, les dades, el rendiment i les limitacions d'un model",
        "La llista de servidors usats",
        "El preu per token",
        "El color de la interfície"
      ],
      answer: [0],
      explainCa: "Les model cards són fitxes de governança que documenten cada model per afavorir la transparència i la traçabilitat."
    }
  ];

  // Afegeix al banc i recalcula l'índex per domini
  extra.forEach(function (q) { AFP.quizBank.push(q); });

  AFP.quizByDomain = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  AFP.quizBank.forEach(function (q) { AFP.quizByDomain[q.domain].push(q); });
})();
