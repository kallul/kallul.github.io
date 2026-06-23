
/* ── Static data embedded at build time ──────────────────────── */
const STATIC_SKILLS   = [
  {
    "id": null,
    "name": "Python",
    "category": "Backend & APIs",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "FastAPI",
    "category": "Backend & APIs",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "Django",
    "category": "Backend & APIs",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "Flask",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "GraphQL",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "WebSockets",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "SQLAlchemy",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Numpy",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Pandas",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Scikit-learn",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Plotly",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Dash",
    "category": "Backend & APIs",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Vue.js",
    "category": "Frontend",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "React.js",
    "category": "Frontend",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "HTML",
    "category": "Frontend",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "CSS",
    "category": "Frontend",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "Bootstrap",
    "category": "Frontend",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "Django Rest Template",
    "category": "Frontend",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Jinja2",
    "category": "Frontend",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Streamlit",
    "category": "Frontend",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "AWS (Lambda, ECS, S3)",
    "category": "Cloud & DevOps",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "Docker",
    "category": "Cloud & DevOps",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "CI/CD (GitLab/GitHub Actions)",
    "category": "Cloud & DevOps",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "Azure",
    "category": "Cloud & DevOps",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "MongoDB",
    "category": "Databases",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "MS SQL Server",
    "category": "Databases",
    "proficiency": 5
  },
  {
    "id": null,
    "name": "PostgreSQL",
    "category": "Databases",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "MySQL",
    "category": "Databases",
    "proficiency": 4
  },
  {
    "id": null,
    "name": "SQLite",
    "category": "Databases",
    "proficiency": 4
  }
];
const STATIC_PROJECTS = [
  {
    "id": "6a3aeddb434879f98092eb68",
    "title": "FIFA World Cup 2026 Analytics Platform",
    "description": "Full-stack sports analytics platform delivering real-time tournament data, match insights, and interactive user experiences. Integrated AI-driven prediction and analytics for simulation-based forecasting, intelligent data visualisation, and advanced tournament insights.",
    "tech_stack": [
      "FastAPI",
      "ReactJS",
      "MongoDB",
      "AWS EC2",
      "AWS S3",
      "CloudFront",
      "AWS Lambda",
      "CloudWatch"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "Silent Hawk Unipessoal Lda",
    "year_start": "2026",
    "year_end": "Present",
    "category": "AI / Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb69",
    "title": "Stock Assistant — Investment Research RAG",
    "description": "FastAPI-based Investment Research Assistant combining structured stock market data with unstructured financial documents via RAG architecture. Hybrid query orchestration fuses SQL analytics with Qdrant vector similarity search. Text-to-SQL pipeline converts natural language queries into validated SQL. Supports OpenAI and Ollama with configurable provider selection.",
    "tech_stack": [
      "FastAPI",
      "SQLite",
      "Qdrant",
      "OpenAI",
      "Ollama",
      "Docker",
      "Docker Compose",
      "Python"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "Silent Hawk Unipessoal Lda",
    "year_start": "2026",
    "year_end": "Present",
    "category": "AI / LLM"
  },
  {
    "id": "6a3aeddb434879f98092eb6a",
    "title": "VaultShare — Secure File-Sharing Platform",
    "description": "Google Drive–like file-sharing platform with fine-grained permissions, comprehensive audit logs, real-time notifications, Full-Text Search, Storage Quota management, and an integrated ChatBot. Backend built with Python Django; frontend with Vue.js; core database MongoDB.",
    "tech_stack": [
      "Django",
      "Vue.js",
      "MongoDB",
      "Python"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "Silent Hawk Unipessoal Lda",
    "year_start": "2026",
    "year_end": "Present",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb6b",
    "title": "AgriMate AI — Generative AI Platform",
    "description": "Closed-loop Generative AI platform for agriculture that elevates business efficiency, maintains data privacy, and pioneers environmental sustainability. Built REST APIs with Django DRF and FastAPI, ReactJS frontend, deployed on AWS with full CI/CD pipeline.",
    "tech_stack": [
      "Django DRF",
      "FastAPI",
      "ReactJS",
      "Celery",
      "Redis",
      "MySQL",
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "Elastic Beanstalk",
      "Docker",
      "CI/CD"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "G8ICT LTD.",
    "year_start": "2023",
    "year_end": "2026",
    "category": "AI / Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb6c",
    "title": "Agriculture Analytics Platform",
    "description": "Backend analytics modules covering soil data management, crops modelling, yield prediction, IoT data processing, fertilizer suggestions, crops life-cycle tracking with notifications, personal finance, and crop-wise sales history.",
    "tech_stack": [
      "Python",
      "Django",
      "MS SQL Server"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "G8ICT LTD.",
    "year_start": "2023",
    "year_end": "2026",
    "category": "Backend / Analytics"
  },
  {
    "id": "6a3aeddb434879f98092eb6d",
    "title": "Dhaka Stock Exchange Web Scraper",
    "description": "Real-time data analysis tool for the Dhaka Stock Exchange. Automated HTML/CSS parsing and data collection pipeline using BeautifulSoup and Requests.",
    "tech_stack": [
      "Python",
      "BeautifulSoup",
      "Requests"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "G8ICT LTD.",
    "year_start": "2024",
    "year_end": "2025",
    "category": "Data Engineering"
  },
  {
    "id": "6a3aeddb434879f98092eb6e",
    "title": "AgoraK — Kiosk App for Shops",
    "description": "Kiosk application allowing users to design and print gift cards and photos on the go. Event-driven architecture with one backend serving multiple Raspberry Pi kiosks via Kafka. Seamless phone-to-iPad image transfer without persistent storage.",
    "tech_stack": [
      "FastAPI",
      "ReactJS",
      "Polotno",
      "Kafka",
      "MongoDB",
      "CI/CD"
    ],
    "github_url": null,
    "live_url": "https://agorasuperstores.com/",
    "image_url": null,
    "company": "G8ICT LTD.",
    "year_start": "2023",
    "year_end": "2024",
    "category": "Full-Stack / IoT"
  },
  {
    "id": "6a3aeddb434879f98092eb6f",
    "title": "Warehouse & Retail Inventory Management System",
    "description": "End-to-end inventory solution for warehouse, wholesale, and retail outlets tracking product movement from warehouse to customer. Features include notification system for stock levels and product expiry, route planning for deliveries, dynamic reports, and a mobile app for customer orders. Deployed on Azure.",
    "tech_stack": [
      "Django",
      "MS SQL Server",
      "Azure"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "Ingrediente Primordial, Unipessoal Lda",
    "year_start": "2022",
    "year_end": "2023",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb70",
    "title": "Product Merchandising Solution — YOLOv5 Detection",
    "description": "Mobile app and dashboard with a custom-trained YOLOv3 & YOLOv5 object detection model for automatically detecting and counting Johnson & Johnson products. Deployed on AWS EC2 and S3, built with Python Django and Django REST API.",
    "tech_stack": [
      "Python",
      "Django",
      "Django REST API",
      "YOLOv3",
      "YOLOv5",
      "AWS EC2",
      "AWS S3"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "ACI Ltd",
    "year_start": "2020",
    "year_end": "2022",
    "category": "AI / Computer Vision"
  },
  {
    "id": "6a3aeddb434879f98092eb71",
    "title": "Yamaha Portal for ACI Motors",
    "description": "Dedicated web portal for Yamaha motorcycles under ACI Motors brand, managing product listings, dealer network, and customer interactions. Built with Python Django and MS SQL Server.",
    "tech_stack": [
      "Python",
      "Django",
      "MS SQL Server"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "ACI Ltd",
    "year_start": "2019",
    "year_end": "2020",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb72",
    "title": "Attendance Management Solution",
    "description": "Designed, developed, and implemented a comprehensive attendance solution for enterprise workforce management, built with Python Flask and MS SQL Server.",
    "tech_stack": [
      "Python",
      "Flask",
      "MS SQL Server"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "ACI Ltd",
    "year_start": "2018",
    "year_end": "2019",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb73",
    "title": "Call Centre Solution — Softphone & CRM",
    "description": "Integrated softphone and CRM solution featuring Speech-to-Text, Sentiment Analysis on call recordings, and automated call routing. C# Windows Form dialer application with Python Django CRM backend. Deployed on Azure Cloud.",
    "tech_stack": [
      "Python",
      "Django",
      "MS SQL Server",
      "C#",
      "Azure",
      "Speech-to-Text",
      "Sentiment Analysis"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "ACI Ltd",
    "year_start": "2017",
    "year_end": "2019",
    "category": "Full-Stack / AI"
  },
  {
    "id": "6a3aeddb434879f98092eb74",
    "title": "MS PowerBI Reporting Dashboard",
    "description": "Enterprise-level MS PowerBI reporting dashboard deployed on Azure Cloud, providing real-time business intelligence and analytics built with Python Django.",
    "tech_stack": [
      "Python",
      "Django",
      "MS PowerBI",
      "Azure"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "ACI Ltd",
    "year_start": "2016",
    "year_end": "2017",
    "category": "Analytics / BI"
  },
  {
    "id": "6a3aeddb434879f98092eb75",
    "title": "EduTube Portal",
    "description": "Educational video portal providing learning content and courses online, built with PHP CodeIgniter/Zend framework, C#.NET, and MySQL.",
    "tech_stack": [
      "C#.NET",
      "PHP",
      "CodeIgniter",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "MySQL"
    ],
    "github_url": null,
    "live_url": "https://www.edutubebd.com/",
    "image_url": null,
    "company": "EATL",
    "year_start": "2013",
    "year_end": "2015",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb76",
    "title": "EATL AppStore",
    "description": "Mobile application marketplace for discovering and downloading apps, built with PHP and JavaScript stack with MySQL backend.",
    "tech_stack": [
      "C#.NET",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "Git",
      "MySQL"
    ],
    "github_url": null,
    "live_url": "https://eatlapps.com/",
    "image_url": null,
    "company": "EATL",
    "year_start": "2012",
    "year_end": "2014",
    "category": "Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb77",
    "title": "EDCL ERP — 14 Core Modules",
    "description": "Comprehensive ERP system with 14 core modules for EDCL (government entity), covering finance, HR, procurement, inventory, and operations. Built with PHP CodeIgniter and MS SQL Server.",
    "tech_stack": [
      "PHP",
      "CodeIgniter",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "SQL Server"
    ],
    "github_url": null,
    "live_url": "http://www.edcl.gov.bd/",
    "image_url": null,
    "company": "EATL",
    "year_start": "2010",
    "year_end": "2013",
    "category": "ERP / Full-Stack"
  },
  {
    "id": "6a3aeddb434879f98092eb78",
    "title": "World Bank SEQAEP Project",
    "description": "Secondary Education Quality and Access Enhancement Project (SEQAEP) — a World Bank-funded initiative for improving education quality and access in Bangladesh. Contributed to core platform development.",
    "tech_stack": [
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "SQL Server"
    ],
    "github_url": null,
    "live_url": null,
    "image_url": null,
    "company": "EATL",
    "year_start": "2011",
    "year_end": "2012",
    "category": "Government / Full-Stack"
  }
];

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
    const skills = STATIC_SKILLS;

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
    const projects = STATIC_PROJECTS;

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

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name    = document.getElementById("name").value;
    const email   = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const body    = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
    const subj    = encodeURIComponent(subject || "Portfolio Contact");
    window.location.href = `mailto:aizamitukallul@gmail.com?subject=${subj}&body=${body}`;
  });
}
