const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

const STATE = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'light',
};

const I18N = {
    en: {
        nav: { about: 'About', experience: 'Experience', education: 'Education', projects: 'Projects', skills: 'Skills' },
        about: {
            prefix: 'I am a ',
            blurb: `Software Developer and Talent at <a class="link-accent" href="https://01talent.com/" target="_blank" rel="noopener">01Talent</a>, focused on creating reliable and secure web applications. I enjoy working with diverse teams to develop solutions that are efficient, reliable, and easy to maintain. Always looking to learn new tools and explore better ways to improve both security and development processes.`,
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'Resume'
        },
        experience: {
            title: 'Experience',
            single: {
                title: 'Talent at 01Talent - Zone01 Oujda campus.',
                descPrefix: 'Talent at',
                descSuffix: 'campus',
                link01: '01Talent',
                linkZone: 'Zone01 Oujda',
                p1: 'An intensive, project-based software engineering curriculum focused on problem-solving, algorithms, and real-world development challenges.',
                p2: 'Built multiple full-stack applications using modern technologies, emphasizing clean architecture, security, and maintainability.',
                p3: 'Collaborated with diverse teams through peer-learning, pair-programming, code reviews and audits',
                p4: 'Developed strong autonomy and adaptability by learning new tools, languages, and frameworks through self-directed and challenge-driven tasks.'
            },
            kdp: {
                title: 'Running a small publishing business',
                p1: 'Analyzed market data and user feedback to optimize product listings, improve visibility, and streamline end-to-end publishing processes.',
                p2: 'Built and maintained small publishing workflows using digital tools for content creation, editing, formatting, and distribution on the KDP platform.'
            },
            pod: {
                title: 'Starting a small Print on Demand business.',
                link: 'Instagram',
                p1: 'Designed and developed a small e-commerce website to showcase Print-on-Demand products, integrating product catalogs, branding, and streamlined navigation.',
                p2: 'Used digital tools and analytics to optimize product visibility, streamline operations, and improve conversion rates across sales channels.',
                p3: 'Built and managed the full Print-on-Demand workflow, from product design and digital asset preparation to online listing and order fulfillment.'
            }
        },
        education: {
            title: 'Education',
            uni: {
                name: "Bachelor's in Physics — Université Mohammed Premier",
                faculty: 'FSO',
                p1: 'Mathematical modeling and measurement.',
                p2: 'Critical thinking, experimentation, data analysis.',
                p3: 'Problem solving under constraints.'
            }
        },
        projects: { title: 'Projects', filterLabel: 'Filter' },
        skills: {
            title: 'Skills',
            fullstack: 'Full Stack Development',
            programming: 'Programming & Development',
            tools: 'Tools & Platforms',
            soft: 'Soft skills',
            soft1: 'Clear communication', soft2: 'Owns problems end-to-end', soft3: 'Collaborative code reviews', soft4: 'Calm under pressure', soft5: 'Strong debugging mindset'
        }
    },
    fr: {
        nav: { about: 'À propos', experience: 'Expérience', education: 'Éducation', projects: 'Projets', skills: 'Compétences' },
        about: {
            prefix: 'Je suis un ',
            blurb: `Développeur logiciel et Talent chez <a class="link-accent" href="https://01talent.com/" target="_blank" rel="noopener">01Talent</a>, concentré sur la création d’applications web fiables et sécurisées. J’aime travailler avec des équipes variées pour construire des solutions performantes et faciles à maintenir. Toujours curieux d’apprendre de nouveaux outils et d’améliorer la sécurité ainsi que les processus de développement.`,
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'CV'
        },
        experience: {
            title: 'Expérience',
            single: {
                title: 'Talent chez 01Talent, campus Zone01 Oujda.',
                descPrefix: 'Talent chez',
                descSuffix: 'campus',
                link01: '01Talent',
                linkZone: 'Zone01 Oujda',
                p1: 'Programme intensif d’ingénierie logicielle orienté projets, axé sur la résolution de problèmes, les algorithmes et des défis réels.',
                p2: 'Création de plusieurs applications full-stack avec des technologies modernes, en privilégiant architecture claire, sécurité et maintenabilité.',
                p3: 'Collaboration avec des équipes variées via peer-learning, pair programming, revues de code et audits.',
                p4: 'Renforcement de l’autonomie et de l’adaptabilité en apprenant de nouveaux outils, langages et frameworks à travers des défis auto-dirigés.'
            },
            kdp: {
                title: 'Gestion d’une petite activité d’édition',
                p1: 'Analyse des données de marché et des retours utilisateurs pour optimiser les fiches produits, renforcer la visibilité et fluidifier les processus de publication de bout en bout.',
                p2: 'Mise en place et maintenance de workflows de publication légers avec des outils numériques pour créer, éditer, mettre en forme et distribuer sur la plateforme KDP.'
            },
            pod: {
                title: 'Création d’une petite entreprise Print on Demand',
                link: 'Instagram',
                p1: 'Conception et développement d’un petit site e-commerce pour présenter les produits Print-on-Demand, avec catalogues, branding et navigation fluide.',
                p2: 'Utilisation d’outils numériques et d’analyses pour améliorer la visibilité produit, fluidifier les opérations et augmenter les conversions sur les canaux de vente.',
                p3: 'Mise en place et gestion du workflow Print-on-Demand de bout en bout : design produit, préparation des assets numériques, mise en ligne et exécution des commandes.'
            }
        },
        education: {
            title: 'Éducation',
            uni: {
                name: 'Licence en Physique — Université Mohammed Premier',
                faculty: 'FSO',
                p1: 'Modélisation mathématique et mesures.',
                p2: 'Esprit critique, expérimentation, analyse de données.',
                p3: 'Résolution de problèmes sous contraintes.'
            }
        },
        projects: { title: 'Projets', filterLabel: 'Filtrer' },
        skills: {
            title: 'Compétences',
            fullstack: 'Développement Full Stack',
            programming: 'Programmation & Développement',
            tools: 'Outils & Plateformes',
            soft: 'Transversales',
            soft1: 'Communication claire', soft2: 'Responsable de bout en bout', soft3: 'Relectures de code collaboratives', soft4: 'Calme sous pression', soft5: 'Solide esprit de débogage'
        }
    }
};

