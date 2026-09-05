window.AFP = window.AFP || {};

/* ==========================================================================
   Targetes d'estudi (flashcards) — dades
   Format: { id, front (pregunta/terme EN), back (resposta/definició CA), domain }
   ========================================================================== */
AFP.flashcardData = [
  { id: "fc1", domain: 1, front: "Què és el Machine Learning?", back: "Subconjunt d'IA on els sistemes aprenen patrons a partir de dades, sense regles explícites." },
  { id: "fc2", domain: 1, front: "Supervised vs Unsupervised", back: "Supervisat = dades etiquetades. No supervisat = dades sense etiquetes." },
  { id: "fc3", domain: 1, front: "Overfitting", back: "El model memoritza les dades d'entrenament i generalitza malament a dades noves." },
  { id: "fc4", domain: 1, front: "Precision vs Recall", back: "Precision = dels positius trobats, quants correctes. Recall = dels positius reals, quants hem trobat." },
  { id: "fc5", domain: 1, front: "F1-score", back: "Mitjana harmònica de precision i recall. Ideal amb classes desequilibrades." },
  { id: "fc6", domain: 1, front: "Inferència vs entrenament", back: "Entrenar = aprèn paràmetres (car, poc freqüent). Inferència = fer prediccions (continu, a escala)." },
  { id: "fc7", domain: 2, front: "Foundation Model (FM)", back: "Model gran pre-entrenat amb dades massives, adaptable a moltes tasques." },
  { id: "fc8", domain: 2, front: "LLM", back: "Large Language Model: un FM especialitzat en llenguatge natural." },
  { id: "fc9", domain: 2, front: "Token", back: "Unitat mínima de text que processa el model; es cobra per token." },
  { id: "fc10", domain: 2, front: "Context window", back: "Màxim de tokens que el model pot considerar alhora (entrada + sortida)." },
  { id: "fc11", domain: 2, front: "Temperature", back: "Paràmetre que controla l'aleatorietat: baixa = determinista, alta = creativa." },
  { id: "fc12", domain: 2, front: "RAG", back: "Retrieval-Augmented Generation: recuperar info externa i injectar-la al prompt, sense reentrenar." },
  { id: "fc13", domain: 2, front: "Fine-tuning", back: "Reentrenar un FM pre-existent amb dades pròpies per especialitzar-lo." },
  { id: "fc14", domain: 2, front: "Al·lucinació", back: "Contingut generat que sona plausible però és fals o inventat." },
  { id: "fc15", domain: 3, front: "Amazon Bedrock", back: "Servei gestionat per accedir a FMs de tercers (Claude, Titan, Llama…) amb una API unificada." },
  { id: "fc16", domain: 3, front: "Bedrock Knowledge Bases", back: "RAG gestionat: connecta els teus documents i fa que el model hi respongui." },
  { id: "fc17", domain: 3, front: "Amazon Q (Business vs Developer)", back: "Q Business = negoci/empresa. Q Developer = codi per a programadors." },
  { id: "fc18", domain: 3, front: "SageMaker (vs Bedrock)", back: "Construir/entrenar els TEUS models (vs Bedrock = usar FMs ja fets)." },
  { id: "fc19", domain: 3, front: "Amazon Rekognition", back: "Anàlisi d'imatges i vídeo: objectes, cares, text, moderació." },
  { id: "fc20", domain: 3, front: "Amazon Comprehend", back: "NLP: entitats, sentiment, idioma, temes." },
  { id: "fc21", domain: 3, front: "Transcribe vs Polly", back: "Transcribe = parla→text. Polly = text→parla." },
  { id: "fc22", domain: 3, front: "Amazon Lex", back: "Servei per construir chatbots i interfícies de veu." },
  { id: "fc23", domain: 4, front: "Dimensions de Responsible AI", back: "Fairness, explicabilitat, transparència, privacitat, robustesa, governança." },
  { id: "fc24", domain: 4, front: "Biaix (bias) i eina d'AWS", back: "Error sistemàtic injust. Es detecta amb SageMaker Clarify." },
  { id: "fc25", domain: 4, front: "Bedrock Guardrails", back: "Controls de contingut: temes denegats, toxicitat, PII redaction, filtres de paraules." },
  { id: "fc26", domain: 4, front: "Interpretabilitat vs Explicabilitat", back: "Interpretabilitat = com funciona per dins. Explicabilitat = explicar una predicció concreta." },
  { id: "fc27", domain: 4, front: "Human-in-the-loop", back: "Una persona revisa o aprova les decisions del model en casos d'alt impacte." },
  { id: "fc28", domain: 5, front: "Responsabilitat compartida", back: "AWS 'of the cloud' (infra), client 'in the cloud' (IAM, dades, configuracions)." },
  { id: "fc29", domain: 5, front: "Least privilege", back: "Concedir només els permisos mínims necessaris per fer la feina." },
  { id: "fc30", domain: 5, front: "CloudTrail vs CloudWatch", back: "CloudTrail = auditoria d'API (qui va fer què). CloudWatch = monitoratge (mètriques/logs)." },
  { id: "fc31", domain: 5, front: "Xifrat en trànsit i en repòs", back: "En trànsit = TLS/HTTPS. En repòs = KMS (claus gestionades)." },
  { id: "fc32", domain: 5, front: "Data residency", back: "Exigència que les dades processades quedin dins d'una regió/pais concret." }
];
