/* Estructura dels 5 dominis de l'examen AIF-C01 */
window.AFP = window.AFP || {};

AFP.domains = [
  {
    id: 1,
    code: "D1",
    nameEn: "Fundamentals of AI and ML",
    nameCa: "Fonaments d'IA i ML",
    weight: 20,
    color: "accent",
    descCa: "Conceptes bàsics d'intel·ligència artificial i aprenentatge automàtic: paradigmes, cicle de vida, entrenament i mètriques d'avaluació.",
    topics: [
      { id: "1.1", titleCa: "Definicions: AI, ML, DL i GenAI", titleEn: "AI vs ML vs DL vs GenAI" },
      { id: "1.2", titleCa: "Paradigmes de ML", titleEn: "Supervised, unsupervised, reinforcement" },
      { id: "1.3", titleCa: "Cicle de vida d'un model ML", titleEn: "ML lifecycle" },
      { id: "1.4", titleCa: "Dades i datasets", titleEn: "Data, features, labels" },
      { id: "1.5", titleCa: "Entrenament de models", titleEn: "Training concepts" },
      { id: "1.6", titleCa: "Mètriques d'avaluació", titleEn: "Evaluation metrics" },
      { id: "1.7", titleCa: "Xarxes neuronals i deep learning", titleEn: "Neural networks & DL" },
      { id: "1.8", titleCa: "Inferència vs entrenament", titleEn: "Inference vs training" }
    ]
  },
  {
    id: 2,
    code: "D2",
    nameEn: "Fundamentals of Generative AI",
    nameCa: "Fonaments de la IA generativa",
    weight: 24,
    color: "violet",
    descCa: "IA generativa, foundation models i LLMs: com funcionen, prompt engineering i tècniques de customització (RAG, fine-tuning).",
    topics: [
      { id: "2.1", titleCa: "Què és la IA generativa", titleEn: "Generative AI concepts" },
      { id: "2.2", titleCa: "Foundation models i LLMs", titleEn: "Foundation models & LLMs" },
      { id: "2.3", titleCa: "Transformers i atenció", titleEn: "Transformers & attention" },
      { id: "2.4", titleCa: "Tokens, paràmetres i context", titleEn: "Tokens, parameters, context" },
      { id: "2.5", titleCa: "Prompt engineering", titleEn: "Prompt engineering" },
      { id: "2.6", titleCa: "Paràmetres d'inferència", titleEn: "Inference parameters" },
      { id: "2.7", titleCa: "Pre-entrenament, fine-tuning i RAG", titleEn: "Pre-training vs fine-tuning vs RAG" },
      { id: "2.8", titleCa: "Al·lucinacions i avaluació", titleEn: "Hallucinations & evaluation" }
    ]
  },
  {
    id: 3,
    code: "D3",
    nameEn: "Applications of Foundation Models",
    nameCa: "Aplicacions dels foundation models",
    weight: 28,
    color: "teal",
    descCa: "Els serveis d'AWS per aplicar la IA: Amazon Bedrock, Amazon Q, SageMaker i la resta de serveis d'IA, i com triar el correcte.",
    topics: [
      { id: "3.1", titleCa: "Amazon Bedrock (visió general)", titleEn: "Amazon Bedrock overview" },
      { id: "3.2", titleCa: "Bedrock: models i Playground", titleEn: "Bedrock models & Playground" },
      { id: "3.3", titleCa: "Bedrock: Knowledge Bases (RAG)", titleEn: "Bedrock Knowledge Bases" },
      { id: "3.4", titleCa: "Bedrock: Agents i Guardrails", titleEn: "Bedrock Agents & Guardrails" },
      { id: "3.5", titleCa: "Bedrock: fine-tuning i avaluació", titleEn: "Bedrock customization & evaluation" },
      { id: "3.6", titleCa: "Amazon Q", titleEn: "Amazon Q" },
      { id: "3.7", titleCa: "Amazon SageMaker", titleEn: "Amazon SageMaker" },
      { id: "3.8", titleCa: "Serveis d'IA d'AWS", titleEn: "AWS AI services" },
      { id: "3.9", titleCa: "Selecció del servei i del model", titleEn: "Choosing the right service/model" }
    ]
  },
  {
    id: 4,
    code: "D4",
    nameEn: "Guidelines for Responsible AI",
    nameCa: "Directrius per a una IA responsable",
    weight: 14,
    color: "warn",
    descCa: "Ús responsable de la IA: biaix, equitat, transparència, supervisió humana i mitigació d'al·lucinacions i toxicitat.",
    topics: [
      { id: "4.1", titleCa: "Principis de Responsible AI d'AWS", titleEn: "AWS responsible AI principles" },
      { id: "4.2", titleCa: "Biaix i equitat", titleEn: "Bias & fairness" },
      { id: "4.3", titleCa: "Toxicitat i moderació", titleEn: "Toxicity & moderation" },
      { id: "4.4", titleCa: "Transparència i explicabilitat", titleEn: "Transparency & explainability" },
      { id: "4.5", titleCa: "Supervisió humana", titleEn: "Human oversight" },
      { id: "4.6", titleCa: "Privacitat", titleEn: "Privacy" },
      { id: "4.7", titleCa: "Desinformació i al·lucinació", titleEn: "Misinformation & hallucination" },
      { id: "4.8", titleCa: "Bedrock Guardrails", titleEn: "Bedrock Guardrails" }
    ]
  },
  {
    id: 5,
    code: "D5",
    nameEn: "Security, Compliance, and Governance for AI",
    nameCa: "Seguretat, compliment i governança de la IA",
    weight: 14,
    color: "blue",
    descCa: "Com protegir i governar les solucions d'IA: responsabilitat compartida, privacitat, IAM, monitoratge i compliment normatiu.",
    topics: [
      { id: "5.1", titleCa: "Responsabilitat compartida", titleEn: "Shared responsibility model" },
      { id: "5.2", titleCa: "Privacitat i xifrat de dades", titleEn: "Data privacy & encryption" },
      { id: "5.3", titleCa: "IAM i control d'accés", titleEn: "IAM & least privilege" },
      { id: "5.4", titleCa: "Registre i monitoratge", titleEn: "CloudTrail & CloudWatch" },
      { id: "5.5", titleCa: "Seguretat de Bedrock", titleEn: "Bedrock security" },
      { id: "5.6", titleCa: "Governança de models i dades", titleEn: "Model & data governance" },
      { id: "5.7", titleCa: "Compliment i residència", titleEn: "Compliance & data residency" }
    ]
  }
];

/* Pesos per al simulador d'examen (segons blueprint oficial) */
AFP.examWeights = AFP.domains.map(function (d) {
  return { id: d.id, weight: d.weight };
});

/* Configuració de l'examen */
AFP.examConfig = {
  totalQuestions: 65,
  durationMinutes: 90,
  passingScore: 700,
  maxScore: 1000
};