// Typewriter lines (with colors)
const TYPE_LINES = {
    en: [
        { text: 'Software Developer', color: 'var(--accent)' },
        { text: 'DevSecOps Enthusiast', color: 'var(--accent-2)' },
        { text: 'Small Business Owner', color: 'var(--accent-3)' },
    ],
    fr: [
        { text: 'Développeur logiciel', color: 'var(--accent)' },
        { text: 'Passionné de DevSecOps', color: 'var(--accent-2)' },
        { text: 'Entrepreneur', color: 'var(--accent-3)' },
    ]
};

let projectsData = [];
let activeProjectTag = 'all';

document.addEventListener('DOMContentLoaded', () => {
    // Theme init BEFORE anything else
    document.documentElement.setAttribute('data-theme', STATE.theme);
    const themeSwitch = $('#theme-switch');
    themeSwitch.checked = STATE.theme === 'light';

    // Mobile menu
    const toggle = $('.nav-toggle');
    const flyout = $('#nav-flyout');
    const openFlyout = () => {
        flyout?.removeAttribute('hidden');
        flyout?.classList.add('open');
        toggle?.setAttribute('aria-expanded', 'true');
    };
    const closeFlyout = () => {
        if (!flyout) return;
        flyout.setAttribute('hidden', '');
        flyout.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
    };
    toggle?.addEventListener('click', () => {
        const open = !flyout.hasAttribute('hidden');
        open ? closeFlyout() : openFlyout();
    });
    document.addEventListener('click', (e) => {
        if (!flyout || flyout.hasAttribute('hidden')) return;
        if (toggle?.contains(e.target) || flyout.contains(e.target)) return;
        closeFlyout();
    });
    const desktopMQ = window.matchMedia('(min-width: 761px)');
    const handleDesktopChange = (e) => { if (e.matches) closeFlyout(); };
    if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', handleDesktopChange);
    else desktopMQ.addListener(handleDesktopChange);

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
        if (projectsData.length) {
            renderProjectFilters(projectsData);
            renderProjects(getFilteredProjects());
        }
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
    const filterSelect = $('#project-filter');
    filterSelect?.addEventListener('change', onProjectFilterChange);

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

function resolveI18N(path) {
    const parts = path.split('.');
    let cur = I18N[STATE.lang];
    for (const p of parts) {
        if (cur && p in cur) cur = cur[p];
        else { cur = null; break; }
    }
    return typeof cur === 'string' ? cur : null;
}

function applyI18N() {
    const applyAttr = (attr, setter) => {
        $$(`[${attr}]`).forEach(el => {
            const path = el.getAttribute(attr);
            if (!path) return;
            const val = resolveI18N(path);
            if (val != null) setter(el, val);
        });
    };
    applyAttr('data-i18n', (el, val) => { el.textContent = val; });
    applyAttr('data-i18n-html', (el, val) => { el.innerHTML = val; });
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
        .then(items => {
            projectsData = items;
            activeProjectTag = 'all';
            renderProjectFilters(projectsData);
            renderProjects(getFilteredProjects());
        })
        .catch(() => {
            $('#projects-grid').innerHTML = '<p style="color:#f55">Failed to load projects.</p>';
            $('#project-filters').hidden = true;
        });
}
function renderProjects(items) {
    const grid = $('#projects-grid');
    if (!items.length) {
        grid.innerHTML = `<p class="empty-state">${escapeHtml(label('No projects match this tag.', 'Aucun projet ne correspond à ce tag.'))}</p>`;
        return;
    }
    grid.innerHTML = items.map(toProjectCard).join('');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: .1 });
    [...grid.children].forEach(el => io.observe(el));
}
function toProjectCard(p) {
    const desc = projectDescription(p);
    const tags = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const website = p.website ? `<a class="btn" href="${escapeAttr(p.website)}" target="_blank" rel="noopener">${label('Website', 'Site')}</a>` : '';
    const repo = p.repo ? `<a class="btn" href="${escapeAttr(p.repo)}" target="_blank" rel="noopener">Code</a>` : '';
    const preview = p.video ? `<button class="btn primary" data-preview="${escapeAttr(p.video)}" data-title="${escapeAttr(p.title)}">${label('Preview', 'Aperçu')}</button>` : '';
    return `
        <article class="card">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(desc)}</p>
            <div class="tags">${tags}</div>
            <div class="actions">
            ${preview}${website}${repo}
            </div>
        </article>`;
}
function renderProjectFilters(items) {
    const wrap = $('#project-filters');
    const select = $('#project-filter');
    if (!wrap || !select) return;
    const tags = Array.from(new Set(items.flatMap(p => p.tags || []))).sort((a, b) => a.localeCompare(b));
    if (!tags.length) {
        wrap.hidden = true;
        select.innerHTML = `<option value="all">${escapeHtml(label('All', 'Tous'))}</option>`;
        select.disabled = true;
        activeProjectTag = 'all';
        return;
    }
    wrap.hidden = false;
    select.disabled = false;
    const options = [`<option value="all">${escapeHtml(label('All', 'Tous'))}</option>`]
        .concat(tags.map(tag => `<option value="${escapeAttr(tag)}">${escapeHtml(tag)}</option>`));
    select.innerHTML = options.join('');
    if (activeProjectTag !== 'all' && !tags.includes(activeProjectTag)) {
        activeProjectTag = 'all';
    }
    select.value = activeProjectTag;
    if (select.value !== activeProjectTag) {
        activeProjectTag = 'all';
        select.value = 'all';
    }
}
function onProjectFilterChange(e) {
    activeProjectTag = e.target.value;
    renderProjects(getFilteredProjects());
}
function getFilteredProjects() {
    if (activeProjectTag === 'all') return projectsData;
    return projectsData.filter(p => (p.tags || []).includes(activeProjectTag));
}
function label(en, fr) { return STATE.lang === 'en' ? en : fr; }
function projectDescription(p) {
    if (STATE.lang === 'fr') return p.description_fr || p.description_en || p.description || '';
    return p.description_en || p.description || p.description_fr || '';
}

