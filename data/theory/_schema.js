window.AFP = window.AFP || {};

/* ==========================================================================
   Esquema de contingut de teoria (documentació)

   Cada domini és un fitxer `data/theory/d<N>.js` que defineix `AFP.theoryD<N>`,
   un array de temes. Cada tema:

   {
     id:    "1.1",                    // ha de coincidir amb domains.js topics
     titleCa: "Definicions...",
     intro: "Paràgraf introductori (català)",
     blocks: [ ... ]                  // blocs de contingut
   }

   Tipus de bloc (ala rich text simple):
     { t: "p",    c: "Paràgraf. Pots escriure <b>negreta</b> i <code>codi</code>" }
     { t: "h",    c: "Títol de subsecció" }
     { t: "list", items: ["ítem 1", "ítem 2"] }
     { t: "def",  en: "Foundation Model", ca: "Definició en català" }
     { t: "callout", kind: "tip"|"warn"|"exam", title: "Títol", c: "Contingut" }
     { t: "table", head: ["Col1","Col2"], rows: [["a","b"], ...] }

   Convenció lingüística: el text en català incorpora els termes tècnics en
   ANGLÈS en <b>negreta</b> perquè l'estudiant els memoritzi com apareixen a
   l'examen (que és en anglès).
   ========================================================================== */
