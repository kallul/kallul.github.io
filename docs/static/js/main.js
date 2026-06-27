document.addEventListener("DOMContentLoaded", () => {
  injectStatsSvgDefs();
  initStatsBg();
  setupNavbar();
  setupCounters();
  loadSkills();
  loadProjects();
  loadGallery();
  setupContactForm();
});

/* ─── Hero Skills Node Map ───────────────────────────────────── */
function initHeroNodes() {
  const col    = document.getElementById("heroSkillsCol");
  const canvas = document.getElementById("heroSkillsCanvas");
  if (!col || !canvas) return;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const ctx  = canvas.getContext("2d");
  let W, H, raf;

  function resize() {
    W = col.offsetWidth  || 320;
    H = col.offsetHeight || 420;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", () => { resize(); });

  /* ── Node definitions ─────────────────────────────────────── */
  const NODES = [
    { key:"center", line1:"AI",        line2:"Engineer",  sublabel:null,
      c1:"#057aff", c2:"#0050cc", glow:"#60b0ff", r:58, angle:0.5 },
    { key:"top",    line1:"LLM",       line2:"& Agents",  sublabel:null,
      c1:"#d45a10", c2:"#8a2800", glow:"#ff9960", r:40, angle:0.0 },
    { key:"right",  line1:"Full",      line2:"Stack",     sublabel:null,
      c1:"#b08800", c2:"#705400", glow:"#ffd060", r:40, angle:0.0 },
    { key:"bottom", line1:"DevOps",    line2:"& Cloud",   sublabel:null,
      c1:"#1870c8", c2:"#0a3878", glow:"#60b8ff", r:40, angle:0.0 },
    { key:"left",   line1:"Team",      line2:"Lead",      sublabel:null,
      c1:"#a02888", c2:"#5a0850", glow:"#ff80cc", r:40, angle:0.0 },
  ];

  /* ── Dot particles on connections (center ↔ each satellite) ── */
  const CONNS = [1, 2, 3, 4].map(i => ({ from:0, to:i }));
  const dots  = CONNS.flatMap(c => [
    { conn:c, t:Math.random(), spd:0.005+Math.random()*0.004, dir: 1 },
    { conn:c, t:Math.random(), spd:0.003+Math.random()*0.004, dir:-1 },
  ]);

  /* ── Floating background particles ───────────────────────── */
  const bgDots = Array.from({length:55}, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random()*1.4 + 0.3,
    vx:(Math.random()-0.5)*0.00015,
    vy:(Math.random()-0.5)*0.00015,
    ph:Math.random()*Math.PI*2,
    hue: Math.random()<0.3 ? 210 : (Math.random()<0.5 ? 195 : 0),
  }));

  let tick = 0;

  /* ── Layout helpers ─────────────────────────────────────── */
  function pos(key) {
    const cx = W/2, cy = H/2;
    const vd = Math.min(H, 340) * 0.305;
    const hd = Math.min(W, 320) * 0.295;
    switch (key) {
      case "center": return { x:cx,      y:cy      };
      case "top":    return { x:cx,      y:cy - vd };
      case "right":  return { x:cx + hd, y:cy      };
      case "bottom": return { x:cx,      y:cy + vd };
      case "left":   return { x:cx - hd, y:cy      };
    }
  }

  function hex(cx, cy, r, rot=0) {
    ctx.beginPath();
    for (let i=0; i<6; i++) {
      const a = (i * Math.PI / 3) + rot;
      i===0 ? ctx.moveTo(cx+r*Math.cos(a), cy+r*Math.sin(a))
            : ctx.lineTo(cx+r*Math.cos(a), cy+r*Math.sin(a));
    }
    ctx.closePath();
  }

  /* ── Draw a single node ─────────────────────────────────── */
  function drawNode(n, idx) {
    const p     = pos(n.key);
    const pulse = 1 + 0.028 * Math.sin(tick * 0.038 + idx * 1.35);
    const r     = n.r * pulse;
    const rot   = (n.key==="center") ? tick * 0.006 : 0;

    // Outer glow shadow
    ctx.save();
    ctx.shadowColor = n.glow;
    ctx.shadowBlur  = 24 + 10 * Math.sin(tick * 0.05 + idx);

    // Fill gradient (radial, offset to top-left for 3-D feel)
    const gr = ctx.createRadialGradient(p.x - r*0.25, p.y - r*0.3, 0, p.x, p.y, r*1.15);
    gr.addColorStop(0, n.c1);
    gr.addColorStop(1, n.c2);
    hex(p.x, p.y, r, rot);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Outer border
    hex(p.x, p.y, r, rot);
    ctx.strokeStyle = n.glow + "99";
    ctx.lineWidth   = n.key==="center" ? 2.5 : 1.8;
    ctx.stroke();

    // Inner glass highlight (smaller hex, top-left offset)
    hex(p.x - r*0.1, p.y - r*0.12, r * 0.78, rot + 0.15);
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth   = 1;
    ctx.stroke();

    ctx.restore();

    /* ── Text inside hex ──────────────────────────────────── */
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";

    if (n.key === "center") {
      // Top text: "AI"
      ctx.font      = "bold 22px Arial, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(n.line1, p.x, p.y - 11);
      // Bottom text: "Engineer"
      ctx.font      = "bold 13px Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.88)";
      ctx.fillText(n.line2, p.x, p.y + 9);
      // Tiny label under that
      ctx.font      = "9px Arial, sans-serif";
      ctx.fillStyle = "rgba(220,200,255,0.7)";
      ctx.fillText("Python · ML · DevOps", p.x, p.y + 26);
    } else {
      ctx.font      = "bold 13px Arial, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(n.line1, p.x, p.y - 8);
      ctx.font      = "11px Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.fillText(n.line2, p.x, p.y + 8);
    }

    /* ── External label (outside the hex, like reference img) ── */
    if (n.sublabel) {
      ctx.font      = "10px Arial, sans-serif";
      ctx.fillStyle = "rgba(60,20,120,0.88)";
      let lx = p.x, ly = p.y;
      ctx.textAlign = "center";

      if (n.key === "top")    { ly = p.y - r*pulse - 14; }
      if (n.key === "bottom") { ly = p.y + r*pulse + 14; }
      if (n.key === "right")  {
        lx = p.x;
        ly = p.y - r*pulse - 14;
        ctx.textAlign = "center";
      }
      if (n.key === "left") {
        lx = p.x;
        ly = p.y - r*pulse - 14;
        ctx.textAlign = "center";
      }

      // Small dot connector
      ctx.beginPath();
      ctx.arc(lx, ly + (n.key==="bottom"?-7:7), 2.5, 0, Math.PI*2);
      ctx.fillStyle = n.glow + "bb";
      ctx.fill();
      ctx.fillStyle = "rgba(60,20,120,0.78)";
      ctx.fillText(n.sublabel, lx, ly + (n.key==="bottom"?14:-6));
    }
  }

  /* ── Draw connection lines ──────────────────────────────── */
  function drawConnections() {
    for (const c of CONNS) {
      const from = pos(NODES[c.from].key);
      const to   = pos(NODES[c.to].key);

      const dx = to.x - from.x, dy = to.y - from.y;
      const D  = Math.hypot(dx, dy);
      const ux = dx/D, uy = dy/D;

      const rFrom = NODES[c.from].r * (1 + 0.028 * Math.sin(tick*0.038));
      const rTo   = NODES[c.to].r   * (1 + 0.028 * Math.sin(tick*0.038 + c.to*1.35));

      const sx = from.x + ux*rFrom, sy = from.y + uy*rFrom;
      const ex = to.x   - ux*rTo,   ey = to.y   - uy*rTo;

      // Gradient line
      const lg = ctx.createLinearGradient(sx, sy, ex, ey);
      lg.addColorStop(0,   NODES[c.from].glow + "55");
      lg.addColorStop(0.5, "rgba(170,130,255,0.35)");
      lg.addColorStop(1,   NODES[c.to].glow   + "55");

      ctx.save();
      ctx.setLineDash([5, 7]);
      ctx.strokeStyle = lg;
      ctx.lineWidth   = 1.6;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.setLineDash([]);

      // Endpoint anchor dots
      for (const [ax, ay, nodeIdx] of [[sx,sy,c.from],[ex,ey,c.to]]) {
        ctx.beginPath();
        ctx.arc(ax, ay, 3.5, 0, Math.PI*2);
        ctx.fillStyle = NODES[nodeIdx].glow + "cc";
        ctx.shadowColor = NODES[nodeIdx].glow;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
      ctx.restore();
    }
  }

  /* ── Traveling dot particles on lines ──────────────────── */
  function drawDots() {
    for (const p of dots) {
      p.t += p.spd * p.dir;
      if (p.t > 1) p.t = 0;
      if (p.t < 0) p.t = 1;

      const from = pos(NODES[p.conn.from].key);
      const to   = pos(NODES[p.conn.to].key);
      const dx = to.x-from.x, dy = to.y-from.y, D = Math.hypot(dx,dy);
      const ux=dx/D, uy=dy/D;
      const rf = NODES[p.conn.from].r, rt = NODES[p.conn.to].r;
      const sx=from.x+ux*rf, sy=from.y+uy*rf;
      const ex=to.x-ux*rt,   ey=to.y-uy*rt;

      const x = sx + (ex-sx)*p.t;
      const y = sy + (ey-sy)*p.t;

      const col = p.dir>0 ? NODES[p.conn.to].glow : NODES[p.conn.from].glow;
      ctx.save();
      ctx.shadowColor = col;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI*2);
      const dg = ctx.createRadialGradient(x,y,0,x,y,4);
      dg.addColorStop(0, "#ffffff");
      dg.addColorStop(1, col);
      ctx.fillStyle = dg;
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Floating background particles ─────────────────────── */
  function drawBg() {
    for (const p of bgDots) {
      p.x  += p.vx; p.y += p.vy;
      if (p.x<0) p.x=1; if (p.x>1) p.x=0;
      if (p.y<0) p.y=1; if (p.y>1) p.y=0;
      p.ph += 0.018;
      const a = (0.18 + 0.18*Math.abs(Math.sin(p.ph)));
      ctx.globalAlpha = a;
      const col = p.hue===210 ? "#60aaff" : p.hue===195 ? "#80d0ff" : "#ffffff";
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ── Main render loop ───────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    drawBg();
    drawConnections();
    drawDots();

    // Satellites first, then center on top
    for (let i=1; i<NODES.length; i++) drawNode(NODES[i], i);
    drawNode(NODES[0], 0);

    tick++;
    raf = requestAnimationFrame(draw);
  }

  draw();
}

/* ─── Stats: inject SVG gradient definition ─────────────────── */
function injectStatsSvgDefs() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.cssText = "position:absolute;overflow:hidden;width:0;height:0";
  svg.innerHTML = `
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#57b0ff"/>
        <stop offset="50%"  stop-color="#057aff"/>
        <stop offset="100%" stop-color="#0050cc"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
}

/* ─── Stats: floating particle canvas background ────────────── */
function initStatsBg() {
  const section = document.querySelector(".stats-section");
  if (!section) return;

  const canvas = document.createElement("canvas");
  canvas.className = "stats-canvas";
  section.prepend(canvas);

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const ctx  = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = section.offsetWidth  || 800;
    H = section.offsetHeight || 160;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function newBubble() {
    return {
      x:    Math.random() * (W || 800),
      y:    (H || 160) + Math.random() * 30,  // spawn below bottom
      maxR: Math.random() * 5 + 4,             // 4–9 px at base
      vy:  -(Math.random() * 0.45 + 0.2),      // float upward
      vx:   (Math.random() - 0.5) * 0.12,
    };
  }

  const particles = Array.from({ length: 45 }, newBubble);

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Reset to bottom once fully off the top
      if (p.y < -p.maxR * 2) Object.assign(p, newBubble());
      if (p.x < -p.maxR)     p.x = W + p.maxR;
      if (p.x > W + p.maxR)  p.x = -p.maxR;

      // progress: 1 at bottom → 0 at top
      const progress = Math.max(0, Math.min(1, p.y / H));
      const r = p.maxR * progress;
      if (r < 0.5) continue;

      const alpha = progress * 0.75;

      // Filled bubble
      ctx.globalAlpha = alpha * 0.45;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#00d2ff";
      ctx.fill();

      // Bubble ring
      ctx.globalAlpha = alpha * 0.9;
      ctx.lineWidth   = 1.5;
      ctx.strokeStyle = "#00d2ff";
      ctx.stroke();

      // White highlight for 3-D look
      ctx.globalAlpha = alpha * 0.55;
      ctx.beginPath();
      ctx.arc(p.x - r * 0.3, p.y - r * 0.35, r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
}

/* ─── Navbar: shadow + active link highlight ────────────────── */
function setupNavbar() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const tick = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);

    const sections = document.querySelectorAll("section[id], div[id='experience']");
    const links    = document.querySelectorAll(".navbar-nav .nav-link");
    let current    = "";

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
    });

    links.forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `/#${current}` || href === `#${current}`);
    });
  };

  window.addEventListener("scroll", tick, { passive: true });
  tick();
}

