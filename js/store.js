window.AFP = window.AFP || {};

/* Almacenament persistent amb localStorage */
AFP.store = (function () {
  var PREFIX = "afp.";

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* localStorage ple o no disponible: ignora */
    }
  }

  function getTheme() {
    var t = read("theme", null);
    if (t === "light" || t === "dark") return t;
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function setTheme(theme) {
    write("theme", theme);
  }

  function getProgress() {
    return read("progress", {});
  }

  function setTopicDone(id, done) {
    var p = getProgress();
    if (done) p[id] = true;
    else delete p[id];
    write("progress", p);
    return p;
  }

  function getBookmarks() {
    return read("bookmarks", []);
  }

  function toggleBookmark(id) {
    var b = getBookmarks();
    var i = b.indexOf(id);
    if (i >= 0) b.splice(i, 1);
    else b.push(id);
    write("bookmarks", b);
    return b;
  }

  function getQuizHistory() {
    return read("quizHistory", []);
  }

  function addQuizResult(entry) {
    var h = getQuizHistory();
    h.push(entry);
    if (h.length > 200) h = h.slice(-200);
    write("quizHistory", h);
    return h;
  }

  function getExamHistory() {
    return read("examHistory", []);
  }

  function addExamResult(entry) {
    var h = getExamHistory();
    h.push(entry);
    if (h.length > 100) h = h.slice(-100);
    write("examHistory", h);
    return h;
  }

  function getFlashcardState() {
    return read("flashcards", {});
  }

  function setFlashcardBox(id, box) {
    var s = getFlashcardState();
    s[id] = box;
    write("flashcards", s);
    return s;
  }

  function clearAll() {
    Object.keys(localStorage)
      .filter(function (k) { return k.indexOf(PREFIX) === 0; })
      .forEach(function (k) { localStorage.removeItem(k); });
  }

  return {
    getTheme: getTheme,
    setTheme: setTheme,
    getProgress: getProgress,
    setTopicDone: setTopicDone,
    getBookmarks: getBookmarks,
    toggleBookmark: toggleBookmark,
    getQuizHistory: getQuizHistory,
    addQuizResult: addQuizResult,
    getExamHistory: getExamHistory,
    addExamResult: addExamResult,
    getFlashcardState: getFlashcardState,
    setFlashcardBox: setFlashcardBox,
    clearAll: clearAll
  };
})();

/* Helpers de dates i nombres */
AFP.util = (function () {
  function fmtDate(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    var now = new Date();
    var sameDay = d.toDateString() === now.toDateString();
    var time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    if (sameDay) return "Avui " + time;
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" }) + " " + time;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function domainColor(domainId) {
    var colors = { 1: "accent", 2: "violet", 3: "teal", 4: "warn", 5: "blue" };
    return colors[domainId] || "accent";
  }

  function getDomain(id) {
    for (var i = 0; i < AFP.domains.length; i++) {
      if (AFP.domains[i].id === id) return AFP.domains[i];
    }
    return null;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  return {
    fmtDate: fmtDate,
    esc: esc,
    domainColor: domainColor,
    getDomain: getDomain,
    shuffle: shuffle
  };
})();
