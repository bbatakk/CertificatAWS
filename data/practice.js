window.AFP = window.AFP || {};

/* ==========================================================================
   Pràctica — laboratoris guiats d'AWS + exercicis conceptuals resolts

   Tipus d'ítem:
   {
     id, titleCa, domain, level ("basic"|"intermediate"),
     kind: "lab" | "exercise",
     intro: "què farem i per què",
     // per a "lab": passos numerats amb la consola d'AWS
     steps: ["pas 1", "pas 2", ...],
     outcome: "què hauràs après / resultat esperat",
     // per a "exercise": enunciat + solució oculta per revelar
     problem: "enunciat de l'escenari d'examen",
     solution: "solució raonada (català)"
   }
   ========================================================================== */

AFP.practice = [
  /* ------------------------ Laboratoris (labs) ------------------------ */
  {
    id: "lab-bedrock",
    domain: 3,
    level: "basic",
    kind: "lab",
    titleCa: "Laboratori: prova un FM al Playground de Bedrock",
    intro: "Sense escriure codi, accedeix al Playground de Bedrock i experimenta amb prompts i paràmetres d'inferència. És el laboratori més important per interioritzar el Domini 3.",
    steps: [
      "Inicia sessió a la consola d'AWS i busca <b>Bedrock</b> al cercador.",
      "Al menú d'Amazon Bedrock, clica <b>Playgrounds → Chat</b> (o Text/Image segons el model).",
      "Tria un model (per exemple, <b>Anthropic Claude</b> o <b>Amazon Titan</b>) i aplica-hi <i>Model access</i> si encara no ho has fet.",
      "Escriu un prompt simple: «Explica'm què és un foundation model en dos paràgrafs».",
      "Observa la resposta. Ara juga amb la <b>temperature</b>: posa-la a 0.1 i després a 0.9 i compara com canvia l'estil.",
      "Prova un prompt <b>few-shot</b>: dona 2 exemples de definicions i demana'n una de nova amb el mateix format.",
      "Prova un model d'<b>imatges</b> (ex. Stable Diffusion): genera una imatge amb un prompt descriptiu.",
      "Anota la diferència entre <b>text</b> i <b>embedding</b> si el Playground te'n mostra l'opció."
    ],
    outcome: "Entendràs en viu què fa un FM, com respon a la temperature i què és el prompt engineering, sense infraestructura."
  },
  {
    id: "lab-partyrock",
    domain: 2,
    level: "basic",
    kind: "lab",
    titleCa: "Laboratori: construeix una mini-app amb PartyRock",
    intro: "PartyRock és el playground no-code d'AWS per a IA generativa. Ideal per crear una app senzilla i entendre els blocs de GenAI.",
    steps: [
      "Obre <b>partyrock.aws</b> i inicia sessió amb el teu compte AWS.",
      "Clica <b>Build your own app</b> i escriu una idea (ex.: «Genera 5 consells de productivitat per a estudiants»).",
      "Observa com PartyRock genera <b>widgets</b>: entrada de text, sortida de text, imatges...",
      "Afegeix un widget que generi una <b>imatge</b> a partir del text anterior (encadena els widgets).",
      "Prova a canviar el <b>model</b> d'un widget i veu com en canvia el resultat.",
      "Comparteix l'app i comprova què veu un altre usuari."
    ],
    outcome: "Veuràs la GenAI com a composició de blocs (entrada → model → sortida), base conceptual de Bedrock."
  },
  {
    id: "lab-rekognition",
    domain: 3,
    level: "basic",
    kind: "lab",
    titleCa: "Laboratori: analitza una imatge amb Amazon Rekognition",
    intro: "Utilitza Rekognition per detectar objectes, etiquetes i text en una imatge, i associa el servei al cas d'ús de visió per computador.",
    steps: [
      "A la consola d'AWS, obre <b>Amazon Rekognition</b> → <b>Images</b>.",
      "Puja una imatge teva (o una foto de mostra) o usa una URL d'exemple.",
      "Revisa les <b>labels</b> (etiquetes) que detecta: objectes, escenes, activitats...",
      "Habilita <b>Text in image</b> i comprova si extreu text de la imatge.",
      "Prova la detecció de <b>cares</b> i <b>moderació</b> (contingut inapropiat).",
      "Pensa: què hauries fet servir abans de Rekognition per resoldre aquesta tasca?"
    ],
    outcome: "Associaràs Rekognition = anàlisi d'imatges/vídeo, un dels parells més preguntats de l'examen."
  },
  {
    id: "lab-polly",
    domain: 3,
    level: "basic",
    kind: "lab",
    titleCa: "Laboratori: converteix text a veu amb Amazon Polly",
    intro: "Polly fa text-to-speech. Un laboratori curt per fixar la parella servei↔tasca i veure el resultat audible.",
    steps: [
      "Obre <b>Amazon Polly</b> a la consola d'AWS.",
      "Escriu una frase al camp de text (ex.: «Estic estudiant per a l'AIF-C01»).",
      "Tria una <b>veu</b> (idioma i variant) i prem <b>Listen</b>.",
      "Prova a canviar la veu i l'idioma i escolta la diferència.",
      "Si vols, sintetitza a <b>MP3</b> i descarrega el fitxer."
    ],
    outcome: "Recordaràs Polly = text→speech (i Transcribe = el contrari, speech→text)."
  },
  {
    id: "lab-rag",
    domain: 3,
    level: "intermediate",
    kind: "lab",
    titleCa: "Laboratori: crea una Knowledge Base (RAG) a Bedrock",
    intro: "El laboratori avançat: connecta documents teus i fes que un model hi respongui sense reentrenar. És la peça conceptual més valuosa de Bedrock.",
    steps: [
      "Puja 2-3 fitxers de text (PDF o .txt) propis a un bucket d'<b>S3</b>.",
      "A Bedrock, ves a <b>Knowledge Bases → Create</b>.",
      "Indica l'S3 com a <b>data source</b> i tria un <b>model d'embeddings</b> (ex. Amazon Titan Embeddings).",
      "Tria el <b>vector store</b> (OpenSearch Serverless, Aurora o Pinecone) — o deixa que Bedrock en creï un.",
      "Un cop sincronitzat, prova el <b>Playground de la Knowledge Base</b>: fes una pregunta que NOMÉS es respon amb els teus documents.",
      "Compara la resposta amb la que donaria el model sol (sense KB) i observa la diferència (i com es redueixen les al·lucinacions)."
    ],
    outcome: "Entendràs el RAG de principi a fi: documents → embeddings → vector store → recuperació → augment del prompt."
  },

  /* ------------------------ Exercicis conceptuals ------------------------ */
  {
    id: "ex-scenari-1",
    domain: 3,
    level: "basic",
    kind: "exercise",
    titleCa: "Exercici: tria el servei per a cada necessitat",
    intro: "Escenari tipus examen: donat un requisit de negoci, què faries servir?",
    problem: "Una empresa vol: (a) transcriure reunions gravades, (b) detectar cara i etiquetar fotos de productes, (c) un chatbot d'atenció al client amb respostes de la seva base de coneixement, i (d) generar resums de text automàticament. Quin servei o eina d'AWS assignaries a cadascuna?",
    solution: "a) <b>Amazon Transcribe</b> (speech→text). b) <b>Amazon Rekognition</b> (visió). c) <b>Amazon Lex</b> per al bot + <b>Bedrock Knowledge Bases</b> (o Kendra) per fonamentar les respostes. d) <b>Amazon Bedrock</b> amb un LLM (o Q Business) per resumir. La clau és identificar primer la <b>tasca</b> (parla, visió, conversa+recuperació, generació) i després el servei."
  },
  {
    id: "ex-scenari-2",
    domain: 2,
    level: "intermediate",
    kind: "exercise",
    titleCa: "Exercici: ordena l'estratègia de customització",
    intro: "Demostra que tens clar l'ordre correcte segons cost i esforç.",
    problem: "Una startup vol que un LLM parli amb l'estil i el vocabulari del seu sector i respongui a partir de la seva documentació tècnica actualitzada. Ordena les opcions (prompt engineering, RAG, fine-tuning, pre-entrenament) de la més barata i ràpida a la més cara, i justifica quina combinació faries servir.",
    solution: "Ordre de menys a més esforç: <b>prompt engineering</b> → <b>RAG</b> → <b>fine-tuning</b> → <b>pre-entrenament</b>. Per al cas: primer prompt engineering (definir rol i estil al prompt) + <b>RAG</b> (coneixement actualitzat sense reentrenar). El <b>fine-tuning</b> només si cal fixar de veritat un estil molt particular; el pre-entrenament és inviable per a una startup."
  },
  {
    id: "ex-scenari-3",
    domain: 4,
    level: "intermediate",
    kind: "exercise",
    titleCa: "Exercici: aplica la IA responsable",
    intro: "Com reforçaries la responsabilitat en una solució generativa.",
    problem: "Una app d'atenció al client utilitza un LLM. Cada cert temps genera respostes que es mengen en temes sensibles i alguna vegada ha filtrat dades personals. Quines mesures de Responsible AI aplicaríes i amb quines eines d'AWS?",
    solution: "1) <b>Bedrock Guardrails</b>: temes denegats, filtre de toxicitat i <b>PII redaction</b> (emmascarar dades). 2) <b>SageMaker Clarify</b> si hi ha un component de ML clàssic amb risc de biaix. 3) <b>Supervisió humana</b> (human-in-the-loop) abans de publicar contingut de risc. 4) <b>Transparència</b>: avisar els usuaris que parlen amb una IA. Això cobreix fairness, privacitat i transparència."
  },
  {
    id: "ex-scenari-4",
    domain: 5,
    level: "basic",
    kind: "exercise",
    titleCa: "Exercici: assigna responsabilitats (compartida)",
    intro: "El model de responsabilitat compartida aplicat a IA.",
    problem: "Distingeix què és responsabilitat d'AWS i què del client en una solució de Bedrock: (a) la infraestructura física, (b) la política IAM que limita qui pot cridar el model, (c) el xifrat de les dades del client en repòs, (d) el pegat/correcció del servei gestionat.",
    solution: "AWS: (a) infraestructura i (d) correccions del servei gestionat. Client: (b) IAM i (c) xifrat/configuració de les seves dades (les claus KMS les controles tu). Regla: AWS 'of the cloud' vs. client 'in the cloud'."
  }
];
