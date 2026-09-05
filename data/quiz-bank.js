window.AFP = window.AFP || {};

/* ==========================================================================
   Banc de preguntes (original, alineat al blueprint AIF-C01)

   Esquema de pregunta:
   {
     id:       "q-<domini>-<n>",       // identificador únic
     domain:   1..5,                   // domini al qual pertany
     type:     "single" | "multiple",  // elecció única (1 correcta) o resposta múltiple (2+ correctes)
     promptCa: "Enunciat en català…",
     promptEn: "(opcional) Enunciat en anglès…",
     options:  ["a","b","c","d", ...],  // 4 opcions (single) o 5 (multiple)
     answer:   [0]  |  [1,3],           // índexs de les respostes correctes
     explainCa: "Explicació didàctica…"
   }

   NOTA: mai dumps reals; preguntes originals alineades al blueprint oficial.
   ========================================================================== */

AFP.quizBank = [
  /* ---------------- DOMINI 1: Fundamentals of AI and ML ---------------- */
  {
    id: "q-1-1",
    domain: 1,
    type: "single",
    promptCa: "Quina de les següents opcions descriu millor la relació entre IA, ML i DL?",
    options: [
      "DL és un subconjunt de ML, i ML és un subconjunt d'IA",
      "IA és un subconjunt de ML, i ML és un subconjunt de DL",
      "Són tres conceptes totalment independents i sense relació",
      "ML i DL són el mateix concepte aplicat a dades diferents"
    ],
    answer: [0],
    explainCa: "La IA és el camp més ampli. El Machine Learning n'és un subconjunt (aprendre de dades), i el Deep Learning és un subconjunt del ML basat en xarxes neuronals profundes."
  },
  {
    id: "q-1-2",
    domain: 1,
    type: "single",
    promptCa: "Un model que rep dades amb etiquetes (labels) per aprendre a predir-les fa servir quin tipus d'aprenentatge?",
    options: [
      "Aprenentatge supervisat",
      "Aprenentatge no supervisat",
      "Aprenentatge per reforç",
      "Aprenentatge generatiu"
    ],
    answer: [0],
    explainCa: "L'aprenentatge supervisat usa dades etiquetades (cada exemple té la resposta correcta). El no supervisat treballa amb dades sense etiquetes; el per reforç aprèn mitjançant premi/càstig."
  },
  {
    id: "q-1-3",
    domain: 1,
    type: "single",
    promptCa: "Quina mètrica és més útil quan les classes estan desequilibrades (p. ex., molt pocs positius)?",
    options: [
      "L'accuracy (exactitud)",
      "L'F1-score",
      "El nombre total de mostres",
      "El temps d'entrenament"
    ],
    answer: [1],
    explainCa: "Amb classes desequilibrades l'accuracy enganya (predir sempre la classe majoritària dóna accuracy alta). L'F1-score (mitjana harmònica de precision i recall) capta millor el rendiment real."
  },
  {
    id: "q-1-4",
    domain: 1,
    type: "single",
    promptCa: "Què vol dir que un model pateix 'overfitting'?",
    options: [
      "Que no aprèn res de les dades d'entrenament",
      "Que memoritza les dades d'entrenament i generalitza malament a dades noves",
      "Que és massa senzill i no capta els patrons",
      "Que triga massa a entrenar-se"
    ],
    answer: [1],
    explainCa: "L'overfitting (sobreajustament) passa quan el model s'ajusta massa a les dades d'entrenament (inclòs el soroll) i, per tant, no generalitza bé a dades noves."
  },
  {
    id: "q-1-5",
    domain: 1,
    type: "multiple",
    promptCa: "Quins dos conceptes formen part del cicle de vida típic d'un model de ML? (Selecciona 2)",
    options: [
      "Preparació de les dades",
      "Entrenament del model",
      "Compra de maquinari dedicat",
      "Redacció d'un comunicat de premsa",
      "Còpia de seguretat de fitxers personals"
    ],
    answer: [0, 1],
    explainCa: "El cicle de vida inclou, entre altres, la preparació de dades i l'entrenament, a més de l'avaluació i el desplegament."
  },

  /* ---------------- DOMINI 2: Fundamentals of Generative AI ---------------- */
  {
    id: "q-2-1",
    domain: 2,
    type: "single",
    promptCa: "Què és un 'foundation model' (FM)?",
    options: [
      "Un model pre-entrenat amb grans quantitats de dades, adaptable a moltes tasques",
      "Un model que només serveix per traduir idiomes",
      "Un tipus de base de dades per a text",
      "El primer model que AWS va publicar el 2006"
    ],
    answer: [0],
    explainCa: "Un foundation model és un model gran pre-entrenat amb quantitats massives de dades que es pot adaptar (mitjançant prompt engineering, RAG o fine-tuning) a moltes tasques diferents."
  },
  {
    id: "q-2-2",
    domain: 2,
    type: "single",
    promptCa: "Quin paràmetre d'inferència controla l'aleatorietat o creativitat de les respostes d'un LLM?",
    options: [
      "El nombre de tokens",
      "La temperature",
      "El learning rate",
      "El context window"
    ],
    answer: [1],
    explainCa: "La temperature controla l'aleatorietat: valors baixos fan respostes més deterministes, valors alts més variades/creatives. El context window és el límit de tokens; el learning rate és propi de l'entrenament."
  },
  {
    id: "q-2-3",
    domain: 2,
    type: "single",
    promptCa: "Què és 'RAG' (Retrieval-Augmented Generation)?",
    options: [
      "Entrenar un model des de zero amb dades noves",
      "Combinar el model amb una font de coneixement externa per millorar les respostes",
      "Un tipus de token especial del model",
      "Reduir la mida del model perquè costi menys"
    ],
    answer: [1],
    explainCa: "RAG recupera informació rellevant d'una font externa (p. ex., una Knowledge Base) i la passa al model perquè generi respostes més precises i actualitzades, sense reentrenar-lo."
  },
  {
    id: "q-2-4",
    domain: 2,
    type: "single",
    promptCa: "En què es diferencia el 'fine-tuning' del 'prompt engineering'?",
    options: [
      "Són el mateix, només canvia el nom",
      "El fine-tuning reentrena el model amb dades pròpies; el prompt engineering només canvia les instruccions",
      "El fine-tuning només canvia les instruccions; el prompt engineering reentrena",
      "El fine-tuning redueix la mida del model"
    ],
    answer: [1],
    explainCa: "El fine-tuning ajusta els pesos del model entrenant-lo amb dades específiques teves. El prompt engineering (zero-shot, few-shot, chain-of-thought) només millora les instruccions sense tocar el model."
  },
  {
    id: "q-2-5",
    domain: 2,
    type: "single",
    promptCa: "Què és una 'al·lucinació' en un model generatiu?",
    options: [
      "Un error de maquinari del servidor",
      "Contingut generat que sona plausible però és incorrecte o inventat",
      "Quan el model triga massa a respondre",
      "La capacitat del model de crear imatges"
    ],
    answer: [1],
    explainCa: "Una al·lucinació és una resposta que sembla creïble però conté fets falsos o inventats. Es mitiga amb RAG, guardrails i instruccions clares."
  },

  /* ---------------- DOMINI 3: Applications of Foundation Models ---------------- */
  {
    id: "q-3-1",
    domain: 3,
    type: "single",
    promptCa: "Quin servei d'AWS fem servir per accedir a foundation models com Claude d'Anthropic o Titan d'Amazon mitjançant una única API?",
    options: [
      "Amazon SageMaker",
      "Amazon Bedrock",
      "Amazon Lex",
      "Amazon Polly"
    ],
    answer: [1],
    explainCa: "Amazon Bedrock és el servei gestionat d'AWS per accedir a una varietat de foundation models (Amazon Titan, Claude d'Anthropic, Llama de Meta…) mitjançant una API unificada."
  },
  {
    id: "q-3-2",
    domain: 3,
    type: "single",
    promptCa: "Un client vol crear un chatbot preparat amb documentació interna sense entrenar un model. Quina eina de Bedrock és més adequada?",
    options: [
      "Bedrock Agents amb una Knowledge Base (RAG)",
      "Amazon Polly",
      "Amazon Transcribe",
      "Amazon Forecast"
    ],
    answer: [0],
    explainCa: "Bedrock Agents amb una Knowledge Base implementa RAG: el chatbot es recolza en la documentació pujada (S3, vector DB) per respondre amb base real, sense reentrenar."
  },
  {
    id: "q-3-3",
    domain: 3,
    type: "single",
    promptCa: "Quin servei fem servir per analitzar imatges i detectar-hi objectes, cares i text?",
    options: [
      "Amazon Comprehend",
      "Amazon Rekognition",
      "Amazon Kendra",
      "Amazon Textract"
    ],
    answer: [1],
    explainCa: "Amazon Rekognition analitza imatges i vídeo (objectes, escenes, cares, text en imatge). Comprehend és text/NLP; Textract extreu text de documents escanejats; Kendra és cerca empresarial."
  },
  {
    id: "q-3-4",
    domain: 3,
    type: "single",
    promptCa: "Quin servei converteix text en parla (text-to-speech)?",
    options: [
      "Amazon Transcribe",
      "Amazon Polly",
      "Amazon Lex",
      "Amazon Translate"
    ],
    answer: [1],
    explainCa: "Polly fa text-to-speech. Transcribe és l'invers (speech-to-text). Lex construeix bots conversacionals; Translate tradueix idiomes."
  },
  {
    id: "q-3-5",
    domain: 3,
    type: "multiple",
    promptCa: "Quines dues capacitats proporciona Amazon Q? (Selecciona 2)",
    options: [
      "Assistent d'IA per als usuaris de negoci (Q Business)",
      "Assistent de codi per a desenvolupadors (Q Developer)",
      "Servei de traducció automàtica",
      "Servei de text-to-speech",
      "Servei d'anàlisi d'imatges"
    ],
    answer: [0, 1],
    explainCa: "Amazon Q té dues variants principals: Q Business (assistent per a usuaris de negoci sobre les seves dades) i Q Developer (assistent de codi, evolució de CodeWhisperer)."
  },

  /* ---------------- DOMINI 4: Responsible AI ---------------- */
  {
    id: "q-4-1",
    domain: 4,
    type: "single",
    promptCa: "Quina eina d'AWS ajuda a detectar biaix en les dades i en les prediccions dels models de ML?",
    options: [
      "Amazon SageMaker Clarify",
      "Amazon Polly",
      "Amazon Transcribe",
      "Amazon Forecast"
    ],
    answer: [0],
    explainCa: "SageMaker Clarify detecta biaix i ajuda a explicar les prediccions (interpretabilitat), afavorint la fairness i la transparència."
  },
  {
    id: "q-4-2",
    domain: 4,
    type: "single",
    promptCa: "Què fa Amazon Bedrock Guardrails?",
    options: [
      "Aplicar polítiques de contingut per bloquejar temes no desitjats, toxicitat i PII",
      "Encriptar el trànsit de xarxa",
      "Crear usuaris IAM",
      "Optimitzar el cost de les consultes"
    ],
    answer: [0],
    explainCa: "Bedrock Guardrails aplica salvaguardes de contingut (denied topics, filtres de toxicitat, redacció de PII, vocabulari) per mantenir les respostes dins límits segurs i responsables."
  },
  {
    id: "q-4-3",
    domain: 4,
    type: "multiple",
    promptCa: "Quines dues opcions són dimensions o principis clau de la IA responsable? (Selecciona 2)",
    options: [
      "Fairness (equitat)",
      "Transparència i explicabilitat",
      "Màxim rendiment a qualsevol cost",
      "Eliminar tota supervisió humana",
      "Mantenir els models com a caixa negra sempre"
    ],
    answer: [0, 1],
    explainCa: "Fairness, transparència/explicabilitat, privacitat, robustesa i governança són dimensions de la IA responsable. La supervisió humana i l'obertura hi són desitjables, no pas eliminar-les."
  },

  /* ---------------- DOMINI 5: Security, Compliance, and Governance ---------------- */
  {
    id: "q-5-1",
    domain: 5,
    type: "single",
    promptCa: "Dins el model de responsabilitat compartida d'AWS, qui és responsable de configurar correctament els controls d'accés (IAM) als teus models d'IA?",
    options: [
      "Només AWS, sempre",
      "El client",
      "El proveïdor del model de tercers",
      "Ningú, és automàtic"
    ],
    answer: [1],
    explainCa: "AWS és responsable 'de la seguretat del núvol' (infraestructura), mentre que el client és responsable 'a dins del núvol', incloent-hi la configuració d'IAM, el xifrat i les seves dades."
  },
  {
    id: "q-5-2",
    domain: 5,
    type: "single",
    promptCa: "Quin principi d'IAM diu que cal concedir només els permisos mínims necessaris per fer la feina?",
    options: [
      "Principi de mínim privilegi (least privilege)",
      "Principi de màxim rendiment",
      "Principi de portes obertes",
      "Principi de confiança total"
    ],
    answer: [0],
    explainCa: "El mínim privilegi (least privilege) redueix la superfície d'atac: cada identitat té només els permisos imprescindibles, ni un més."
  },
  {
    id: "q-5-3",
    domain: 5,
    type: "multiple",
    promptCa: "Quins dos serveis fem servir per registrar i monitorar l'activitat d'una solució d'IA a AWS? (Selecciona 2)",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "Amazon Polly",
      "Amazon Lex",
      "Amazon Forecast"
    ],
    answer: [0, 1],
    explainCa: "CloudTrail registra les crides a l'API (auditoria), i CloudWatch monitora mètriques i logs. Junts donen observabilitat i auditoria de la teva solució d'IA."
  },
  {
    id: "q-5-4",
    domain: 5,
    type: "single",
    promptCa: "On es guarda l'historial d'activitat de l'API per auditar canvis en els recursos d'IA?",
    options: [
      "Amazon CloudTrail",
      "Amazon Polly",
      "Amazon Rekognition",
      "Amazon Kendra"
    ],
    answer: [0],
    explainCa: "CloudTrail registra qui ha fet què i quan (crides API). És la font per a auditoria i compliment de seguretat."
  },

  /* ================== AMPLIACIÓ — DOMINI 1 (total 13) ================== */
  {
    id: "q-1-6",
    domain: 1,
    type: "single",
    promptCa: "En quin cas el deep learning acostuma a ser una millor opció que el ML clàssic?",
    options: [
      "Quan tens grans volums de dades no estructurades (imatges, text, àudio)",
      "Quan tens una taula petita de dades numèriques",
      "Quan vols minimitzar el cost de càlcul",
      "Quan necessites explicar cada predicció amb regles simples"
    ],
    answer: [0],
    explainCa: "El deep learning excels amb grans quantitats de dades no estructurades. Amb taules petites o quan cal interpretabilitat i baix cost, el ML clàssic sol ser millor."
  },
  {
    id: "q-1-7",
    domain: 1,
    type: "single",
    promptCa: "Una empresa detecta anomalies (frau) en patrons de compres sense tenir exemples etiquetats. Quin paradigma és més adequat?",
    options: [
      "Aprenentatge no supervisat",
      "Aprenentatge supervisat (classificació)",
      "Aprenentatge per reforç",
      "Regressió lineal"
    ],
    answer: [0],
    explainCa: "La detecció d'anomalies sobre dades sense etiquetes correspon a l'aprenentatge no supervisat. Si tinguéssim exemples etiquetats de frau, faríem servir classificació supervisada."
  },
  {
    id: "q-1-8",
    domain: 1,
    type: "single",
    promptCa: "Què és una 'feature' en el context del ML?",
    options: [
      "Una característica o variable d'entrada usada pel model",
      "La resposta correcta que volem predir",
      "Un error del model",
      "Un tipus de servidor de GPU"
    ],
    answer: [0],
    explainCa: "Una feature és una variable d'entrada (edat, salari, píxels…). La resposta correcta és el 'label'. Els errors no són features."
  },
  {
    id: "q-1-9",
    domain: 1,
    type: "single",
    promptCa: "Quina divisió del dataset es fa servir per ajustar hiperparàmetres i detectar overfitting durant l'entrenament?",
    options: [
      "El validation set",
      "El test set",
      "El training set (exclusivament)",
      "Cap; només cal el training set"
    ],
    answer: [0],
    explainCa: "El validation set s'usa durant l'entrenament per ajustar hiperparàmetres i vigilar l'overfitting. El test set només s'usa al final, amb dades mai vistes."
  },
  {
    id: "q-1-10",
    domain: 1,
    type: "single",
    promptCa: "En un problema de frau on perdre's un frau és molt greu, quina mètrica prioritza trobar tots els casos positius?",
    options: [
      "Recall (sensibilitat)",
      "Accuracy",
      "Precision",
      "El temps de resposta"
    ],
    answer: [0],
    explainCa: "El recall mesura la proporció de positius reals que detectem; és clau quan 'deixar-se un positiu' és car (frau, malaltia). La precision, en canvi, prioritza no donar falses alarmes."
  },
  {
    id: "q-1-11",
    domain: 1,
    type: "multiple",
    promptCa: "Quines dues opcions ajuden a reduir l'overfitting? (Selecciona 2)",
    options: [
      "Regularització",
      "Early stopping",
      "Afegir més soroll a les dades sense parar",
      "Augmentar el learning rate sense límit",
      "Reduir el nombre de dades d'entrenament"
    ],
    answer: [0, 1],
    explainCa: "La regularització penalitza la complexitat i l'early stopping atura l'entrenament quan la validació deixa de millorar. Totes dues combaten l'overfitting."
  },
  {
    id: "q-1-12",
    domain: 1,
    type: "single",
    promptCa: "Què mesura la loss function (funció de pèrdua) durant l'entrenament?",
    options: [
      "Quant s'equivoca el model respecte de les respostes reals",
      "La velocitat de la GPU",
      "El nombre de paràmetres del model",
      "La mida del dataset"
    ],
    answer: [0],
    explainCa: "La loss function quantifica l'error del model; l'objectiu de l'entrenament (p. ex. via gradient descent) és minimitzar-la."
  },
  {
    id: "q-1-13",
    domain: 1,
    type: "single",
    promptCa: "Què és una 'epoch'?",
    options: [
      "Una passada completa del model per tot el dataset d'entrenament",
      "Una sola mostra del dataset",
      "Un tipus de mètrica d'avaluació",
      "El procés de desplegament del model"
    ],
    answer: [0],
    explainCa: "Una epoch és una passada completa pel conjunt d'entrenament. El model s'entrena durant múltiples epochs."
  },

  /* ================== AMPLIACIÓ — DOMINI 2 (total 16) ================== */
  {
    id: "q-2-6",
    domain: 2,
    type: "single",
    promptCa: "Quina tècnica de prompt consisteix a donar exemples a l'entrada abans de la tasca?",
    options: [
      "Few-shot prompting",
      "Zero-shot prompting",
      "Fine-tuning",
      "Pre-entrenament"
    ],
    answer: [0],
    explainCa: "Few-shot = incloure uns quants exemples al prompt. Zero-shot = només la instrucció, sense exemples. Fine-tuning i pre-entrenament no són tècniques de prompt."
  },
  {
    id: "q-2-7",
    domain: 2,
    type: "single",
    promptCa: "Quina diferència hi ha entre 'parameters' i 'context window'?",
    options: [
      "Els paràmetres indiquen la mida/capacitat del model; el context window és el límit de tokens",
      "Són sinònims",
      "El context window és el nombre de paràmetres",
      "Els paràmetres són el límit de tokens"
    ],
    answer: [0],
    explainCa: "Paràmetres = valors apresos que determinen la mida del model. Context window = màxim de tokens que pot processar alhora. Dos conceptes diferents."
  },
  {
    id: "q-2-8",
    domain: 2,
    type: "single",
    promptCa: "Què fa el mecanisme d'atenció (attention) en un transformer?",
    options: [
      "Ponderar la importància de cada paraula respecte de les altres",
      "Comprimir el model perquè ocupi menys",
      "Encriptar les dades d'entrenament",
      "Triar el learning rate"
    ],
    answer: [0],
    explainCa: "L'atenció permet al model decidir quines paraules són rellevants per generar la següent, independentment de la distància a la frase."
  },
  {
    id: "q-2-9",
    domain: 2,
    type: "single",
    promptCa: "Per què RAG redueix les al·lucinacions?",
    options: [
      "Perquè fonamenta la resposta en informació recuperada de fonts reals",
      "Perquè elimina tots els paràmetres del model",
      "Perquè entrena el model amb més dades",
      "Perquè baixa la temperature a zero sempre"
    ],
    answer: [0],
    explainCa: "RAG injecta context real i actualitzat al prompt, de manera que el model genera a partir de fets en lloc de només de la seva memòria interna."
  },
  {
    id: "q-2-10",
    domain: 2,
    type: "single",
    promptCa: "Un model generatiu de text produeix respostes molt variades però amb errors factboats freqüents. Quin canvi de paràmetre caldria fer?",
    options: [
      "Baixar la temperature",
      "Augmentar la temperature",
      "Augmentar top-k sense límit",
      "Eliminar el context window"
    ],
    answer: [0],
    explainCa: "Una temperature alta augmenta l'aleatorietat (més varietat però més errors). Baixar la temperature fa respostes més deterministes i consistents."
  },
  {
    id: "q-2-11",
    domain: 2,
    type: "multiple",
    promptCa: "Quines dues tècniques de prompt engineering existeixen? (Selecciona 2)",
    options: [
      "Few-shot prompting",
      "Chain-of-thought prompting",
      "Regularització L2",
      "Gradient descent",
      "Early stopping"
    ],
    answer: [0, 1],
    explainCa: "Few-shot (exemples) i chain-of-thought (raonar pas a pas) són tècniques de prompt. La resta són tècniques d'entrenament de ML."
  },
  {
    id: "q-2-12",
    domain: 2,
    type: "single",
    promptCa: "Quina opció ordena correctament les tècniques de menys a més esforç/cost?",
    options: [
      "Prompt engineering → RAG → fine-tuning → pre-entrenament",
      "Pre-entrenament → fine-tuning → RAG → prompt",
      "Fine-tuning → prompt → RAG → pre-entrenament",
      "RAG → pre-entrenament → prompt → fine-tuning"
    ],
    answer: [0],
    explainCa: "Primer s'intenta prompt engineering (gratis), després RAG, després fine-tuning i finalment, només en casos extrems, pre-entrenament (caríssim)."
  },
  {
    id: "q-2-13",
    domain: 2,
    type: "single",
    promptCa: "Què és un 'embedding'?",
    options: [
      "Una representació vectorial numèrica d'una paraula o text",
      "Un tipus de GPU",
      "Una unitat de cobrament pública d'AWS",
      "Un error de xarxa"
    ],
    answer: [0],
    explainCa: "Un embedding converteix text en un vector de nombres que captura el significat, habilitant la cerca semàntica i el RAG."
  },
  {
    id: "q-2-14",
    domain: 2,
    type: "single",
    promptCa: "Què és l'aprenentatge per transferència, base dels foundation models?",
    options: [
      "Aprofitar un model pre-entrenat amb dades massives per a moltes tasques",
      "Copiar físicament els servidors del model",
      "Entrenar cada model de zero per a cada tasca",
      "Transferir dades entre regions"
    ],
    answer: [0],
    explainCa: "Els FM s'entrenen una vegada amb dades enormes i després es 'transfereixen' i s'adapten a moltes tasques amb poc esforç."
  },
  {
    id: "q-2-15",
    domain: 2,
    type: "multiple",
    promptCa: "Quins dos factors influeixen directament en el cost d'usar un LLM? (Selecciona 2)",
    options: [
      "El nombre de tokens processats",
      "La mida del model (paràmetres)",
      "El color de la interfície",
      "El sistema operatiu del client",
      "L'hora del dia"
    ],
    answer: [0, 1],
    explainCa: "El cost depèn de quant tokens uses i de la mida del model (els més grans cobren més per token)."
  },
  {
    id: "q-2-16",
    domain: 2,
    type: "single",
    promptCa: "Quina és una característica clau dels foundation models?",
    options: [
      "Són multitasca: serveixen per a moltes tasques diferents",
      "Només serveixen per a una sola tasca",
      "Són gratuïts sempre",
      "No es poden adaptar ni afinar"
    ],
    answer: [0],
    explainCa: "El tret definitori d'un FM és ser generalista i adaptable (traduir, resumir, generar…) en lloc d'estar lligat a una sola tasca."
  },

  /* ================== AMPLIACIÓ — DOMINI 3 (total 18) ================== */
  {
    id: "q-3-6",
    domain: 3,
    type: "single",
    promptCa: "Què és SageMaker JumpStart?",
    options: [
      "Un catàleg de models i solucions preconstruïdes per arrencar ràpid",
      "Un servei de text-to-speech",
      "Un magatzem de dades per a Big Data",
      "Una eina de transcripció"
    ],
    answer: [0],
    explainCa: "SageMaker JumpStart ofereix models i solucions preconstruïdes (inclosos FMs) per desplegar i afinar amb poc codi."
  },
  {
    id: "q-3-7",
    domain: 3,
    type: "single",
    promptCa: "Quina eina de SageMaker permet crear models de ML sense escriure codi?",
    options: [
      "SageMaker Canvas",
      "SageMaker Studio",
      "SageMaker Clarify",
      "SageMaker Endpoints"
    ],
    answer: [0],
    explainCa: "SageMaker Canvas és l'eina no-code (visual). Studio és l'IDE complet; Clarify detecta biaix; Endpoints serveixen inferència."
  },
  {
    id: "q-3-8",
    domain: 3,
    type: "single",
    promptCa: "Un client vol extreure el sentiment d'una base de ressenyes de clients. Quin servei és més adequat?",
    options: [
      "Amazon Comprehend",
      "Amazon Rekognition",
      "Amazon Polly",
      "Amazon Kendra"
    ],
    answer: [0],
    explainCa: "Comprehend fa NLP (sentiment, entitats, idioma, temes) sobre text. Rekognition és visió; Polly és veu; Kendra és cerca."
  },
  {
    id: "q-3-9",
    domain: 3,
    type: "single",
    promptCa: "Quin servei extreu text i taules de documents escanejats (p. ex., factures)?",
    options: [
      "Amazon Textract",
      "Amazon Forecast",
      "Amazon Lex",
      "Amazon Polly"
    ],
    answer: [0],
    explainCa: "Textract extreu text, formularis i taules de documents. Forecast prediu sèries temporals; Lex fa bots; Polly fa veu."
  },
  {
    id: "q-3-10",
    domain: 3,
    type: "single",
    promptCa: "Quin servei s'usa per predir la demanda futura (sèries temporals) d'un producte?",
    options: [
      "Amazon Forecast",
      "Amazon Transcribe",
      "Amazon Rekognition",
      "Amazon Q"
    ],
    answer: [0],
    explainCa: "Forecast és per a prediccions de sèries temporals (demanda, vendes). Els altres tenen finalitats diferents."
  },
  {
    id: "q-3-11",
    domain: 3,
    type: "single",
    promptCa: "Quina és la principal diferència entre Bedrock i SageMaker?",
    options: [
      "Bedrock accedeix a FMs ja fets; SageMaker construeix i entrena models propis",
      "Són el mateix servei amb noms diferents",
      "SageMaker només serveix per a servidors web",
      "Bedrock només fa text-to-speech"
    ],
    answer: [0],
    explainCa: "Bedrock = usar FMs de tercers amb API unificada. SageMaker = control total per construir, entrenar i desplegar els teus models."
  },
  {
    id: "q-3-12",
    domain: 3,
    type: "single",
    promptCa: "Què fan els Bedrock Agents?",
    options: [
      "Executen accions (cridar APIs, consultar dades) a més de conversar",
      "Netejar les dades d'entrenament",
      "Encriptar el trànsit",
      "Crear usuaris IAM"
    ],
    answer: [0],
    explainCa: "Els Agents de Bedrock orquestren eines i executen tasques, no només responen text."
  },
  {
    id: "q-3-13",
    domain: 3,
    type: "multiple",
    promptCa: "Quins dos serveis són exemples de serveis d'IA 'ready-made' d'AWS (sense entrenar res)? (Selecciona 2)",
    options: [
      "Amazon Rekognition",
      "Amazon Polly",
      "Amazon EC2",
      "Amazon S3",
      "Amazon VPC"
    ],
    answer: [0, 1],
    explainCa: "Rekognition i Polly són serveis d'IA gestionats (API directa). EC2, S3 i VPC són serveis d'infraestructura general."
  },
  {
    id: "q-3-14",
    domain: 3,
    type: "single",
    promptCa: "Una empresa vol un assistent que respongui preguntes dels empleats sobre la seva Intranet usant els seus documents. Quina combinació és la més adequada?",
    options: [
      "Amazon Q Business connectat a les fonts de dades de l'empresa",
      "Amazon Polly amb una base de dades",
      "Amazon Rekognition sobre la Intranet",
      "Amazon Forecast sobre documents"
    ],
    answer: [0],
    explainCa: "Q Business és l'assistent orientat a empreses que respon a partir de les dades internes. Polly i Rekognition no responen preguntes documentals."
  },
  {
    id: "q-3-15",
    domain: 3,
    type: "single",
    promptCa: "Què fa Amazon Kendra?",
    options: [
      "Cerca empresarial intel·ligent sobre el teu contingut",
      "Conversió de text a veu",
      "Detecció d'objectes en imatges",
      "Entrenament de xarxes neuronals"
    ],
    answer: [0],
    explainCa: "Kendra és un motor de cerca empresarial que entén el llenguatge natural per trobar respostes dins dels teus documents."
  },
  {
    id: "q-3-16",
    domain: 3,
    type: "single",
    promptCa: "Quin és l'ordre correcte a l'hora de triar model per a una solució de Bedrock?",
    options: [
      "Avaluar cost, latència, precisió, context i llicència per al cas d'ús",
      "Triar sempre el model més gran possible",
      "Triar sempre el més barat",
      "Triar el primer de la llista"
    ],
    answer: [0],
    explainCa: "La selecció equilibra cost, latència, precisió, mida del context i llicència segons el cas. No hi ha 'un model per a tot'."
  },
  {
    id: "q-3-17",
    domain: 3,
    type: "multiple",
    promptCa: "Quines dues capacitats ofereix Amazon Bedrock? (Selecciona 2)",
    options: [
      "Accés a foundation models de tercers",
      "Construcció de Knowledge Bases (RAG)",
      "Servei de xarxa CDN",
      "Servei de DNS",
      "Servei de còpies de seguretat de màquines virtuals"
    ],
    answer: [0, 1],
    explainCa: "Bedrock ofereix accés a FMs i la construcció de Knowledge Bases, entre altres capacitats. Les altres són serveis d'infraestructura."
  },
  {
    id: "q-3-18",
    domain: 3,
    type: "single",
    promptCa: "Quina eina de Bedrock s'usa per avaluar i comparar models abans de posar-los en producció?",
    options: [
      "Bedrock Evaluations (model evaluation)",
      "Bedrock Playground",
      "Amazon Polly",
      "Amazon Translate"
    ],
    answer: [0],
    explainCa: "Bedrock ofereix avaluació de models (automàtica o humana) per comparar-los amb les teves dades. El Playground és per provar-los manualment."
  },

  /* ================== AMPLIACIÓ — DOMINI 4 (total 9) ================== */
  {
    id: "q-4-4",
    domain: 4,
    type: "single",
    promptCa: "Quina és la diferència entre transparència i explicabilitat?",
    options: [
      "La transparència és comunicar que s'usa IA; l'explicabilitat és explicar una predicció concreta",
      "Són exactament el mateix",
      "L'explicabilitat és no usar IA",
      "La transparència és una mètrica de rendiment"
    ],
    answer: [0],
    explainCa: "Transparència = ser obert sobre l'ús de la IA. Explicabilitat = entendre el 'per què' d'una predicció concreta. Dimensió diferent."
  },
  {
    id: "q-4-5",
    domain: 4,
    type: "single",
    promptCa: "En quins casos és més crític mantenir supervisió humana (human-in-the-loop)?",
    options: [
      "En decisions d'alt impacte sobre persones (salut, finances, ocupació)",
      "En generar una imatge decorativa",
      "Mai; la IA ho pot fer tot sola",
      "Només en entorns de jocs"
    ],
    answer: [0],
    explainCa: "La supervisió humana és crucial quan les decisions tenen impacte significatiu o quan el model té confiança baixa."
  },
  {
    id: "q-4-6",
    domain: 4,
    type: "single",
    promptCa: "Què fa la funció de 'PII redaction' d'un Guardrail de Bedrock?",
    options: [
      "Amaga o elimina dades d'identificació personal de les respostes",
      "Accelera la resposta del model",
      "Baixa el cost per token",
      "Tradueix el text a un altre idioma"
    ],
    answer: [0],
    explainCa: "La redacció de PII emmascara noms, correus, telèfons, etc., protegint la privacitat sense bloquejar la resposta."
  },
  {
    id: "q-4-7",
    domain: 4,
    type: "multiple",
    promptCa: "Quins dos elements forma part de Bedrock Guardrails? (Selecciona 2)",
    options: [
      "Filtres de toxicitat",
      "Temes denegats (denied topics)",
      "Escalat automàtic de servidors",
      "Còpia de seguretat de bases de dades",
      "DNS"
    ],
    answer: [0, 1],
    explainCa: "Guardrails inclou filtres de toxicitat i temes denegats, a més de PII redaction i filtres de paraules."
  },
  {
    id: "q-4-8",
    domain: 4,
    type: "single",
    promptCa: "Quina tècnica NO ajuda a mitigar la desinformació generada per IA?",
    options: [
      "Deixar que el model respongui sense cap límit ni font",
      "Usar RAG per fonamentar-se en fonts reals",
      "Aplicar guardrails",
      "Ser transparent sobre l'ús d'IA"
    ],
    answer: [0],
    explainCa: "Aplicar RAG, guardrails i transparència redueixen el risc de desinformació. Deixar el model sense límits l'augmenta."
  },
  {
    id: "q-4-9",
    domain: 4,
    type: "single",
    promptCa: "Per què un model de ML pot esdevenir esbiaixat?",
    options: [
      "Perquè les dades d'entrenament contenien biaixos",
      "Perquè la GPU era massa ràpida",
      "Perquè es va desplegar en una regió incorrecta",
      "Perquè tenia massa pocs paràmetres"
    ],
    answer: [0],
    explainCa: "El biaix típicament es propaga des de les dades d'entrenament (mostres no representatives o etiquetes esbiaixades) cap al model."
  },

  /* ================== AMPLIACIÓ — DOMINI 5 (total 9) ================== */
  {
    id: "q-5-5",
    domain: 5,
    type: "single",
    promptCa: "Quin servei s'usa per gestionar les claus de xifrat de les teves dades a AWS?",
    options: [
      "AWS KMS (Key Management Service)",
      "Amazon Polly",
      "Amazon Rekognition",
      "Amazon Lex"
    ],
    answer: [0],
    explainCa: "KMS crea, gestiona i controla les claus de xifrat. S'integra amb serveis com S3, EBS i Bedrock per xifrar en repòs."
  },
  {
    id: "q-5-6",
    domain: 5,
    type: "single",
    promptCa: "Com connectes a Bedrock de manera privada sense passar per Internet públic?",
    options: [
      "Amb VPC Endpoints / AWS PrivateLink",
      "Amb una IP pública directa",
      "Amb Amazon Route 53",
      "No és possible"
    ],
    answer: [0],
    explainCa: "Els VPC Endpoints (PrivateLink) permeten accedir a Bedrock des de la teva VPC sense trànsit per Internet."
  },
  {
    id: "q-5-7",
    domain: 5,
    type: "single",
    promptCa: "Quina és una bona pràctica d'IAM per a aplicacions que fan inferència a Bedrock?",
    options: [
      "Fer servir rols IAM amb mínim privilegi en lloc de claus permanents",
      "Donar permisos d'administrador a tots",
      "Guardar les claus al codi font",
      "Compartir un únic usuari per a tot l'equip"
    ],
    answer: [0],
    explainCa: "Els rols amb mínim privilegi (i sense claus permanents) redueixen risc i segueixen les millors pràctiques de seguretat."
  },
  {
    id: "q-5-8",
    domain: 5,
    type: "multiple",
    promptCa: "Quins dos elements són responsabilitat del CLIENT (no d'AWS) dins el model compartit? (Selecciona 2)",
    options: [
      "Configurar les polítiques IAM",
      "Xifrar les seves dades amb KMS",
      "La seguretat física del datacenter",
      "El pegat del sistema operatiu dels hipervisors",
      "La infraestructura de xarxa física"
    ],
    answer: [0, 1],
    explainCa: "El client configura IAM i xifra les seves dades. La seguretat física i dels hipervisors és responsabilitat d'AWS."
  },
  {
    id: "q-5-9",
    domain: 5,
    type: "single",
    promptCa: "Una app de salut ha de complir la normativa dels EUA sobre dades mèdiques. Quina s'aplica?",
    options: [
      "HIPAA",
      "GDPR",
      "ISO 9001",
      "SOC 3 exclusivament"
    ],
    answer: [0],
    explainCa: "HIPAA regula la privacitat de les dades de salut als EUA. El GDPR és europeu; ISO 9001 és qualitat; SOC és de controls."
  },
  {
    id: "q-5-10",
    domain: 5,
    type: "single",
    promptCa: "Què garanteixes triant la regió correcta per al teu servei d'IA?",
    options: [
      "Que les dades es processen i s'emmagatzemen dins d'aquella regió (residència de dades)",
      "Que el model és gratuït",
      "Que no cal encara aplicar IAM",
      "Que les dades s'eliminen automàticament"
    ],
    answer: [0],
    explainCa: "Triar la regió satisfà requisits de residència de dades. No afecta el preu ni elimina la necessitat de seguretat."
  },
  {
    id: "q-5-11",
    domain: 5,
    type: "single",
    promptCa: "Què fan els 'resource policies' en el context de Bedrock?",
    options: [
      "Controlar l'accés a nivell d'un recurs concret (p. ex., un model)",
      "Optimitzar el cost",
      "Augmentar la latència",
      "Generar embeddings"
    ],
    answer: [0],
    explainCa: "Les resource policies defineixen qui pot accedir a un recurs específic de Bedrock, complementant les polítiques d'IAM."
  },
  {
    id: "q-5-12",
    domain: 5,
    type: "single",
    promptCa: "Quin concepte s'encarrega de la traçabilitat i versionat de models i dades?",
    options: [
      "La governança (model registry, data lineage)",
      "La latència d'inferència",
      "La temperature del model",
      "El nombre de tokens"
    ],
    answer: [0],
    explainCa: "La governança cobreix versionat (model registry), traçabilitat (lineage) i documentació (model cards) de models i dades."
  },
  {
    id: "q-5-13",
    domain: 5,
    type: "multiple",
    promptCa: "Quins dos serveis es combinen per auditar i monitorar una solució d'IA? (Selecciona 2)",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "Amazon Translate",
      "Amazon Polly",
      "Amazon Rekognition"
    ],
    answer: [0, 1],
    explainCa: "CloudTrail (auditoria d'API) + CloudWatch (mètriques i logs) donen l'observabilitat i el compliment necessaris."
  }
];

/* Index d'accés ràpid per domini */
AFP.quizByDomain = (function () {
  var map = {1: [], 2: [], 3: [], 4: [], 5: []};
  AFP.quizBank.forEach(function (q) { map[q.domain].push(q); });
  return map;
})();
