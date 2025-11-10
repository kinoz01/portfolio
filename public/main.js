const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

const STATE = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'dark',
};

const I18N = {
    en: {
        nav: { about: 'About', formation: 'Formation', projects: 'Projects', skills: 'Skills' },
        about: {
            prefix: 'I am ',
            blurb: 'Backend and systems developer based in Morocco. I like clean architectures, predictable performance, and shipping small, reliable services.',
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'Resume'
        },
        formation: {
            title: 'Formation',
            website: 'Website',
            platform: 'Platform',
            '01': { name: 'Talent at 01Talent', p1: 'Peer-learning, project-based software engineering.', p2: 'Algorithms, data structures, Git workflows.', p3: 'Backend services in Go/Rust, databases, WebSockets.' },
            z01: { name: 'Zone01 Oujda', p1: 'Real-time projects, collaboration, code reviews.', p2: 'Systems programming, networking basics.', p3: 'Frontend SPA with vanilla JS and Web APIs.' },
            uni: { name: 'Physics Bachelor — Université Mohammed Premier', p1: 'Mathematical modeling and measurement.', p2: 'Critical thinking, experimentation, data analysis.', p3: 'Problem solving under constraints.' }
        },
        projects: { title: 'Projects' },
        skills: {
            title: 'Skills', tech: 'Technical', soft: 'Soft skills',
            soft1: 'Clear communication', soft2: 'Owns problems end-to-end', soft3: 'Collaborative code reviews', soft4: 'Calm under pressure', soft5: 'Strong debugging mindset'
        }
    },
    fr: {
        nav: { about: 'À propos', formation: 'Formation', projects: 'Projets', skills: 'Compétences' },
        about: {
            prefix: 'Je suis ',
            blurb: 'Développeur backend et systèmes basé au Maroc. J’aime les architectures épurées, les performances prévisibles et livrer de petits services fiables.',
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'CV'
        },
        formation: {
            title: 'Formation',
            website: 'Site',
            platform: 'Plateforme',
            '01': { name: 'Talent chez 01Talent', p1: 'Apprentissage par les pairs et projets concrets.', p2: 'Algorithmes, structures de données, workflows Git.', p3: 'Backends en Go/Rust, bases de données, WebSockets.' },
            z01: { name: 'Zone01 Oujda', p1: 'Projets temps réel, collaboration, relectures de code.', p2: 'Programmation systèmes, bases réseau.', p3: 'SPA en JS natif et Web APIs.' },
            uni: { name: 'Licence Physique — Université Mohammed Premier', p1: 'Modélisation mathématique et mesures.', p2: 'Esprit critique, expérimentation, analyse de données.', p3: 'Résolution de problèmes sous contraintes.' }
        },
        projects: { title: 'Projets' },
        skills: {
            title: 'Compétences', tech: 'Techniques', soft: 'Transversales',
            soft1: 'Communication claire', soft2: 'Responsable de bout en bout', soft3: 'Relectures de code collaboratives', soft4: 'Calme sous pression', soft5: 'Solide esprit de débogage'
        }
    }
};

// Typewriter lines (with colors)
const TYPE_LINES = {
    en: [
        { text: 'Full-Stack Developer', color: 'var(--accent)' },
        { text: 'DevSecOps Enthusiast', color: 'var(--accent-2)' },
        { text: 'Small Business Owner', color: 'var(--accent-3)' },
    ],
    fr: [
        { text: 'Développeur Full-Stack', color: 'var(--accent)' },
        { text: 'Passionné de DevSecOps', color: 'var(--accent-2)' },
        { text: 'Entrepreneur', color: 'var(--accent-3)' },
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Theme init BEFORE anything else
    document.documentElement.setAttribute('data-theme', STATE.theme);
    const themeSwitch = $('#theme-switch');
    themeSwitch.checked = STATE.theme === 'light';

    // Mobile menu
    const toggle = $('.nav-toggle');
    const flyout = $('#nav-flyout');
    toggle?.addEventListener('click', () => {
        const open = !flyout.hasAttribute('hidden');
        if (open) {
            flyout.setAttribute('hidden', '');
            flyout.classList.remove('open');
        } else {
            flyout.removeAttribute('hidden');
            flyout.classList.add('open');
        }
        toggle.setAttribute('aria-expanded', String(!open));
    });

    // Footer year
    $('#year').textContent = new Date().getFullYear();

    // Theme switch handler
    themeSwitch.addEventListener('change', (e) => {
        STATE.theme = e.target.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', STATE.theme);
        localStorage.setItem('theme', STATE.theme);
    });

    // Language toggles (+ set initial pressed state correctly)
    const enBtn = $('#lang-en');
    const frBtn = $('#lang-fr');
    function syncLangButtons() {
        enBtn.setAttribute('aria-pressed', String(STATE.lang === 'en'));
        frBtn.setAttribute('aria-pressed', String(STATE.lang === 'fr'));
    }
    function setLang(l) {
        STATE.lang = l;
        localStorage.setItem('lang', l);
        syncLangButtons();
        applyI18N();
        restartTypewriter();
    }
    // set initial
    syncLangButtons();
    applyI18N();

    enBtn.addEventListener('click', () => setLang('en'));
    frBtn.addEventListener('click', () => setLang('fr'));

    // Typewriter
    startTypewriter(TYPE_LINES[STATE.lang], $('#typewriter'));

    // Data
    loadProjects();
    loadSkills();

    // Modals
    wireVideoModal();
    wireResumeModal();

    // Card reveal
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: .12 });
    $$('.card').forEach(c => io.observe(c));
});

