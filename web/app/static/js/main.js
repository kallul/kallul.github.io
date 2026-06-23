document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupCounters();
  loadSkills();
  loadProjects();
  setupContactForm();
});

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
  const els = document.querySelectorAll(".stat-num[data-target]");
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target, parseInt(e.target.dataset.target, 10), 1600);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

function countUp(el, end, duration) {
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * end);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = end;
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
