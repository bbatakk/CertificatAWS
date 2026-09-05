window.AFP = window.AFP || {};

/* ==========================================================================
   Resums condensats per domini (xules de repàs)
   ========================================================================== */
AFP.summaryData = [
  {
    domain: 1,
    titleCa: "Fonaments d'IA i ML",
    intro: "El repàs ràpid abans de l'examen: tot el Domini 1 en un minut.",
    keyPoints: [
      "AI ⊃ ML ⊃ DL ⊃ GenAI (conteniment de conjunts).",
      "ML supervisat usa dades etiquetades; no supervisat, sense etiquetes; per reforç, premi/càstig.",
      "Dataset es divideix en: training, validation i test (el test MAI es toca durant l'entrenament).",
      "Overfitting = memoritza (bé en train, malament en test); underfitting = massa simple (malament sempre).",
      "Mètriques: accuracy, precision, recall, F1, AUC-ROC. Amb classes desequilibrades, F1 > accuracy.",
      "Entrenament = aprèn paràmetres (car, puntual). Inferència = fa prediccions (continu, a escala)."
    ],
    mustRemember: [
      { en: "Supervised vs Unsupervised", ca: "La pista és l'etiqueta (label)." },
      { en: "Precision vs Recall", ca: "Precision = qualitat dels positius trobats; Recall = quantitat de positius reals trobats." },
      { en: "Training vs Inference", ca: "Entrenar car i poc; inferir barat i molt." }
    ]
  },
  {
    domain: 2,
    titleCa: "Fonaments de la IA generativa",
    intro: "El nucli GenAI: què és, com funciona i com es customitza.",
    keyPoints: [
      "GenAI crea contingut NOU (text, imatges, àudio, codi), no només classifica.",
      "Foundation Model (FM) = model gran pre-entrenat i adaptable a moltes tasques. LLM = FM de llenguatge.",
      "Els LLM es basen en transformers i el mecanisme d'atenció.",
      "Token = unitat de text; paràmetres = mida/capacitat; context window = límit de tokens en compte.",
      "Prompt engineering: zero-shot, few-shot, chain-of-thought (sense tocar el model).",
      "Paràmetres d'inferència: temperature (aleatorietat), top-p, top-k, max tokens.",
      "Ordre de customització: prompt engineering → RAG → fine-tuning (→ pre-entrenament).",
      "Al·lucinació = resposta plausible però falsa; es mitiga amb RAG i guardrails."
    ],
    mustRemember: [
      { en: "Context window vs Parameters", ca: "Una és el límit de tokens, l'altra la mida del model. No confondre-les." },
      { en: "RAG vs Fine-tuning", ca: "RAG uneix coneixement extern sense reentrenar; fine-tuning reentrena amb dades pròpies." },
      { en: "Temperature", ca: "Baixa = determinista; alta = creatiu i més propens a al·lucinar." }
    ]
  },
  {
    domain: 3,
    titleCa: "Aplicacions dels foundation models",
    intro: "El servei correcte per a cada necessitat — el més pesat de l'examen (28%).",
    keyPoints: [
      "Amazon Bedrock = FMs de tercers amb una API unificada i gestionada (Titan, Claude, Llama, Mistral…).",
      "Bedrock Knowledge Bases = RAG gestionat amb els teus documents + embeddings.",
      "Bedrock Agents = agents que executen accions; Guardrails = límits de contingut.",
      "Amazon Q Business (negoci) i Q Developer (codi).",
      "SageMaker = construir/entrenar/desplegar els teus models; JumpStart (models preconstruïts), Canvas (no-code), Clarify (biaix).",
      "Serveis d'IA d'AWS: Rekognition (visió), Comprehend (NLP), Transcribe (parla→text), Polly (text→parla), Translate, Textract (documents), Lex (chatbots), Kendra (cerca)."
    ],
    mustRemember: [
      { en: "Bedrock vs SageMaker", ca: "Usar FMs ja fets vs construir els teus propis models." },
      { en: "Amb què analitzo imatges?", ca: "Amazon Rekognition." },
      { en: "Amb què transcrit àudio?", ca: "Amazon Transcribe." }
    ]
  },
  {
    domain: 4,
    titleCa: "Directrius per a una IA responsable",
    intro: "Principis i eines per un ús segur i just de la IA.",
    keyPoints: [
      "Dimensions: fairness, explicabilitat, transparència, privacitat, robustesa i governança.",
      "Biaix prové sovint de les dades; es detecta amb SageMaker Clarify.",
      "Toxicitat = contingut ofensiu; es modera amb guardrails, Rekognition, Comprehend.",
      "Interpretabilitat (com funciona) ≠ explicabilitat (explicar una resposta) ≠ transparència (ser obert).",
      "Supervisió humana (human-in-the-loop) en decisions d'alt impacte.",
      "Privacitat: minimitzar dades, redactar PII, complir GDPR.",
      "Desinformació i deepfakes: mitigar amb RAG, guardrails i transparència.",
      "Bedrock Guardrails: temes denegats, toxicitat, PII redaction i filtres de paraules."
    ],
    mustRemember: [
      { en: "Guardrails", ca: "Els 'rails' que mantenen el model dins del que és segur i permès." },
      { en: "SageMaker Clarify", ca: "Eina per detectar biaix i explicar prediccions." },
      { en: "Fairness", ca: "Evitar desavantatges injustos per a un grup." }
    ]
  },
  {
    domain: 5,
    titleCa: "Seguretat, compliment i governança",
    intro: "Protegir i governar les solucions d'IA a AWS.",
    keyPoints: [
      "Responsabilitat compartida: AWS assegura el núvol; tu assegures el que hi poses dins.",
      "Xifrat: en trànsit (TLS) i en repòs (KMS).",
      "IAM + mínim privilegi (least privilege).",
      "Auditoria i monitoratge: CloudTrail (crides API) i CloudWatch (mètriques/logs).",
      "Bedrock segur: VPC endpoints, resource policies, KMS.",
      "Governança: model registry, model cards, data lineage (versions i traçabilitat).",
      "Compliment: GDPR, HIPAA, SOC, ISO 27001. Residència de dades = triar la regió correcta."
    ],
    mustRemember: [
      { en: "CloudTrail vs CloudWatch", ca: "Auditoria d'API vs monitoratge de sistema." },
      { en: "Least privilege", ca: "Només els permisos mínims necessaris." },
      { en: "Data residency", ca: "Processar dades dins d'una regió concreta." }
    ]
  }
];