/* ─── Stats counter animation ───────────────────────────────── */
function setupCounters() {
  const cols = document.querySelectorAll(".stat-col");
  if (!cols.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);

      const col   = e.target;
      const idx   = Array.from(cols).indexOf(col);
      const delay = idx * 160;

      setTimeout(() => {
        // 1. Animate the SVG ring fill
        const ring = col.querySelector(".stat-ring-fill");
        if (ring) ring.classList.add("ring-animated");

        // 2. Count up the number, mark done when finished
        const numEl = col.querySelector(".stat-num");
        if (numEl) {
          countUp(numEl, parseInt(numEl.dataset.target, 10), 1700, () => {
            col.classList.add("counted");  // triggers orbit + glow
          });
        }
      }, delay);
    });
  }, { threshold: 0.35 });

  cols.forEach(col => io.observe(col));
}

function countUp(el, end, duration, onDone) {
  const t0 = performance.now();
  (function step(now) {
    const p      = Math.min((now - t0) / duration, 1);
    const eased  = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * end);
    if (p < 1) requestAnimationFrame(step);
    else { el.textContent = end; if (onDone) onDone(); }
  })(t0);
}

/* ─── Skills ────────────────────────────────────────────────── */
async function loadSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  try {
    const res = await fetch("/api/v1/skills/");
    if (!res.ok) throw new Error();
    const skills = await res.json();

    if (!skills.length) {
      grid.innerHTML = "<p class='col-12 text-center py-4' style='color:var(--text)'>No skills added yet.</p>";
      return;
    }

    // Group by category
    const groups = {};
    skills.forEach(s => (groups[s.category] = groups[s.category] || []).push(s));

    grid.innerHTML = Object.entries(groups).map(([cat, items]) => `
      <div class="col-lg-6 mb-4">
        <p class="skill-cat-label">${cat}</p>
        ${items.map(s => {
          const pct = s.proficiency * 20;
          return `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${pct}%</span>
            </div>
            <div class="skill-track">
              <div class="skill-fill" data-w="${pct}"></div>
            </div>
          </div>`;
        }).join("")}
      </div>
    `).join("");

    // Animate bars on scroll
    const bars = document.querySelectorAll(".skill-fill[data-w]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.width = e.target.dataset.w + "%";
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    bars.forEach(b => io.observe(b));

  } catch {
    grid.innerHTML = "<p class='col-12 text-center py-4 text-danger'>Failed to load skills.</p>";
  }
}

