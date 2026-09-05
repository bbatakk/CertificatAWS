window.AFP = window.AFP || {};

/* ==========================================================================
   Router (hash-based) + renderitzat del shell
   ========================================================================== */
AFP.router = (function () {
  var routes = [];
  var fallback = null;
  var current = null;

  function register(path, handler) {
    var clean = path.replace(/^#/, "").replace(/^\/+/, "").replace(/\/+$/, "");
    var keys = [];
    var segs = clean.split("/").filter(function (s) { return s.length > 0; });
    var parts = segs.map(function (seg) {
      if (seg.charAt(0) === ":") { keys.push(seg.slice(1)); return { param: seg.slice(1) }; }
      return { literal: seg };
    });
    routes.push({ parts: parts, keys: keys, handler: handler, raw: path });
  }

  function setFallback(handler) {
    fallback = handler;
  }

  function resolve(hash) {
    var clean = (hash || "#/").replace(/^#/, "");
    var segs = clean.split("/").filter(function (s) { return s.length > 0; });

    for (var i = 0; i < routes.length; i++) {
      var parts = routes[i].parts;
      if (parts.length !== segs.length) continue;
      var params = {};
      var ok = true;
      for (var j = 0; j < parts.length; j++) {
        var p = parts[j];
        if (p.literal !== undefined) {
          if (p.literal !== segs[j]) { ok = false; break; }
        } else {
          params[p.param] = decodeURIComponent(segs[j]);
        }
      }
      if (ok) return { route: routes[i], params: params };
    }
    return null;
  }

  function go(hash) {
    window.location.hash = hash;
  }

  function navigate(path) {
    go(path);
  }

  function render() {
    var hash = window.location.hash || "#/";
    var res = resolve(hash);
    var handler = res ? res.route.handler : fallback;
    current = res;
    return handler ? handler(res ? res.params : {}, res ? res.rest : null) : "";
  }

  function currentRoute() {
    return current;
  }

  window.addEventListener("hashchange", function () {
    var app = document.querySelector(".app");
    if (!app) return;
    var main = app.querySelector(".main__body");
    if (main) {
      main.innerHTML = render();
      AFP.app.postRender();
      window.scrollTo(0, 0);
    }
    closeSidebar();
  });

  function closeSidebar() {
    var sb = document.querySelector(".sidebar");
    var bd = document.querySelector(".sidebar-backdrop");
    if (sb) sb.classList.remove("is-open");
    if (bd) bd.classList.remove("is-open");
  }

  return {
    register: register,
    setFallback: setFallback,
    go: go,
    navigate: navigate,
    render: render,
    currentRoute: currentRoute
  };
})();
