window.AFP = window.AFP || {};

/* ==========================================================================
   Motor de progrés i càlcul de preparació (readiness)
   ========================================================================== */
AFP.progress = (function () {
  function countTotalTopics() {
    var n = 0;
    AFP.domains.forEach(function (d) { n += d.topics.length; });
    return n;
  }

  function countDone() {
    var p = AFP.store.getProgress();
    var n = 0;
    AFP.domains.forEach(function (d) {
      d.topics.forEach(function (t) { if (p[t.id]) n++; });
    });
    return n;
  }

  function domainStats() {
    var p = AFP.store.getProgress();
    return AFP.domains.map(function (d) {
      var total = d.topics.length;
      var done = d.topics.filter(function (t) { return p[t.id]; }).length;
      return {
        domain: d,
        total: total,
        done: done,
        pct: total === 0 ? 0 : Math.round((done / total) * 100)
      };
    });
  }

  function overallPct() {
    var total = countTotalTopics();
    var done = countDone();
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }

  /* Readiness ponderada: contribueix el progrés de cada domini segons el seu pes a l'examen */
  function readiness() {
    var p = AFP.store.getProgress();
    var weighted = 0;
    AFP.domains.forEach(function (d) {
      var total = d.topics.length;
      if (total === 0) return;
      var done = d.topics.filter(function (t) { return p[t.id]; }).length;
      weighted += (done / total) * d.weight;
    });
    var totalWeight = AFP.domains.reduce(function (s, d) { return s + d.weight; }, 0);
    return Math.round((weighted / totalWeight) * 100);
  }

  return {
    countTotalTopics: countTotalTopics,
    countDone: countDone,
    domainStats: domainStats,
    overallPct: overallPct,
    readiness: readiness
  };
})();