/* ─── Projects ───────────────────────────────────────────────── */
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  try {
    const res = await fetch("/api/v1/projects/");
    if (!res.ok) throw new Error();
    const projects = await res.json();

    if (!projects.length) {
      grid.innerHTML = "<p class='col-12 text-center py-4' style='color:var(--text)'>No projects added yet.</p>";
      return;
    }

    grid.innerHTML = projects.map(p => {
      const tags  = p.tech_stack.map(t => `<span class="proj-tag">${t}</span>`).join("");
      const meta  = [p.company, (p.year_start && p.year_end ? `${p.year_start} – ${p.year_end}` : p.year_start)]
                      .filter(Boolean).join(" · ");
      const links = `
        ${p.github_url ? `<a href="${p.github_url}" class="btn-proj" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>` : ""}
        ${p.live_url   ? `<a href="${p.live_url}"   class="btn-proj" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live</a>` : ""}
      `;

      if (p.image_url) {
        return `
        <div class="col-md-6 col-lg-4">
          <div class="proj-card-img">
            <img src="${p.image_url}" alt="${p.title}" loading="lazy" />
            <div class="proj-body">
              ${p.category ? `<span class="proj-category">${p.category}</span>` : ""}
              <span class="proj-name">${p.title}</span>
              ${meta ? `<div class="proj-meta">${meta}</div>` : ""}
              <p class="proj-desc">${p.description}</p>
              <div class="proj-tags">${tags}</div>
              <div>${links}</div>
            </div>
          </div>
        </div>`;
      }

      return `
      <div class="col-md-6 col-lg-4">
        <div class="proj-card">
          ${p.category ? `<span class="proj-category">${p.category}</span>` : ""}
          <span class="proj-name">${p.title}</span>
          ${meta ? `<div class="proj-meta">${meta}</div>` : ""}
          <p class="proj-desc">${p.description}</p>
          <div class="proj-tags mb-2">${tags}</div>
          <div>${links}</div>
        </div>
      </div>`;
    }).join("");

  } catch {
    grid.innerHTML = "<p class='col-12 text-center py-4 text-danger'>Failed to load projects.</p>";
  }
}

