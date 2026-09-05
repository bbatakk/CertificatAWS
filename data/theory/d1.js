window.AFP = window.AFP || {};

/* Domini 1: Fundamentals of AI and ML — teoria en català, termes en anglès */
AFP.theoryD1 = [
  {
    id: "1.1",
    titleCa: "Definicions: AI, ML, DL i GenAI",
    intro: "El primer que demana l'examen és que sàpigues situar els conceptes en el seu lloc. Artificial Intelligence (IA) és el paraigua més gran, i a dins hi va el Machine Learning, el Deep Learning i la IA generativa.",
    blocks: [
      { t: "h", c: "Les capes de la IA" },
      { t: "def", en: "Artificial Intelligence (AI)", ca: "El camp ampli que busca construir sistemes que imitin capacitats humanes: raonar, aprendre, percebre, decidir." },
      { t: "def", en: "Machine Learning (ML)", ca: "Subconjunt d'AI on els sistemes <b>aprenen patrons a partir de dades</b> sense ser programats amb regles explícites." },
      { t: "def", en: "Deep Learning (DL)", ca: "Subconjunt de ML basat en <b>xarxes neuronals</b> amb moltes capes (profundes). Excel·leix amb dades no estructurades: imatges, text, àudio." },
      { t: "def", en: "Generative AI (GenAI)", ca: "Un subconjunt de DL capaç de <b>crear contingut nou</b> (text, imatges, àudio, codi) a partir d'una instrucció o <b>prompt</b>." },
      { t: "callout", kind: "tip", title: "Regla mnemotècnica", c: "AI ⊃ ML ⊃ DL ⊃ GenAI. Cada anell és un subconjunt de l'anterior." },
      { t: "h", c: "Per què hi ha molts 'tipus' d'IA?" },
      { t: "p", c: "Tradicionalment es parlava de l'IA clàssica (regles, sistemes experts) versus l'enfocament estadístic del ML. Avui, quan diem 'IA' al món AWS, gairebé sempre ens referim a ML i, molt sovint, a <b>Deep Learning</b> aplicat." }
    ]
  },
  {
    id: "1.2",
    titleCa: "Paradigmes de ML",
    intro: "Hi ha tres grans paradigmes d'aprenentatge, i saber distingir-los segons si les dades tenen o no etiquetes (label) és una pregunta típica d'examen.",
    blocks: [
      { t: "h", c: "Aprenentatge supervisat (supervised learning)" },
      { t: "p", c: "El model aprèn a partir de <b>dades etiquetades</b>: cada exemple ve amb la resposta correcta (label). Objectiu: predir la etiqueta per a exemples nous." },
      { t: "list", items: [
        "<b>Classificació</b> (classification): predir una categoria discreta. Ex.: 'aquesta transacció és frau SÍ/NO', 'spam o no spam'.",
        "<b>Regressió</b> (regression): predir un valor continu. Ex.: preu d'una casa, demanda de vendes demà."
      ] },
      { t: "h", c: "Aprenentatge no supervisat (unsupervised learning)" },
      { t: "p", c: "Treballa amb <b>dades sense etiquetes</b>. El model troba <b>estructura</b> per si mateix." },
      { t: "list", items: [
        "<b>Clustering</b> (agrupament): agrupar clients semblants en segments.",
        "<b>Reducció de dimensionalitat</b>: simplificar característiques mantenint la informació.",
        "<b>Detecció d'anomalies</b>: trobar patrones rars o fraudulentos."
      ] },
      { t: "h", c: "Aprenentatge per reforç (reinforcement learning)" },
      { t: "p", c: "Un agent aprèn <b>actuant</b> en un entorn i rebent <b>premis o càstigs</b> (reward). S'usa en robòtica, jocs i optimització." },
      { t: "callout", kind: "warn", title: "Trampa d'examen", c: "No confonguis supervisat amb no supervisat: la pista és si les dades porten etiqueta. 'Tenim dades històriques amb la resposta correcta' → supervisat." }
    ]
  },
  {
    id: "1.3",
    titleCa: "Cicle de vida d'un model ML",
    intro: "Construir un model de ML no és només 'entrenar'. És un procés iteratiu amb diverses fases. L'examen pot preguntar-te l'ordre lògic.",
    blocks: [
      { t: "list", items: [
        "<b>1. Definició del problema</b> — què volem predir i com ho mesurarem.",
        "<b>2. Recollida i preparació de dades</b> — netejar, transformar, dividir en datasets.",
        "<b>3. Feature engineering</b> — triar i crear les característiques (<b>features</b>) que alimenten el model.",
        "<b>4. Entrenament</b> — el model aprèn els paràmetres a partir de les dades.",
        "<b>5. Avaluació</b> — mesurar el rendiment amb dades que el model no ha vist.",
        "<b>6. Desplegament</b> — posar el model en producció i monitorar-lo."
      ] },
      { t: "callout", kind: "exam", title: "Concepte clau", c: "La <b>inferència</b> és usar el model ja entrenat per fer prediccions reals; l'<b>entrenament</b> és la fase d'aprenentatge. Dos conceptes que l'examen distingeix sovint." }
    ]
  },
  {
    id: "1.4",
    titleCa: "Dades i datasets",
    intro: "La qualitat de les dades determina la qualitat del model. Cal entendre com es divideixen i quins termes s'usen.",
    blocks: [
      { t: "h", c: "Divisió del dataset" },
      { t: "table", head: ["Conjunt", "Funció"], rows: [
        ["<b>Training set</b>", "Dades amb què el model aprèn els paràmetres (la major part, ~70-80%)."],
        ["<b>Validation set</b>", "Per ajustar hiperparàmetres i detectar overfitting durant l'entrenament."],
        ["<b>Test set</b>", "Dades que el model NO ha vist MAI; s'usen al final per mesurar el rendiment real."]
      ] },
      { t: "h", c: "Termes clau" },
      { t: "list", items: [
        "<b>Feature</b> — una característica o variable d'entrada (ex.: edat, salari).",
        "<b>Label</b> — el valor objectiu o resposta correcta (ex.: 'frau' o 'no frau').",
        "<b>Sample</b> (mostra) — una fila o exemple concret del dataset.",
        "<b>Dades estructurades</b> — taules amb files i columnes (CSV, bases de dades).",
        "<b>Dades no estructurades</b> — text lliure, imatges, àudio, vídeo."
      ] },
      { t: "callout", kind: "tip", title: "Recorda", c: "Els serveis de DL d'AWS (Rekognition, Comprehend, Transcribe…) són ideals per a dades <b>no estructurades</b>." }
    ]
  },
  {
    id: "1.5",
    titleCa: "Entrenament de models",
    intro: "Durant l'entrenament el model ajusta els seus paràmetres per minimitzar l'error. Aquests són els conceptes que l'examen acostuma a tocar.",
    blocks: [
      { t: "list", items: [
        "<b>Epoch</b> — una passada completa del model per tot el dataset d'entrenament.",
        "<b>Batch</b> — el subconjunt de dades processat abans d'actualitzar els paràmetres.",
        "<b>Loss function</b> (funció de pèrdua) — mesura quant s'equivoca el model.",
        "<b>Gradient descent</b> — l'algorisme que redueix la pèrdua ajustant els paràmetres.",
        "<b>Learning rate</b> — com de grans són els passos d'ajust (massa alt = oscil·la, massa baix = lent)."
      ] },
      { t: "h", c: "Overfitting i underfitting" },
      { t: "def", en: "Overfitting", ca: "El model <b>memoritza</b> les dades d'entrenament (fins i tot el soroll) i generalitza malament a dades noves." },
      { t: "def", en: "Underfitting", ca: "El model és <b>massa senzill</b> i no capta ni els patrons bàsics: rendiment dolent tant en entrenament com en test." },
      { t: "list", items: [
        "<b>Regularització</b> (regularization) — tècnica per penalitzar la complexitat i evitar overfitting.",
        "<b>Early stopping</b> — aturar l'entrenament quan el rendiment en validació deixa de millorar."
      ] },
      { t: "callout", kind: "exam", title: "Com ho detectem?", c: "Overfitting = molt bé en train, malament en test. Underfitting = malament en tots dos. Aquest contrast és una pregunta recurrent." }
    ]
  },
  {
    id: "1.6",
    titleCa: "Mètriques d'avaluació",
    intro: "Mesurar un model requereix les mètriques adequades. Aquest bloc és un dels més rendibles per a l'examen.",
    blocks: [
      { t: "h", c: "La matriu de confusió" },
      { t: "p", c: "Per a prediccions binàries classifiquem els resultats en quatre quadrants:" },
      { t: "table", head: ["", "Prediu POSITIU", "Prediu NEGATIU"], rows: [
        ["Real POSITIU", "<b>True Positive (TP)</b> — encert", "False Negative (FN) — error (no es detecta)"],
        ["Real NEGATIU", "False Positive (FP) — falsa alarma", "<b>True Negative (TN)</b> — encert"]
      ] },
      { t: "h", c: "Mètriques derivades" },
      { t: "list", items: [
        "<b>Accuracy</b> — (TP+TN) / total. Proporció d'encerts. Enganyosa amb classes desequilibrades.",
        "<b>Precision</b> — TP / (TP+FP). De les prediccions positives, quantes són correctes.",
        "<b>Recall</b> (sensibilitat) — TP / (TP+FN). Dels positius reals, quants hem trobat.",
        "<b>F1-score</b> — mitjana harmònica de precision i recall. L'equilibri entre totes dues.",
        "<b>AUC-ROC</b> — àrea sota la corba ROC; mesura la capacitat de distingir classes a diferents llindars."
      ] },
      { t: "callout", kind: "tip", title: "Quina triar?", c: "Si et preocupa no deixar-te cap cas positiu (frau, malaltia) → prioritza <b>recall</b>. Si et preocupen les falses alarmes → <b>precision</b>. Equilibri → <b>F1</b>." }
    ]
  },
  {
    id: "1.7",
    titleCa: "Xarxes neuronals i deep learning",
    intro: "Els models de deep learning, basats en xarxes neuronals, són la base de la IA actual (incloent-hi la generativa).",
    blocks: [
      { t: "p", c: "Una <b>xarxa neuronal</b> (neural network) està formada per <b>neurones</b> organitzades en <b>capes</b>: una capa d'entrada, una o més capes intermèdies (<b>hidden layers</b>) i una capa de sortida. Quan hi ha moltes capes diem que la xarxa és <b>profunda</b> (deep)." },
      { t: "list", items: [
        "<b>CNN</b> (Convolutional Neural Networks) — especialitzades en imatges i visió per computador.",
        "<b>RNN / LSTM</b> — per a seqüències (text, series temporals), on l'ordre importa.",
        "<b>Transformers</b> — l'arquitectura moderna darrere dels LLM i la IA generativa (es veu al Domini 2)."
      ] },
      { t: "p", c: "El deep learning domina sobre els mètodes clàssics quan hi ha <b>moltes dades no estructurades</b>; però requereix molt més poder de càlcul i més dades." },
      { t: "callout", kind: "tip", title: "Recorda", c: "DL és ideal amb dades no estructurades. Amb dades tabulars petites, sovint un model clàssic de ML és més barat i suficient." }
    ]
  },
  {
    id: "1.8",
    titleCa: "Inferència vs entrenament",
    intro: "La distinció entrenament vs inferència és transversal a tot l'examen i als costos d'AWS.",
    blocks: [
      { t: "table", head: ["Aspecte", "Entrenament (training)", "Inferència (inference)"], rows: [
        ["Què fa", "Aprèn els paràmetres del model", "Usa el model per fer prediccions"],
        ["Freqüència", "Poques vegades (una o vàries)", "Contínua (cada predicció)"],
        ["Càlcul", "Intensiu (GPU/instàncies potents)", "Menys intensiu, però a escala"],
        ["Cost AWS", "Pagament per temps de càlcul", "Pagament per inferència o per infraestructura"]
      ] },
      { t: "p", c: "Per això AWS ofereix opcions de desplegament diferents: inferència <b>en temps real</b> (endpoint sempre actiu) o <b>batch</b> (per lots, més econòmica per a prediccions periòdiques)." },
      { t: "callout", kind: "exam", title: "Idea clau", c: "Entrenar és car i poc freqüent; fer inferència és barat individualment però car a molta escala. Moltes preguntes d'optimització de cost giren al voltant d'això." }
    ]
  }
];
