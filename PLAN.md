# AWS Certified AI Practitioner (AIF-C01) — Web d'estudi

Aplicació web estàtica i interactiva per preparar la certificació **AWS Certified AI Practitioner (AIF-C01)**.

## 1. Objectiu

Web personal d'estudi, funcional des de mòbil i ordinador, que cobreixi:
- Tota la teoria de l'examen, per blocs (els 5 dominis oficials)
- Part pràctica (laboratoris guiats d'AWS + exercicis conceptuals)
- Resums condensats de cada bloc
- Qüestionaris per bloc amb corrector i nota
- Simulador d'examen (cronometrat, ponderat, amb informe de resultats)

## 2. Dades de l'examen (blueprint oficial)

| Paràmetre | Valor |
|---|---|
| Codi | AIF-C01 |
| Nivell | Foundational |
| Preguntes | 65 (50 puntuen + 15 no puntuen) |
| Temps | 90 minuts |
| Aprovat | 700 / 1000 (puntuació escalada) |
| Cost | 100 USD |
| Tipus de pregunta | Elecció única (1 de 4) i resposta múltiple (2+ de 5) |
| Validesa | 3 anys |

## 3. Dominis i pesos

| # | Domini | Pes | ~Preguntes |
|---|--------|-----|-----------|
| 1 | Fundamentals of AI and ML | 20% | ~13 |
| 2 | Fundamentals of Generative AI | 24% | ~16 |
| 3 | Applications of Foundation Models | 28% | ~18 |
| 4 | Guidelines for Responsible AI | 14% | ~9 |
| 5 | Security, Compliance, and Governance for AI | 14% | ~9 |

## 4. Mapa de temes (guia d'autoria del contingut)

### Domini 1 — Fundamentals of AI and ML (20%)
- Definicions: AI vs ML vs DL vs Generative AI (relacions i diferències)
- Paradigmes de ML: supervisat, no supervisat, per reforç
- Cicle de vida ML: definició del problema, dades, features, labels, entrenament, avaluació, desplegament
- Conceptes de dades: split train/validation/test, features, labels, datasets
- Conceptes d'entrenament: epochs, batch, loss, gradient descent, overfitting, underfitting, regularització
- Mètriques d'avaluació: accuracy, precision, recall, F1, matriu de confusió, AUC-ROC
- Xarxes neuronals i deep learning (nivell conceptual)
- Inferència vs entrenament

### Domini 2 — Fundamentals of Generative AI (24%)
- Evolució: GANs → difusió → transformers
- Foundation models (FM) i Large Language Models (LLM)
- Transformers i atenció (nivell alt)
- Tokens, paràmetres, context window
- Prompt engineering: zero-shot, few-shot, chain-of-thought
- Paràmetres d'inferència: temperature, top-p, top-k
- Pre-entrenament vs fine-tuning vs RAG
- Al·lucinacions i mitigació
- Avaluació de models generatius
- Cost entrenament vs inferència

### Domini 3 — Applications of Foundation Models (28%)
- **Amazon Bedrock**: models (Claude, Titan, Llama, etc.), Playground, APIs, Knowledge Bases (RAG), Agents, Guardrails, models customitzats/fine-tuning, avaluació de models
- **Amazon Q** Business / Q Developer (antic CodeWhisperer)
- **Amazon SageMaker**: JumpStart, Canvas, Clarify, Studio
- **Serveis d'IA d'AWS**: Rekognition, Comprehend, Transcribe, Polly, Translate, Textract, Lex, Kendra, Forecast, Personalize, Fraud Detector
- Selecció del servei adequat per cada cas d'ús (habilitat clau de l'examen)
- Criteris de selecció de models: cost, latència, precisió, context, llicència
- Opcions de customització: prompt engineering vs RAG vs fine-tuning vs pre-entrenament