/* ─── Product Gallery (marquee) ─────────────────────────────── */
async function loadGallery() {
  const loading = document.getElementById("gallery-loading");
  const track1  = document.getElementById("marquee-track-1");
  const track2  = document.getElementById("marquee-track-2");
  if (!track1 || !track2) return;

  try {
    const res = await fetch("/api/v1/gallery/");
    if (!res.ok) throw new Error();
    const items = await res.json();

    if (loading) loading.remove();

    if (!items.length) {
      // Show placeholder cards so the section doesn't look empty
      const placeholders = Array.from({ length: 8 }, (_, i) => `
        <div class="gallery-placeholder">
          <span><i class="fas fa-image me-2"></i>UI ${i + 1}</span>
        </div>`).join("");
      track1.innerHTML = placeholders;
      track2.innerHTML = placeholders;
      return;
    }

    const makeCard = item => `
      <div class="gallery-thumb">
        <img src="${item.image_url}" alt="${item.title}"
             onerror="this.parentElement.style.background='var(--primary-light)';this.style.display='none';" />
        <div class="gallery-thumb-label">${item.title}</div>
      </div>`;

    const html = items.map(makeCard).join("");
    // Duplicate for seamless loop
    track1.innerHTML = html + html;
    track2.innerHTML = html + html;

  } catch {
    if (loading) loading.innerHTML = "<p class='text-danger'>Failed to load gallery.</p>";
  }
}

/* ─── Contact form ───────────────────────────────────────────── */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const feedback = document.getElementById("form-feedback");
    const btn = form.querySelector(".btn-send");
    btn.disabled = true;
    btn.textContent = "Sending…";

    try {
      const res = await fetch("/api/v1/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    document.getElementById("name").value,
          email:   document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
        }),
      });
      const data = await res.json();
      feedback.innerHTML = `<div class="alert alert-success mt-3">${data.message}</div>`;
      form.reset();
    } catch {
      feedback.innerHTML = `<div class="alert alert-danger mt-3">Failed to send. Please try again.</div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
}
