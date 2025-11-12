const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

const STATE = {
    lang: localStorage.getItem('lang') || 'en',
    theme: localStorage.getItem('theme') || 'dark',
};

const I18N = {
    en: {
        nav: { about: 'About', experience: 'Experience', education: 'Education', projects: 'Projects', skills: 'Skills' },
        about: {
            prefix: 'I am a ',
            blurb: 'Full-Stack Developer and Talent at 01Talent, focused on creating reliable and secure web applications. I enjoy working with diverse teams to develop solutions that are efficient, reliable, and easy to maintain. Always looking to learn new tools and explore better ways to improve both security and development processes.',
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'Resume'
        },
        experience: {
            title: 'Experience',
            single: {
                title: 'Talent at 01Talent, Zone01 Oujda site.',
                descPrefix: 'Talent at',
                descSuffix: 'site.',
                link01: '01Talent',
                linkZone: 'Zone01 Oujda',
                p1: 'Peer-led engineering sprints with shared tooling.',
                p2: 'Systems, backend, and frontend tracks blended together.',
                p3: 'Daily reviews, ops drills, and product showcases.'
            },
            kdp: {
                title: 'Kindle Direct Publishing',
                p1: 'Write, edit, and publish niche tech content on KDP Marketplace.',
                p2: 'Optimize covers, SEO, and royalties dashboards for steady revenue.'
            },
            pod: {
                title: 'Print on Demand Business',
                link: 'Instagram',
                p1: 'Launched bespoke merch lines, coordinating suppliers and mockups.',
                p2: 'Handled customer support, fulfillment, and marketing via Instagram DM.'
            }
        },
        education: {
            title: 'Education',
            uni: {
                name: 'Physics Bachelor — Université Mohammed Premier',
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
            blurb: 'Développeur Full-Stack et Talent chez 01Talent, concentré sur la création d’applications web fiables et sécurisées. J’aime travailler avec des équipes variées pour construire des solutions performantes et faciles à maintenir. Toujours curieux d’apprendre de nouveaux outils et d’améliorer la sécurité ainsi que les processus de développement.',
            github: 'GitHub', linkedin: 'LinkedIn', resume: 'CV'
        },
        experience: {
            title: 'Expérience',
            single: {
                title: 'Talent chez 01Talent, site Zone01 Oujda.',
                descPrefix: 'Talent chez',
                descSuffix: '.',
                link01: '01Talent',
                linkZone: 'Zone01 Oujda',
                p1: 'Sprints d’ingénierie en pair programming avec outils partagés.',
                p2: 'Parcours systèmes, backend et frontend fusionnés.',
                p3: 'Revues quotidiennes, exercices ops et démos produits.'
            },
            kdp: {
                title: 'Kindle Direct Publishing',
                p1: 'Rédaction et publication de contenus techniques sur KDP.',
                p2: 'Optimisation des couvertures, SEO et royalties pour un revenu stable.'
            },
            pod: {
                title: 'Entreprise Print on Demand',
                link: 'Instagram',
                p1: 'Création de collections personnalisées en coordonnant fournisseurs et maquettes.',
                p2: 'Support client, logistique et marketing via Instagram.'
            }
        },
        education: {
            title: 'Éducation',
            uni: {
                name: 'Licence Physique — Université Mohammed Premier',
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
    let resumeBlobUrl = null;
    let loadingResume = false;
    let loadError = false;

    async function ensureResumeLoaded() {
        if (!frame || !resumeSrc || resumeBlobUrl || loadError) return;
        if (loadingResume) return;
        loadingResume = true;
        try {
            const resp = await fetch(resumeSrc);
            if (!resp.ok) throw new Error('Failed to fetch resume');
            const blob = await resp.blob();
            const file = new File([blob], 'Resume-AyoubAmmar.pdf', { type: 'application/pdf' });
            resumeBlobUrl = URL.createObjectURL(file);
            frame.src = resumeBlobUrl;
        } catch (err) {
            loadError = true;
            const notice = document.createElement('p');
            notice.className = 'empty-state';
            notice.innerHTML = `Unable to display the resume here. <a href="${resumeSrc}" class="edu-link" target="_blank" rel="noopener">Open in new tab</a>.`;
            frame.replaceWith(notice);
        } finally {
            loadingResume = false;
        }
    }

    open.addEventListener('click', e => {
        e.preventDefault();
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