### Domini 4 — Responsible AI (14%)
- Principis de Responsible AI d'AWS
- Bias i fairness (SageMaker Clarify)
- Detecció de toxicitat
- Transparència i explicabilitat vs interpretabilitat
- Supervisió humana (human-in-the-loop)
- Privacitat
- Desinformació i al·lucinació
- Bedrock Guardrails
- Dimensions de Responsible AI: fairness, explicabilitat, privacitat, robustesa, transparència, governança

### Domini 5 — Security, Compliance, and Governance for AI (14%)
- Model de responsabilitat compartida per a IA
- Privacitat de dades: PII, xifrat en trànsit/repos (KMS)
- IAM: mínim privilegi, rols, polítiques
- Registre i monitoratge: CloudTrail, CloudWatch
- Seguretat de Bedrock: VPC, PrivateLink, resource policies
- Governança: governança de models/dades, catalogació (SageMaker model registry, data lineage)
- Compliment: HIPAA, GDPR, SOC, ISO
- Residència de dades

## 5. Decisions preses

| Decisió | Elecció |
|---|---|
| Idioma del contingut | **Anglès + català** (termes tècnics en anglès, explicacions en català) |
| Stack | **Estàtica**: HTML/CSS/JS vainilla, sense build ni dependències |
| Autoria del contingut | Generat per l'IA, alineat al blueprint oficial |
| Desplegament | **GitHub Pages** |
| Arquitectura | SPA amb `index.html` únic + hash routing |
| Persistència | `localStorage` (progrés, notes, historial, preferències) |
| Compatibilitat | Funciona amb `file://` (scripts globals, no ES modules) i a GitHub Pages |

## 6. Estructura de fitxers

```
CertificatAWS/
├── index.html              # shell SPA + navegació
├── css/styles.css          # sistema de disseny (variables, tema, responsive)
├── js/
│   ├── router.js           # hash router + renderitzat
│   ├── app.js              # lògica global (tema, navegació, helpers)
│   ├── quiz.js             # motor de qüestionaris + corrector  (Fase 2)
│   ├── exam.js             # simulador (timer, pesos, resultats) (Fase 2)
│   ├── theory.js           # vista de teoria (blocs, toc, progrés, bookmarks)  (Fase 3)
│   ├── summaries.js        # vista de resums  (Fase 3)
│   ├── practice.js         # vista de pràctica (labs + exercicis)  (Fase 5)
│   ├── flashcards.js       # vista de targetes (Leitner)  (Fase 5)
│   ├── stats.js            # vista d'estadístiques (historial + gauge)  (Fase 5)
│   ├── glossaryView.js     # vista del glossari amb cerca
│   ├── store.js            # localStorage (progrés, historial, preferències)
│   └── progress.js         # progrés + càlcul de readiness
├── data/
│   ├── domains.js          # estructura dels 5 dominis i temes
│   ├── quiz-bank.js        # banc de preguntes (69 originals, ponderat per domini)
│   ├── summaries.js        # resums condensats per domini (dades)
│   ├── practice.js         # laboratoris + exercicis (dades)
│   ├── flashcards.js       # targetes d'estudi (dades)
│   ├── theory/             # teoria per domini (d1..d5.js, 40 temes)
│   │   ├── _schema.js      # documentació de l'esquema de blocs
│   │   ├── d1.js  d2.js  d3.js  d4.js  d5.js
│   └── glossary.js         # glossari de termes (dades)
└── assets/                 # icones SVG inline, logo
```

## 7. Seccions i funcionalitats

### Nucli (requisits)
1. **Teoria per blocs** — 5 dominis, temes i subseccions. Català amb termes tècnics en anglès destacats. Navegació lateral per temes + anterior/següent.
2. **Pràctica** — tutorials pas a pas (Bedrock Playground, PartyRock, Rekognition/Polly, mini-demo RAG) + exercicis conceptuals resolts.
3. **Resums** — fitxes condensades per domini (xules de repàs).
4. **Qüestionaris per bloc** — corrector instantani, nota (ex. 8/10), explicació de cada resposta, es pot repetir. Suporta elecció única i resposta múltiple.
5. **Simulador d'examen** — 65 preguntes, timer 90 min amb auto-enviament, selecció aleatòria ponderada per pes de domini, informe final amb nota + desglossament per domini.

