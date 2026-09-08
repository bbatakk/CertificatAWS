window.AFP = window.AFP || {};

/* ==========================================================================
   Mapa conceptual interactiu — SVG mind map de tota la teoria
   (arbre: examen → domini → tema → conceptes interns del tema)
   ========================================================================== */
AFP.conceptMap = (function () {
  /* ---- constants de disseny ---- */
  var TOPIC_GAP = 34;      // espai entre temes sense conceptes o col·lapsats
  var CONCEPT_GAP = 26;    // espai entre nodes de concepte
  var PADDING_Y = 50;
  var COL = { root: 50, domain: 270, topic: 620, concept: 990 };
  var NODE_H_ROOT = 54;
  var NODE_H_DOM = 50;
  var NODE_H_TOP = 34;
  var NODE_H_CON = 24;
  var THEME_COLORS = {
    accent: "#ff9900",
    violet: "#a78bfa",
    teal:   "#3dd6c3",
    warn:   "#ffb020",
    blue:   "#5aa7ff"
  };

  var domCollapsed = {};   // id domini → bool
  var topicCollapsed = {}; // id tema → bool
  var scale = 1, tx = 0, ty = 0;
  var drag = null;
  var suppressClick = false;
  var windowBound = false;

  function onWinMove(e) {
    if (!drag) return;
    var dx = e.clientX - drag.sx;
    var dy = e.clientY - drag.sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
    tx = drag.otx + dx;
    ty = drag.oty + dy;
    var pan = document.getElementById("concept-map-pan");
    if (pan) applyTransform(pan);
  }

  function onWinUp() {
    if (drag) {
      if (drag.moved) suppressClick = true;
      var wrap = document.getElementById("concept-map-wrap");
      if (wrap) wrap.style.cursor = "";
      drag = null;
      setTimeout(function () { suppressClick = false; }, 120);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Utilitats                                                          */
  /* ------------------------------------------------------------------ */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function stripHtml(s) {
    return String(s == null ? "" : s)
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/\s+/g, " ").trim();
  }

  function trunc(s, max) {
    s = String(s);
    return s.length > max ? s.slice(0, max - 1) + "\u2026" : s;
  }

  /* Extrau els conceptes (nodes dins d'un tema) a partir de blocks */
  function theoryTopic(did, tid) {
    var list = AFP["theoryD" + did];
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === tid) return list[i];
    }
    return null;
  }

  function topicConcepts(tp) {
    var cons = [];
    (tp.blocks || []).forEach(function (b) {
      if (b.t === "h") {
        if (b.c) cons.push({ label: b.c, kind: "h" });
      } else if (b.t === "def") {
        if (b.en) cons.push({ label: b.en, kind: "def" });
      } else if (b.t === "callout") {
        var l = b.title || (b.kind === "warn" ? "Atenci\u00f3" : b.kind === "exam" ? "Clau d'examen" : "Consell");
        cons.push({ label: l, kind: "callout" });
      } else if (b.t === "list") {
        (b.items || []).forEach(function (item) {
          var m = /<b>([^<]+)<\/b>/.exec(item);
          cons.push({ label: m ? m[1] : stripHtml(item), kind: "item" });
        });
      } else if (b.t === "table") {
        (b.rows || []).forEach(function (row) {
          cons.push({ label: stripHtml(row[0]) || "(taula)", kind: "item" });
        });
      } else if (b.t === "p") {
        var m = /<b>([^<]+)<\/b>/.exec(b.c || "");
        if (m) cons.push({ label: m[1], kind: "item" });
      }
    });
    return cons;
  }

  function nodeW(n) {
    var len = (n.label || "").length;
    if (n.type === "root") return NODE_W_ROOT;
    if (n.type === "domain") return Math.max(210, Math.min(330, len * 6.4 + 46));
    if (n.type === "topic") return Math.max(210, Math.min(330, len * 6.2 + 46));
    return Math.max(180, Math.min(420, len * 6.2 + 36));   // concept
  }

  var NODE_W_ROOT = 260;

  /* ------------------------------------------------------------------ */
  /*  Layout — calcula posicions de tots els nodes                     */
  /* ------------------------------------------------------------------ */
  function layout() {
    var domains = AFP.domains;
    var SLOT_GAP = 26;
    var nodes = [];
    var lines = [];

    // ---- Passa 1: conceptes + posicions verticals
    var cursor = PADDING_Y;
    domains.forEach(function (d) {
      d._collapsed = !!domCollapsed[d.id];
      if (d._collapsed) {
        d._slotTop = cursor;
        d._slotH = NODE_H_DOM;
        cursor += d._slotH;
        d.topics.forEach(function (tp) { tp._concepts = []; });
      } else {
        d._slotTop = cursor;
        d.topics.forEach(function (tp) {
          var content = theoryTopic(d.id, tp.id) || {};
          tp._concepts = topicConcepts(content);
          var nCo = tp._concepts.length;
          tp._collapsed = !!topicCollapsed[tp.id];
          tp._hasConcepts = nCo > 0;
          if (tp._collapsed || nCo === 0) {
            tp._y = cursor + NODE_H_TOP / 2;
            tp._conceptYs = [];
            cursor += TOPIC_GAP;
          } else {
            tp._y = cursor + NODE_H_TOP / 2;
            tp._conceptYs = [];
            tp._concepts.forEach(function (c, i) {
              c._y = cursor + NODE_H_TOP + CONCEPT_GAP / 2 + i * CONCEPT_GAP;
              tp._conceptYs.push(c._y);
            });
            cursor += NODE_H_TOP + CONCEPT_GAP * nCo;
          }
        });
        d._slotH = cursor - d._slotTop;
      }
      cursor += SLOT_GAP;
    });

    var totalH = cursor - SLOT_GAP + PADDING_Y;
    var rootY = totalH / 2;

    // ---- Passa 2: nodes
    nodes.push({
      type: "root",
      label: "AIF-C01",
      label2: "AWS Certified AI Practitioner",
      x: COL.root, y: rootY - NODE_H_ROOT / 2,
      color: "var(--accent)",
      collapsedFlag: false
    });

    domains.forEach(function (d) {
      var color = THEME_COLORS[d.color] || THEME_COLORS.accent;
      var centerLine = d._slotTop + d._slotH / 2;

      if (!d._collapsed) {
        d.topics.forEach(function (tp) {
          var done = AFP.store.getProgress()[tp.id] === true;
          nodes.push({
            type: "topic",
            id: tp.id,
            domainId: d.id,
            label: tp.id + "  " + tp.titleCa,
            x: COL.topic,
            y: tp._y - NODE_H_TOP / 2,
            color: color,
            done: done,
            conceptCount: tp._concepts.length,
            hasChildren: tp._hasConcepts,
            collapsedFlag: tp._collapsed,
            label2: tp._hasConcepts ? (tp._collapsed ? "+" + tp._concepts.length + " conceptes" : tp._concepts.length + " conceptes") : ""
          });

          if (!tp._collapsed) {
            tp._concepts.forEach(function (c) {
              nodes.push({
                type: "concept",
                domainId: d.id,
                topicId: tp.id,
                label: c.label,
                kind: c.kind,
                x: COL.concept,
                y: c._y - NODE_H_CON / 2,
                color: color
              });
            });
          }
        });
      }

      nodes.push({
        type: "domain",
        id: d.id,
        domainId: d.id,
        label: d.code + "  " + d.nameCa,
        label2: d.weight + "%  ·  " + d.topics.length + " temes",
        x: COL.domain,
        y: centerLine - NODE_H_DOM / 2,
        color: color,
        nTopics: d.topics.length,
        hasChildren: true,
        collapsedFlag: d._collapsed
      });
    });

    // ---- Passa 3: línies
    var rootW = nodeW(nodes[0]);
    domains.forEach(function (d) {
      var color = THEME_COLORS[d.color] || THEME_COLORS.accent;
      var centerLine = d._slotTop + d._slotH / 2;

      lines.push({
        x1: COL.root + rootW + 16,
        y1: rootY,
        x2: COL.domain - 10,
        y2: centerLine,
        color: color
      });

      if (!d._collapsed) {
        d.topics.forEach(function (tp) {
          var topW = nodeW({
            type: "topic",
            label: tp.id + "  " + tp.titleCa
          });
          // línia domini → tema
          lines.push({
            x1: COL.domain + domW(d) + 6,
            y1: centerLine,
            x2: COL.topic - 10,
            y2: tp._y,
            color: color
          });

          // línies tema → conceptes
          if (!tp._collapsed) {
            tp._conceptYs.forEach(function (cy) {
              lines.push({
                x1: COL.topic + topW + 6,
                y1: tp._y,
                x2: COL.concept - 10,
                y2: cy,
                color: color
              });
            });
          }
        });
      }
    });

    return {
      nodes: nodes,
      lines: lines,
      totalH: totalH,
      totalW: COL.concept + 420 + 30
    };
  }

  function domW(d) {
    var label = d.code + "  " + d.nameCa;
    var len = label.length;
    return Math.max(210, Math.min(330, len * 6.4 + 46));
  }

  var KIND_MARK = { h: "\u00a7", def: "\u2261", callout: "!", item: "\u2022" };
  var KIND_COLOR = { h: "var(--accent)", def: "var(--teal)", callout: "var(--warn)" };

  /* ------------------------------------------------------------------ */
  /*  SVG helpers                                                       */
  /* ------------------------------------------------------------------ */
  function svgEl(tag, attrs, children) {
    var parts = ["<" + tag];
    for (var k in attrs) {
      if (attrs.hasOwnProperty(k)) parts.push(k + '="' + attrs[k] + '"');
    }
    if (children && children.length) {
      parts.push(">" + children.join("") + "</" + tag + ">");
    } else {
      parts.push("/>");
    }
    return parts.join(" ");
  }

  function drawLine(x1, y1, x2, y2, color) {
    var mx = (x1 + x2) / 2;
    return svgEl("path", {
      d: "M" + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + x2 + "," + y2,
      fill: "none",
      stroke: color,
      "stroke-width": "1.5",
      "stroke-opacity": "0.32"
    });
  }

  function drawNode(n, w, h) {
    var children = [];
    var x = n.x, y = n.y;

    // Fons
    children.push(svgEl("rect", {
      x: x, y: y, width: w, height: h,
      rx: n.type === "root" ? 12 : (n.type === "concept" ? 6 : 8),
      fill: n.type === "root" ? "var(--accent-soft)"
           : n.type === "concept" ? "var(--surface-2)"
           : "var(--surface)",
      stroke: n.type === "root" ? "var(--accent)" : "var(--border)",
      "stroke-width": n.type === "root" ? 2 : 1,
      "stroke-opacity": n.type === "concept" ? 0.7 : 1
    }));

    var txtX = x + 12;
    var dotCX, dotCY;

    if (n.type === "concept") {
      // Marca de tipus + etiqueta
      var markX = txtX, markW = 16;
      children.push(svgEl("text", {
        x: markX, y: y + h / 2 + 1,
        fill: KIND_COLOR[n.kind] || "var(--text-3)",
        "font-size": 10,
        "font-family": "Inter, system-ui, sans-serif",
        "text-anchor": "middle",
        "dominant-baseline": "middle"
      }, [KIND_MARK[n.kind] || "\u2022"]));
      children.push(svgEl("text", {
        x: txtX + markW, y: y + h / 2 + 1,
        fill: "var(--text-2)",
        "font-size": 9.5,
        "font-family": "Inter, system-ui, sans-serif",
        "dominant-baseline": "middle"
      }, [esc(trunc(n.label, 46))]));
    } else {
      // Punt de color
      dotCX = x + 14; dotCY = y + h / 2;
      children.push(svgEl("circle", {
        cx: dotCX, cy: dotCY, r: n.type === "root" ? 5 : 3,
        fill: n.color || "var(--accent)"
      }));

      // Etiqueta principal
      var fontSize = n.type === "root" ? 13 : n.type === "domain" ? 11.5 : 10.5;
      var fontWeight = n.type === "root" ? 700 : n.type === "domain" ? 600 : 400;
      var labelMax = n.type === "root" ? 34 : n.type === "domain" ? 34 : 30;
      children.push(svgEl("text", {
        x: x + 24, y: y + (n.label2 ? h / 2 - 5 : h / 2 + 1),
        fill: "var(--text)",
        "font-size": fontSize,
        "font-weight": fontWeight,
        "font-family": "Inter, system-ui, sans-serif",
        "dominant-baseline": "middle"
      }, [esc(trunc(n.label, labelMax))]));

      if (n.label2) {
        children.push(svgEl("text", {
          x: x + 24, y: y + h / 2 + 9,
          fill: "var(--text-3)",
          "font-size": 9,
          "font-family": "Inter, system-ui, sans-serif",
          "dominant-baseline": "middle"
        }, [esc(n.label2)]));
      }

      // Icona de completat
      if (n.done) {
        var cx = x + w - 16, cy = y + h / 2;
        children.push(svgEl("circle", { cx: cx, cy: cy, r: 8, fill: "var(--teal)", opacity: 0.18 }));
        children.push(svgEl("path", {
          d: "M" + (cx - 3) + "," + cy + " l2,2 l4,-4",
          fill: "none", stroke: "var(--teal)", "stroke-width": 1.5,
          "stroke-linecap": "round", "stroke-linejoin": "round"
        }));
      }

      // Indicador de col·lapsable
      if (n.hasChildren) {
        var arrowX = x + w - 16, arrowY = y + h / 2;
        var angle = n.collapsedFlag ? 0 : 90;
        children.push(svgEl("g", {
          transform: "translate(" + arrowX + "," + arrowY + ") rotate(" + angle + ")",
          opacity: 0.4
        }, [
          svgEl("path", {
            d: "M-3,-3 L0,3 L3,-3",
            fill: "none", stroke: "var(--text-3)", "stroke-width": 1.5,
            "stroke-linecap": "round", "stroke-linejoin": "round"
          })
        ]));
      }
    }

    return svgEl("g", {
      "data-type": n.type,
      "data-id": n.id || (n.type === "concept" ? n.topicId : ""),
      "data-topic": n.topicId || n.id || "",
      "data-domain": n.domainId || "",
      style: "cursor:pointer"
    }, children);
  }

  /* ------------------------------------------------------------------ */
  /*  Render principal                                                   */
  /* ------------------------------------------------------------------ */
  function render() {
    var lay = layout();
    var allSvg = [];
    lay.lines.forEach(function (l) { allSvg.push(drawLine(l.x1, l.y1, l.x2, l.y2, l.color)); });
    lay.nodes.forEach(function (n) {
      var h = n.type === "root" ? NODE_H_ROOT
           : n.type === "domain" ? NODE_H_DOM
           : n.type === "topic" ? NODE_H_TOP
           : NODE_H_CON;
      allSvg.push(drawNode(n, nodeW(n), h));
    });

    var svgW = lay.totalW + 20;
    var svgH = lay.totalH;

    var svgContent = svgEl("svg", {
      id: "concept-svg",
      width: svgW,
      height: svgH,
      viewBox: "0 0 " + svgW + " " + svgH,
      style: "display:block;font-family:Inter,system-ui,sans-serif"
    }, allSvg);

    var zoomBtns =
      '<div class="concept-map__zoom">' +
        '<button class="icon-btn concept-map__zoom-btn" data-zoom="in" aria-label="Zoom apropa">+</button>' +
        '<button class="icon-btn concept-map__zoom-btn" data-zoom="reset" aria-label="Restableix zoom">\u2299</button>' +
        '<button class="icon-btn concept-map__zoom-btn" data-zoom="out" aria-label="Zoom allunya">\u2212</button>' +
      "</div>";

    var toolbar =
      '<div class="concept-map__toolbar">' +
        '<button class="btn btn--sm btn--ghost" data-map-action="expand-all">Expandeix tot</button>' +
        '<button class="btn btn--sm btn--ghost" data-map-action="collapse-all">Col\u00b7lapsa tot</button>' +
      "</div>";

    return (
      '<div class="content concept-map">' +
        '<div class="eyebrow">Mapa conceptual</div>' +
        '<div class="flex items-center gap-3 mb-3" style="flex-wrap:wrap">' +
          '<h1 style="margin:0">Mapa conceptual de l\u2019examen</h1>' +
          '<span class="tag">Interactiu</span>' +
        "</div>" +
        '<p class="muted mb-3" style="font-size:var(--fs-sm)">Cada <b>tema</b> mostra els conceptes que hi ha dins. Clic en un <b>domini o tema</b> per expandir/col\u00b7lapsar; clic en un <b>concepte</b> per obrir-ne la teoria. Arrossega per desplaçar.</p>' +
        toolbar +
        '<div class="concept-map__wrap" id="concept-map-wrap">' +
          '<div class="concept-map__pan" id="concept-map-pan">' +
            svgContent +
          "</div>" +
          zoomBtns +
          '<div class="concept-map__legend">' +
            AFP.domains.map(function (d) {
              return '<span class="concept-map__legend-item"><span class="concept-map__legend-dot" style="background:' + (THEME_COLORS[d.color] || THEME_COLORS.accent) + '"></span>' + d.code + "</span>";
            }).join("") +
            '<span class="concept-map__legend-item"><span class="concept-map__legend-dot" style="background:var(--teal)"></span>Completat</span>' +
          "</div>" +
        "</div>" +
      "</div>");
  }

  /* ------------------------------------------------------------------ */
  /*  Post-render — event handlers                                      */
  /* ------------------------------------------------------------------ */
  function rerenderMain() {
    var main = document.querySelector(".main__body");
    if (main) { main.innerHTML = render(); postRender(); }
  }

  function postRender() {
    var wrap = document.getElementById("concept-map-wrap");
    var pan  = document.getElementById("concept-map-pan");
    if (!wrap || !pan) return;

    scale = 1; tx = 0; ty = 0;

    // Desktop: escala inicial perquè càpiga tota l'amplada (es pot fer zoom després)
    if (window.innerWidth > 720) {
      var svgElFit = pan.querySelector("svg");
      if (svgElFit) {
        var fit = (wrap.clientWidth - 24) / parseFloat(svgElFit.getAttribute("width"));
        scale = Math.max(0.55, Math.min(1, fit));
      }
    }
    applyTransform(pan);

    // --- Navegació: clic en node ---
    pan.addEventListener("click", function (e) {
      if (suppressClick) { suppressClick = false; return; }
      if (drag && drag.moved) return;
      var g = e.target.closest("[data-type]");
      if (!g) return;
      var type = g.getAttribute("data-type");

      if (type === "concept") {
        var did = g.getAttribute("data-domain");
        var tid = g.getAttribute("data-topic");
        if (did && tid) window.location.hash = "#/teoria/" + did + "/" + tid;
      } else if (type === "topic") {
        var gId = g.getAttribute("data-id");
        var tDomain = g.getAttribute("data-domain");
        var dObj = AFP.util.getDomain(parseInt(tDomain, 10));
        var tpObj = null;
        if (dObj) {
          for (var i = 0; i < dObj.topics.length; i++) {
            if (String(dObj.topics[i].id) === String(gId)) { tpObj = dObj.topics[i]; break; }
          }
        }
        if (tpObj && topicConcepts(theoryTopic(tDomain, tpObj.id) || {}).length > 0) {
          topicCollapsed[gId] = !topicCollapsed[gId];
          rerenderMain();
          return;
        }
        if (tDomain && gId) window.location.hash = "#/teoria/" + tDomain + "/" + gId;
      } else if (type === "domain") {
        var domId = g.getAttribute("data-id");
        if (domId) {
          domCollapsed[domId] = !domCollapsed[domId];
          rerenderMain();
        }
      }
    });

    // --- Botons toolbar ---
    var toolbarBtns = document.querySelectorAll("[data-map-action]");
    toolbarBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.getAttribute("data-map-action");
        AFP.domains.forEach(function (dd) {
          dd.topics.forEach(function (tp) {
            if (action === "expand-all") topicCollapsed[tp.id] = false;
            else topicCollapsed[tp.id] = true;
          });
        });
        if (action === "collapse-all") { scale = 1; tx = 0; ty = 0; }
        rerenderMain();
      });
    });

    // --- Zoom buttons ---
    wrap.querySelectorAll("[data-zoom]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.getAttribute("data-zoom");
        if (action === "in")       scale = Math.min(2.5, scale * 1.25);
        else if (action === "out") scale = Math.max(0.25, scale / 1.25);
        else { scale = 1; tx = 0; ty = 0; }
        applyTransform(pan);
      });
    });

    // --- Pan: mouse ---
    wrap.addEventListener("mousedown", function (e) {
      if (e.button !== 0) return;
      drag = { sx: e.clientX, sy: e.clientY, otx: tx, oty: ty, moved: false };
      wrap.style.cursor = "grabbing";
    });
    if (!windowBound) {
      windowBound = true;
      window.addEventListener("mousemove", onWinMove);
      window.addEventListener("mouseup", onWinUp);
    }

    // --- Pan: touch ---
    wrap.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      var t = e.touches[0];
      drag = { sx: t.clientX, sy: t.clientY, otx: tx, oty: ty, moved: false };
    }, { passive: true });
    wrap.addEventListener("touchmove", function (e) {
      if (!drag || e.touches.length !== 1) return;
      var t = e.touches[0];
      var dx = t.clientX - drag.sx;
      var dy = t.clientY - drag.sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
      tx = drag.otx + dx;
      ty = drag.oty + dy;
      applyTransform(pan);
    }, { passive: true });
    wrap.addEventListener("touchend", function () {
      if (drag && drag.moved) { suppressClick = true; setTimeout(function () { suppressClick = false; }, 120); }
      drag = null;
    });

    // --- Zoom: scroll wheel ---
    wrap.addEventListener("wheel", function (e) {
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.1 : 0.9;
      scale = Math.min(2.5, Math.max(0.25, scale * factor));
      applyTransform(pan);
    }, { passive: false });
  }

  function applyTransform(el) {
    el.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    el.style.transformOrigin = "0 0";
  }

  return { view: render, postRender: postRender };
})();