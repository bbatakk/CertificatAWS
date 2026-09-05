window.AFP = window.AFP || {};

/* Domini 5: Security, Compliance, and Governance for AI — teoria en català */
AFP.theoryD5 = [
  {
    id: "5.1",
    titleCa: "Responsabilitat compartida",
    intro: "El model de responsabilitat compartida d'AWS s'aplica també a les solucions d'IA.",
    blocks: [
      { t: "p", c: "AWS és responsable de la <b>seguretat DEL núvol</b> (la infraestructura: hardware, software, xarxa, serveis). Tu ets responsable de la seguretat <b>A DINS del núvol</b> (configuracions, dades, identitats, models)." },
      { t: "table", head: ["AWS (seguretat DEL núvol)", "Client (seguretat DINS el núvol)"], rows: [
        ["Infraestructura física i lògica", "Configurar IAM i permisos"],
        ["Seguretat dels serveis gestionats", "Xifrar les teves dades"],
        ["Aïllament de tenants", "Gestionar claus i secrets"],
        ["Actualitzacions del servei", "Revisar i monitorar l'ús"]
      ] },
      { t: "callout", kind: "exam", title: "Memo", c: "Amb IA és igual: AWS assegura Bedrock/SageMaker com a servei; tu assegures <b>els teus prompts, dades, models customitzats i policies d'accés</b>." }
    ]
  },
  {
    id: "5.2",
    titleCa: "Privacitat i xifrat de dades",
    intro: "Protegir les dades és la prioritat. Coneix les dues grans capes de xifrat.",
    blocks: [
      { t: "h", c: "Xifrat" },
      { t: "list", items: [
        "<b>Xifrat en trànsit</b> (in transit) — TLS/HTTPS: protegeix les dades que es mouen per la xarxa.",
        "<b>Xifrat en repòs</b> (at rest) — encripta les dades guardades (S3, volums, bases de dades)."
      ] },
      { t: "p", c: "La clau sovint es gestiona amb <b>AWS KMS</b> (Key Management Service), que integra xifrat i control d'accés a les claus." },
      { t: "h", c: "Privacitat de dades d'entrenament" },
      { t: "p", c: "A Bedrock, les dades que envies <b>no s'usen per reentrenar</b> els models base dels proveïdors. Els teus <b>fine-tunings</b> es guarden en el teu compte i els controles tu." },
      { t: "callout", kind: "tip", title: "Recorda", c: "TLS = trànsit, KMS/at rest = emmagatzematge. PII = protegir dades personals amb minimització i redacció." }
    ]
  },
  {
    id: "5.3",
    titleCa: "IAM i control d'accés",
    intro: "Qui pot fer què i sobre quins recursos: el principi del mínim privilegi.",
    blocks: [
      { t: "p", c: "<b>IAM</b> (Identity and Access Management) controla <b>autenticació</b> (qui ets) i <b>autorització</b> (què pots fer) amb <b>policies</b> JSON." },
      { t: "def", en: "Least privilege (mínim privilegi)", ca: "Concedir a cada identitat (usuari, rol) només els <b>permisos mínims</b> necessaris per fer la seva feina, ni un més." },
      { t: "list", items: [
        "<b>Roles</b> — identitats per a serveis o usos temporals (millor pràctica: no claus permanents).",
        "<b>Fine-grained access</b> — permisos molt detallats (ex.: un model concret de Bedrock).",
        "<b>Polítiques basades en identitat vs. basades en recurs</b> — qui pot... vs. aquest recurs permet..."
      ] },
      { t: "callout", kind: "exam", title: "Clau", c: "El mínim privilegi <b>redueix la superfície d'atac</b>: si una identitat és compromesa, el dany és mínim." }
    ]
  },
  {
    id: "5.4",
    titleCa: "Registre i monitoratge",
    intro: "Per auditar i vigilar les teves solucions d'IA, AWS ofereix dos serveis complementaris.",
    blocks: [
      { t: "table", head: ["Servei", "Funció"], rows: [
        ["<b>AWS CloudTrail</b>", "Registra les <b>crides a l'API</b> (qui ha fet què i quan). Base per a <b>auditoria</b> i compliment."],
        ["<b>Amazon CloudWatch</b>", "<b>Mètriques i logs</b> en temps real: ús, errors, alertes."]
      ] },
      { t: "p", c: "També hi ha <b>AWS Audit Manager</b> per automatitzar evidències d'auditoria i <b>Amazon CloudWatch Logs</b> per centralitzar el registre." },
      { t: "callout", kind: "tip", title: "Memo", c: "CloudTrail = 'qui va fer què' (auditoria d'API). CloudWatch = 'com va el sistema' (monitoratge). Junts donen observabilitat." }
    ]
  },
  {
    id: "5.5",
    titleCa: "Seguretat de Bedrock",
    intro: "Bedrock ofereix controls de seguretat propis per a les teves solucions d'IA.",
    blocks: [
      { t: "list", items: [
        "<b>VPC Endpoints / AWS PrivateLink</b> — connectar a Bedrock <b>sense sortir</b> de la teva VPC (trànsit privat).",
        "<b>Resource policies</b> — polítiques a nivell de model o recurs de Bedrock.",
        "<b>KMS</b> — xifrat de dades i de models customitzats.",
        "<b>CloudTrail / CloudWatch</b> — auditoria i monitoratge de les crides a Bedrock."
      ] },
      { t: "p", c: "El model de seguretat de Bedrock segueix el <b>responsabilitat compartida</b>: AWS assegura el servei, tu controles identitats, dades i polítiques." }
    ]
  },
  {
    id: "5.6",
    titleCa: "Governança de models i dades",
    intro: "Governança = tenir control, traçabilitat i procés sobre els models i les dades.",
    blocks: [
      { t: "h", c: "Governança de models" },
      { t: "list", items: [
        "<b>Model registry</b> (SageMaker) — versionar i aprovar models abans de desplegar.",
        "<b>Model cards</b> — fitxes que documenten cada model (propòsit, dades, limitacions).",
        "<b>Lineage</b> (traçabilitat) — saber d'on ve cada model i versió."
      ] },
      { t: "h", c: "Governança de dades" },
      { t: "list", items: [
        "<b>Data lineage</b> — traçabilitat de l'origen i transformacions de les dades.",
        "<b>Catàleg de dades</b> (ex.: AWS Glue Data Catalog) — inventari i metadades.",
        "<b>Control d'accés i qualitat</b> — qui pot usar quines dades i amb quina qualitat."
      ] },
      { t: "callout", kind: "exam", title: "Clau", c: "Governança = <b>versions, aprovacions i traçabilitat</b> en models i dades. És diferent de la seguretat (qui accedeix) encara que es complementen." }
    ]
  },
  {
    id: "5.7",
    titleCa: "Compliment i residència",
    intro: "Les solucions d'IA han de complir normatives, sovint vinculades a on viuen les dades.",
    blocks: [
      { t: "h", c: "Marques de compliment habituals" },
      { t: "list", items: [
        "<b>GDPR</b> — reglament europeu de protecció de dades.",
        "<b>HIPAA</b> — dades de salut als EUA.",
        "<b>SOC</b> — controls de seguretat operativa (SOC 1/2/3).",
        "<b>ISO 27001</b> — estàndard de seguretat de la informació."
      ] },
      { t: "h", c: "Residència de dades" },
      { t: "def", en: "Data residency", ca: "L'exigència que les dades processades <b>romanguin dins d'una regió o país</b> concret." },
      { t: "p", c: "AWS ho resol triant la <b>regió</b> on es desplega el servei: Bedrock, SageMaker i la resta processen i guarden les dades a la regió que triïs." },
      { t: "callout", kind: "tip", title: "Memo", c: "Compliment = quina <b>norma</b> he de complir (GDPR, HIPAA…). Residència = <b>on</b> han de viure les dades. Triar la regió correcta és la resposta típica." }
    ]
  }
];
