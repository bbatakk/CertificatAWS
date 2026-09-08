window.AFP = window.AFP || {};

/* ==========================================================================
   Mapa conceptual interactiu — SVG mind map de tota la teoria
   ========================================================================== */
AFP.conceptMap = (function () {
  /* ---- constants de disseny ---- */
  var TOPIC_GAP = 34;
  var PADDING_Y = 50;
  var COL = { root: 60, domain: 330, topic: 620 };
  var NODE_W = 210;
  var NODE_H_ROOT = 54;
  var NODE_H_DOM = 50;
  var NODE_H_TOP = 34;
  var THEME_COLORS = {
    accent: "#ff9900",
    violet: "#a78bfa",
    teal:   "#3dd6c3",
    warn:   "#ffb020",
    blue:   "#5aa7ff"
  };

  var collapsed = {};   // domini id → bool
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
  /*  Layout — calcula posicions de tots els nodes                     */
  /* ------------------------------------------------------------------ */
  function layout() {
    var domains = AFP.domains;
    var SLOT_GAP = 28;   // separació mínima entre dominis
    var nodes = [];
    var lines = [];

    // ---- Passa 1: col·loca y dels topics i calcula els slots dels dominis
    var cursor = PADDING_Y;
    domains.forEach(function (d) {
      var isColl = !!collapsed[d.id];
      d._collapsed = isColl;
      if (isColl) {
        d._slotTop = cursor;
        d._slotH = NODE_H_DOM;
        cursor += d._slotH;
      } else {
        d.topics.forEach(function (tp) {
          tp._y = cursor + NODE_H_TOP / 2;
          cursor += TOPIC_GAP;
        });
        d._slotTop = d.topics[0]._y - NODE_H_TOP / 2;
        d._slotH = (d.topics.length * TOPIC_GAP) - TOPIC_GAP + NODE_H_TOP;
      }
      cursor += SLOT_GAP;
    });

    var totalH = cursor - SLOT_GAP + PADDING_Y;
    var rootY = totalH / 2;

    // ---- Passa 2: nodes i línies
    nodes.push({
      type: "root",
      label: "AIF-C01",
      label2: "AWS Certified AI Practitioner",
      x: 0, y: rootY - NODE_H_ROOT / 2,
      color: "var(--accent)"
    });

    domains.forEach(function (d) {
      var color = THEME_COLORS[d.color] || THEME_COLORS.accent;
      var centerLine = d._slotTop + d._slotH / 2;
      var nTopics = d.topics.length;

      if (!d._collapsed) {
        d.topics.forEach(function (tp) {
          var done = AFP.store.getProgress()[tp.id] === true;
          nodes.push({
            type: "topic",
            domainId: d.id,
            topicId: tp.id,
            label: tp.id + "  " + tp.titleCa,
            x: COL.topic,
            y: tp._y - NODE_H_TOP / 2,
            color: color,
            done: done,
            weight: d.weight
          });
        });
      }

      nodes.push({
        type: "domain",
        domainId: d.id,
        label: d.code + "  " + d.nameCa,
        label2: d.weight + "%  ·  " + nTopics + " temes",
        x: COL.domain,
        y: centerLine - NODE_H_DOM / 2,
        color: color,
        nTopics: nTopics
      });

      // Línia root → domini
      lines.push({
        x1: COL.root + NODE_W + 30,
        y1: rootY,
        x2: COL.domain - 8,
        y2: centerLine,
        color: color
      });

      // Línies domini → topic
      if (!d._collapsed) {
        d.topics.forEach(function (tp) {
          lines.push({
            x1: COL.domain + NODE_W + 8,
            y1: centerLine,
            x2: COL.topic - 8,
            y2: tp._y,
            color: color
          });
        });
      }
    });

    return { nodes: nodes, lines: lines, totalH: totalH, totalW: COL.topic + NODE_W + 40 };
  }

  /* ------------------------------------------------------------------ */
  /*  SVG helpers                                                       */
  /* ------------------------------------------------------------------ */
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

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
      "stroke-opacity": "0.35"
    });
  }

  function drawNode(n, w, h) {
    var children = [];
    var x = n.x, y = n.y;

    // Fons
    children.push(svgEl("rect", {
      x: x, y: y, width: w, height: h,
      rx: n.type === "root" ? 12 : 8,
      fill: n.type === "root" ? "var(--accent-soft)" : "var(--surface)",
      stroke: n.type === "root" ? "var(--accent)" : "var(--border)",
      "stroke-width": n.type === "root" ? 2 : 1
    }));

    // Punt de color
    var dotR = n.type === "root" ? 5 : 3;
    var dotX = x + 14, dotY = y + h / 2;
    children.push(svgEl("circle", {
      cx: dotX, cy: dotY, r: dotR,
      fill: n.color || "var(--accent)"
    }));

    // Etiqueta principal
    var txtX = x + 22, txtY = y + (n.label2 ? h / 2 - 5 : h / 2 + 1);
    var fontSize = n.type === "root" ? 13 : n.type === "domain" ? 11.5 : 10.5;
    var fontWeight = n.type === "root" ? 700 : n.type === "domain" ? 600 : 400;
    children.push(svgEl("text", {
      x: txtX, y: txtY,
      fill: "var(--text)",
      "font-size": fontSize,
      "font-weight": fontWeight,
      "font-family": "Inter, system-ui, sans-serif",
      "dominant-baseline": "middle"
    }, [esc(n.label)]));

    // Etiqueta secundària
    if (n.label2) {
      children.push(svgEl("text", {
        x: txtX, y: y + h / 2 + 9,
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

    // Indicador de col·lapsable (domini amb temes)
    if (n.type === "domain" && n.nTopics > 0) {
      var arrowX = x + w - 16, arrowY = y + h / 2;
      var isColl = collapsed[n.domainId];
      var angle = isColl ? 0 : 90;
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

    return svgEl("g", {
      "data-type": n.type,
      "data-id": n.type === "topic" ? n.topicId : (n.domainId || ""),
      "data-topic": n.topicId || "",
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
      var w = n.type === "root" ? NODE_W + 30 : NODE_W;
      var h = n.type === "root" ? NODE_H_ROOT : n.type === "domain" ? NODE_H_DOM : NODE_H_TOP;
      allSvg.push(drawNode(n, w, h));
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
        '<button class="icon-btn concept-map__zoom-btn" data-zoom="reset" aria-label="Restableix zoom">⊙</button>' +
        '<button class="icon-btn concept-map__zoom-btn" data-zoom="out" aria-label="Zoom allunya">−</button>' +
      "</div>";

    return (
      '<div class="content concept-map">' +
        '<div class="eyebrow">Mapa conceptual</div>' +
        '<div class="flex items-center gap-3 mb-3" style="flex-wrap:wrap">' +
          '<h1 style="margin:0">Mapa conceptual de l\u2019examen</h1>' +
          '<span class="tag">Interactiu</span>' +
        "</div>" +
        '<p class="muted mb-4" style="font-size:var(--fs-sm)">Clic en un <b>domini</b> per expandir/col·lapsar. Clic en un <b>tema</b> per anar a la teoria. Arrossega per desplaçar.</p>' +
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
  function postRender() {
    var wrap = document.getElementById("concept-map-wrap");
    var pan  = document.getElementById("concept-map-pan");
    if (!wrap || !pan) return;

    scale = 1; tx = 0; ty = 0;
    applyTransform(pan);

    // --- Navegació: clic en tema → enllaç a teoria ---
    pan.addEventListener("click", function (e) {
      if (suppressClick) { suppressClick = false; return; }
      if (drag && drag.moved) return;
      var g = e.target.closest("[data-type]");
      if (!g) return;
      var type = g.getAttribute("data-type");
      if (type === "topic") {
        var did = g.getAttribute("data-domain");
        var tid = g.getAttribute("data-topic");
        window.location.hash = "#/teoria/" + did + "/" + tid;
      } else if (type === "domain") {
        var domId = g.getAttribute("data-id");
        if (domId) {
          collapsed[domId] = !collapsed[domId];
          var main = document.querySelector(".main__body");
          if (main) { main.innerHTML = render(); postRender(); }
        }
      }
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