function applyI18N() {
    $$('[data-i18n]').forEach(el => {
        const path = el.getAttribute('data-i18n').split('.');
        let cur = I18N[STATE.lang];
        for (const p of path) { if (cur && p in cur) cur = cur[p]; else { cur = null; break; } }
        if (typeof cur === 'string') el.textContent = cur;
    });
}

let typewriterStop = null;
function restartTypewriter() {
    if (typeof typewriterStop === 'function') typewriterStop();
    const el = $('#typewriter');
    el.textContent = '';
    startTypewriter(TYPE_LINES[STATE.lang], el);
}

function startTypewriter(lines, el) {
    let i = 0, pos = 0, dir = 1;
    const speed = 55, hold = 1200;
    let holdUntil = 0, stopped = false;

    function tick(ts) {
        if (stopped) return;
        const { text, color } = lines[i];
        el.style.setProperty('--tw-color', color);
        if (dir === 1) {
            if (pos < text.length) { pos++; el.textContent = text.slice(0, pos); }
            else if (!holdUntil) { holdUntil = ts + hold; }
            else if (ts >= holdUntil) { dir = -1; }
        } else {
            if (pos > 0) { pos--; el.textContent = text.slice(0, pos); }
            else { dir = 1; holdUntil = 0; i = (i + 1) % lines.length; }
        }
        setTimeout(() => requestAnimationFrame(tick), speed);
    }
    requestAnimationFrame(tick);
    typewriterStop = () => { stopped = true; };
}

// Projects
function loadProjects() {
    fetch('/projects.json?v=1')
        .then(r => r.json())
        .then(items => renderProjects(items))
        .catch(() => { $('#projects-grid').innerHTML = '<p style="color:#f55">Failed to load projects.</p>'; });
}
function renderProjects(items) {
    const grid = $('#projects-grid');
    grid.innerHTML = items.map(toProjectCard).join('');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: .1 });
    [...grid.children].forEach(el => io.observe(el));
}
function toProjectCard(p) {
    const tags = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const website = p.website ? `<a class="btn" href="${escapeAttr(p.website)}" target="_blank" rel="noopener">${label('Website', 'Site')}</a>` : '';
    const repo = p.repo ? `<a class="btn" href="${escapeAttr(p.repo)}" target="_blank" rel="noopener">Code</a>` : '';
    const preview = p.video ? `<button class="btn primary" data-preview="${escapeAttr(p.video)}" data-title="${escapeAttr(p.title)}">${label('Preview', 'Aperçu')}</button>` : '';
    return `
<article class="card">
  <h3>${escapeHtml(p.title)}</h3>
  <p>${escapeHtml(p.description)}</p>
  <div class="tags">${tags}</div>
  <div class="actions">
    ${preview}${website}${repo}
  </div>
</article>`;
}
function label(en, fr) { return STATE.lang === 'en' ? en : fr; }

// Skills
function loadSkills() {
    fetch('/skills.json?v=1')
        .then(r => r.json())
        .then(data => {
            const wrap = $('#tech-logos');
            wrap.innerHTML = data.technical.map(t => `
        <div class="logo" title="${escapeAttr(t.name)}">
          <img src="${escapeAttr(t.src)}" alt="${escapeAttr(t.name)} logo" />
        </div>
      `).join('');
        })
        .catch(() => { $('#tech-logos').innerHTML = '<p style="color:#f55">Failed to load skills.</p>'; });
}

// Video modal
function wireVideoModal() {
    const modal = $('#video-modal');
    const title = $('#video-title');
    const player = $('#video-player');
    const closeBtn = $('#close-video');

    document.body.addEventListener('click', e => {
        const btn = e.target.closest('button[data-preview]');
        if (!btn) return;
        const src = btn.getAttribute('data-preview');
        const t = btn.getAttribute('data-title') || 'Preview';
        title.textContent = t;
        player.src = src + '#t=0.1';
        modal.hidden = false;
        player.play().catch(() => { });
    });

    function close() {
        player.pause();
        player.removeAttribute('src');
        player.load();
        modal.hidden = true;
    }
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
}

// Resume modal
function wireResumeModal() {
    const modal = $('#resume-modal');
    const open = $('#open-resume');
    const close = $('#close-resume');
    open.addEventListener('click', e => { e.preventDefault(); modal.hidden = false; });
    function closeModal() { modal.hidden = true; }
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