// Skills
function loadSkills() {
    fetch('/skills.json?v=1')
        .then(r => r.json())
        .then(data => {
            renderSkillGroup('#skills-fullstack', data.fullstack);
            renderSkillGroup('#skills-programming', data.programming);
            renderSkillGroup('#skills-tools', data.tools);
        })
        .catch(() => {
            ['#skills-fullstack', '#skills-programming', '#skills-tools']
                .forEach(sel => {
                    const el = $(sel);
                    if (el) el.innerHTML = '<p style="color:#f55">Failed to load skills.</p>';
                });
        });
}

function renderSkillGroup(selector, items = []) {
    const wrap = $(selector);
    if (!wrap) return;
    if (!items.length) {
        wrap.innerHTML = '<p class="empty-state">No items.</p>';
        return;
    }
    wrap.innerHTML = items.map(t => `
    <div class="logo" title="${escapeAttr(t.name)}">
      <img src="${escapeAttr(t.src)}" alt="${escapeAttr(t.name)} logo" />
      <span class="logo-label">${escapeHtml(t.name)}</span>
    </div>
  `).join('');
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
    const frame = $('#resume-frame');
    const resumeSrc = frame?.getAttribute('data-src');
    const mobileMedia = window.matchMedia('(max-width: 640px)');
    let resumeBlobUrl = null;
    let loadingResume = false;
    let loadFailed = false;

    const showFallback = () => {
        if (!frame || !resumeSrc || loadFailed) return;
        const fallback = document.createElement('div');
        fallback.className = 'resume-fallback';
        const text = document.createElement('p');
        text.textContent = label(
            'Unable to display the resume preview on this device.',
            'Impossible d’afficher l’aperçu du CV sur cet appareil.'
        );
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn primary';
        btn.textContent = label('Open in new tab', 'Ouvrir dans un nouvel onglet');
        btn.addEventListener('click', () => {
            if (!resumeSrc) return;
            window.open(resumeSrc, '_blank', 'noopener');
        });
        fallback.append(text, btn);
        frame.replaceWith(fallback);
        loadFailed = true;
    };

    async function ensureResumeLoaded() {
        if (!frame || !resumeSrc || resumeBlobUrl || loadFailed || loadingResume) return;
        loadingResume = true;
        try {
            const resp = await fetch(resumeSrc);
            if (!resp.ok) throw new Error('Failed to fetch resume');
            const blob = await resp.blob();
            resumeBlobUrl = URL.createObjectURL(blob);
            frame.src = resumeBlobUrl;
        } catch (err) {
            showFallback();
        } finally {
            loadingResume = false;
        }
    }

    const openExternally = () => {
        if (!resumeSrc) return false;
        const win = window.open(resumeSrc, '_blank', 'noopener');
        return !!win;
    };

    open.addEventListener('click', e => {
        e.preventDefault();
        if (mobileMedia.matches) {
            const ok = openExternally();
            if (!ok) {
                modal.hidden = false;
                showFallback();
            }
            return;
        }
        modal.hidden = false;
        ensureResumeLoaded();
    });
    function closeModal() { modal.hidden = true; }
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    window.addEventListener('beforeunload', () => {
        if (resumeBlobUrl) URL.revokeObjectURL(resumeBlobUrl);
    });
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