### Extres (afegits)
6. **Seguiment de progrés** — checkboxes per tema, % per domini i % global.
7. **Flashcards** — repàs espaiat (Leitner simple).
8. **Glossari** — termes clau.
9. **Cercador** — a tota la teoria.
10. **Panell d'estadístiques** — històric de quizzes/exàmens, dominis febles.
11. **Tema clar/fosc** + mode lectura.
12. **Adreces d'interès** per seccions de teoria.
13. **Guia d'examen** — format, puntuació, consells, pla d'estudi setmanal.

## 8. Sistema de disseny

### Concepte
**"Study Lab" d'AI** — un instrument d'estudi precís i dens en dades, que evoca la consola d'AWS combinada amb un quadern de laboratori. La identitat es construeix sobre els "tokens" de l'ecosistema: noms de serveis, mètriques i models es mostren en tipografia mono, com objectes de codi.

### Paleta (tema fosc per defecte)
| Token | Valor | Ús |
|---|---|---|
| `--bg` | `#0F1420` | Fons principal |
| `--surface` | `#161D2E` | Superfícies |
| `--surface-2` | `#1E2839` | Superfícies elevades |
| `--border` | `#2A3446` | Línies / vores |
| `--text` | `#E8EDF5` | Text principal |
| `--text-2` | `#9AA7BD` | Text secundari |
| `--accent` | `#FF9900` | Accent AWS (taronja) — amb moderació |
| `--teal` | `#3DD6C3` | Correcte / "ready" |
| `--danger` | `#FF5C5C` | Incorrecte / errors |
| `--warn` | `#FFB020` | Avís |

Tema clar: fons `#F6F8FB`, superfícies blanques, mateix accent.

### Tipografia (Google Fonts)
- **Display / títols**: *Space Grotesk* — caràcter tècnic i distintiu
- **Cos de text**: *Inter* — llegibilitat llarga
- **Mono / dades**: *JetBrains Mono* — noms de serveis, mètriques, codi

### Signatura
El **gauge de preparació (readiness)**: un mesurador radial gran al panell principal que mostra el % de preparació per a l'examen, derivat del progrés. És la tesi de tota l'app ("estic llest per aprovar?") i la imatge memorable.

## 9. Model de dades (localStorage)

| Clau | Contingut |
|---|---|
| `afp.theme` | `"dark"` \| `"light"` |
| `afp.progress` | `{ topicId: bool }` — temes completats |
| `afp.quiz.history` | `[{ domainId, score, total, date }]` |
| `afp.exam.history` | `[{ score, total, perDomain, date, timeUsed }]` |
| `afp.bookmarks` | `[topicId]` |
| `afp.flashcards` | estat de repàs (box per targeta) |

## 10. Notes importants

- **Preguntes originals**: mai dumps reals (AWS ho prohibeix i pot revocar la certificació). Totes les preguntes són originals, alineades al blueprint.
- **Pràctica**: és una web estàtica, per tant la "pràctica" són tutorials guiats de consola + exercicis conceptuals (no un entorn AWS real).

## 11. Fases i estat

| Fase | Descripció | Estat |
|---|---|---|
| 1 | Sistema de disseny + shell SPA (router, navegació, tema, responsive) | Fet |
| 2 | Motor de quiz + corrector, i simulador d'examen | Fet |
| 3 | Autoria del contingut (teoria + resums + glossari) | Fet |
| 4 | Banc de preguntes (quizzes + simulador) — ampliar el banc | **Fet** (69 preguntes) |
| 5 | Pràctica + flashcards + progrés + estadístiques | **Fet** |
| 6 | Desplegament a GitHub Pages + proves mòbil | **Fet** (https://bbatakk.github.io/CertificatAWS/) |
