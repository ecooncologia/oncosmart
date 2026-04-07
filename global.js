let API_BASE_URL = "https://api.ecooncologia.com.br:3000";

if (window.location.href.includes('/teste/')) {
    API_BASE_URL = "https://api.ecooncologia.com.br:4000";
}

const API_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'EcoOnco_Smart_Seguranca_2026!@'
};

const TOP_LOGO_URL = 'https://i.imgur.com/uu3TbH6.png';
const FOOTER_LOGO_URL = 'https://i.imgur.com/kpCeqqJ.png';

const SIDEBAR_STORAGE_KEY = 'ecoSidebarExpanded';
const SIDEBAR_EXPANDED_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 78;

// 1. LISTA MESTRA DAS PÁGINAS E PERMISSÕES
const APP_PAGES = [
    { id: 'dashboard', label: 'Dashboard', file: 'dashboard.html', perm: 'dashboard', icon: 'fas fa-chart-pie' },
    { id: 'budget', label: 'Novo Orçamento', file: 'budget.html', perm: 'orcamentos', icon: 'fas fa-file-invoice-dollar' },
    { id: 'budgets', label: 'Orçamentos', file: 'budgets.html', perm: 'orcamentos', icon: 'fas fa-folder-open' },
    { id: 'sales', label: 'Particulares', file: 'sales.html', perm: 'consultas', icon: 'fas fa-user-tag' },
    { id: 'repass', label: 'Repasse', file: 'medical-repass.html', perm: 'repass', icon: 'fas fa-exchange-alt' },
    { id: 'dashboard-repasse', label: 'Dashboard Repasse', file: 'dashboard-repasse.html', perm: 'dashboard-repasse', icon: 'fas fa-chart-bar' },
    { id: 'procedures', label: 'Procedimentos', file: 'procedures.html', perm: 'procedimentos', icon: 'fas fa-stethoscope' },

    { id: 'transporte', label: 'Recepção (Triagem)', file: 'transporte.html', perm: 'transporte', icon: 'fas fa-clipboard-list' },
    { id: 'stenci', label: 'Stenci', file: 'stenci.html', perm: 'stenci', icon: 'fas fa-print' },
    { id: 'selos', label: 'Selos', file: 'selos.html', perm: 'selos', icon: 'fas fa-stamp' },
    { id: 'tuss', label: 'Tabela TUSS', file: 'tuss.html', perm: 'tuss', icon: 'fas fa-table' },

    { id: 'helpdesk_admin', label: 'Gestão Helpdesk', file: 'helpdesk-admin.html', perm: 'helpdesk_admin', icon: 'fas fa-tools' },
    { id: 'admin', label: 'Admin', file: 'admin.html', perm: 'admin', icon: 'fas fa-shield-alt' },

    { id: 'enfermagem', label: 'Enfermagem (Triagem)', file: 'enfermagem.html', perm: 'enfermagem', icon: 'fas fa-heartbeat' },
    { id: 'doctors', label: 'Médicos', file: 'doctors.html', perm: 'medicos', icon: 'fas fa-user-md' },
    { id: 'pacientes', label: 'Pacientes', file: 'pacientes.html', perm: 'pacientes', icon: 'fas fa-procedures' },
    { id: 'shifts', label: 'Plantão', file: 'shifts.html', perm: 'plantao', icon: 'fas fa-calendar-alt' },

    { id: 'indicadores_enf', label: 'Indicadores', file: 'indicadores-enfermagem.html', perm: 'indicadores_enf', icon: 'fas fa-chart-line' },
    { id: 'helpdesk_dash', label: 'Dashboard Helpdesk', file: 'helpdesk-dash.html', perm: 'helpdesk_dash', icon: 'fas fa-tachometer-alt' },
    { id: 'eventos', label: 'Eventos', file: 'eventos.html', perm: 'eventos', icon: 'fas fa-calendar-check' },
    { id: 'atas', label: 'Mural de ATAs', file: 'atas.html', perm: 'atas', icon: 'fas fa-thumbtack' },

    { id: 'helpdesk', label: 'Helpdesk', file: 'helpdesk.html', perm: 'helpdesk', icon: 'fas fa-headset' },
    { id: 'kanban', label: 'Trello', file: 'kanban.html', perm: 'kanban', icon: 'fas fa-columns' },
    { id: 'oncofood', label: 'OncoFood - Copa', file: 'oncofood.html', perm: 'oncofood', icon: 'fas fa-utensils' },

    { id: 'marketing', label: 'Gerador de Artes', file: 'gerador-imagens.html', perm: 'marketing', icon: 'fas fa-paint-brush' },
    { id: 'guias_cirurgicas', label: 'Guias Cirúrgicas', file: 'guias-cirurgicas.html', perm: 'guias_cirurgicas', icon: 'fas fa-file-medical-alt' }
];

// 2. ORGANIZAÇÃO DOS SETORES E SEUS MENUS
const MENU_SECTORS = [
    { name: "Financeiro", icon: "fas fa-chart-line", pages: ['dashboard', 'budget', 'budgets', 'sales', 'repass', 'dashboard-repasse', 'procedures'] },
    { name: "Recepção", icon: "fas fa-concierge-bell", pages: ['transporte', 'stenci', 'selos', 'tuss'] },
    { name: "Enfermagem", icon: "fas fa-user-nurse", pages: ['enfermagem', 'doctors', 'pacientes', 'shifts'] },
    { name: "Gerência", icon: "fas fa-briefcase", pages: ['indicadores_enf', 'helpdesk_dash', 'eventos', 'atas'] },
    { name: "Central de Guias", icon: "fas fa-file-medical", pages: ['guias_cirurgicas'] },
    { name: "Tec & Inovação", icon: "fas fa-laptop-code", pages: ['helpdesk_admin', 'admin'] },
    { name: "Agregados", icon: "fas fa-puzzle-piece", pages: ['helpdesk', 'kanban', 'oncofood', 'marketing'] }
];

function injectMenuStyles() {
    if (document.getElementById('smart-menu-styles')) return;

    const style = document.createElement('style');
    style.id = 'smart-menu-styles';
    style.innerHTML = `
        :root {
            --smart-sidebar-expanded: ${SIDEBAR_EXPANDED_WIDTH}px;
            --smart-sidebar-collapsed: ${SIDEBAR_COLLAPSED_WIDTH}px;
        }

        body.sidebar-expanded .container {
            margin-left: var(--smart-sidebar-expanded) !important;
            transition: margin 0.3s ease !important;
        }

        body.sidebar-collapsed .container {
            margin-left: var(--smart-sidebar-collapsed) !important;
            transition: margin 0.3s ease !important;
        }

        #global-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: var(--smart-sidebar-collapsed);
            height: 100vh;
            background: #ffffff;
            box-shadow: 4px 0 20px rgba(0,0,0,0.03);
            border-right: 1px solid #e2e8f0;
            z-index: 1000;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            color: #334155;
            transition: width 0.3s ease;
        }

        #global-nav.expanded {
            width: var(--smart-sidebar-expanded);
        }

        #global-nav::-webkit-scrollbar { width: 5px; }
        #global-nav::-webkit-scrollbar-track { background: transparent; }
        #global-nav::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        #global-nav::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        .sidebar-logo-area {
            padding: 16px 12px 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 4px;
        }

        .sidebar-logo-button {
            width: 48px;
            height: 48px;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.2s;
            padding: 6px;
        }

        .sidebar-logo-button:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
        }

        .sidebar-logo-button img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }

        .sidebar-user-card {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px 12px;
            width: calc(100% - 20px);
            margin: 0 auto 14px auto;
            transition: 0.3s;
        }

        .sidebar-user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            background: #e2e8f0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            color: #00855B;
            flex-shrink: 0;
        }

        .sidebar-user-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .sidebar-user-info {
            flex: 1;
            min-width: 0;
        }

        .sidebar-user-greeting {
            font-size: 10px;
            color: #64748b;
            font-weight: 500;
            letter-spacing: 0.3px;
        }

        .sidebar-user-name {
            font-size: 12.5px;
            color: #1e293b;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .sidebar-logout-btn {
            background: transparent;
            border: none;
            color: #ef4444;
            cursor: pointer;
            padding: 5px;
            border-radius: 7px;
            transition: 0.2s;
            flex-shrink: 0;
            font-size: 13px;
        }

        .sidebar-logout-btn:hover {
            background: #fee2e2;
        }

        .sidebar-section-label {
            padding: 12px 18px 6px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #94a3b8;
        }

        .smart-dropdown {
            margin-bottom: 8px;
            padding: 0 10px;
        }

        .smart-dropbtn {
            width: 100%;
            background: transparent;
            color: #475569;
            padding: 12px 14px;
            font-size: 13px;
            font-weight: 700;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: 0.2s;
        }

        .smart-dropbtn:hover {
            background: #f8fafc;
            color: #00855B;
            border-color: #cbd5e1;
        }

        .sector-title {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            min-width: 0;
        }

        .sector-title i {
            font-size: 16px;
            width: 20px;
            min-width: 20px;
            text-align: center;
            color: #94a3b8;
            transition: 0.2s;
        }

        .menu-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .smart-dropbtn:hover .sector-title i {
            color: #00855B;
        }

        .smart-dropdown.active-sector .smart-dropbtn {
            background: #ecfdf5;
            color: #00855B;
            font-weight: 800;
            border-color: #a7f3d0;
        }

        .smart-dropdown.active-sector .smart-dropbtn .sector-title i {
            color: #00855B;
        }

        .smart-dropdown-content {
            display: none;
            flex-direction: column;
            gap: 4px;
            padding: 6px 0 2px 34px;
            overflow: hidden;
        }

        .smart-dropdown-content.show {
            display: flex;
            animation: slideDown 0.25s ease-out;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .smart-drop-item {
            padding: 10px 12px;
            text-decoration: none;
            color: #64748b;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid #f8fafc;
            background: transparent;
            cursor: pointer;
            text-align: left;
            width: 100%;
            border-radius: 8px;
            transition: 0.2s;
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .smart-drop-item i {
            width: 16px;
            min-width: 16px;
            text-align: center;
        }

        .smart-drop-item:hover {
            color: #00855B;
            background: #f8fafc;
            border-color: #e2e8f0;
        }

        .smart-drop-item.active {
            color: #00855B;
            font-weight: 800;
            background: transparent;
            border-color: #d1fae5;
        }

        .smart-drop-item.active::before {
            content: '';
            position: absolute;
            left: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background: #00855B;
            border-radius: 50%;
        }

        .item-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .sidebar-footer {
            margin-top: auto;
            padding: 20px 18px;
            border-top: 1px solid #f1f5f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            background: #fafafa;
        }

        .sidebar-footer img {
            max-width: 120px;
            height: auto;
            opacity: 0.9;
        }

        .sidebar-footer span {
            font-size: 10px;
            color: #94a3b8;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-align: center;
        }

        /* ESTADO RECOLHIDO */
        #global-nav:not(.expanded) .sidebar-user-info,
        #global-nav:not(.expanded) .sidebar-logout-btn,
        #global-nav:not(.expanded) .sidebar-section-label,
        #global-nav:not(.expanded) .menu-text,
        #global-nav:not(.expanded) .item-text,
        #global-nav:not(.expanded) .sector-chevron,
        #global-nav:not(.expanded) .sidebar-footer {
            display: none !important;
        }

        #global-nav:not(.expanded) .sidebar-user-card {
            width: 56px;
            padding: 10px;
            justify-content: center;
        }

        #global-nav:not(.expanded) .smart-dropbtn {
            justify-content: center;
            padding: 14px 10px;
        }

        #global-nav:not(.expanded) .sector-title {
            justify-content: center;
            gap: 0;
        }

        #global-nav:not(.expanded) .sector-title i {
            width: auto;
            min-width: auto;
            font-size: 18px;
        }

        #global-nav:not(.expanded) .smart-dropdown-content {
            display: none !important;
        }

        /* ESTADO EXPANDIDO */
        #global-nav.expanded .sidebar-logo-button {
            width: 56px;
            height: 56px;
            border-radius: 16px;
        }

        @media (max-width: 900px) {
            body.sidebar-expanded .container,
            body.sidebar-collapsed .container {
                margin-left: 0 !important;
            }

            #global-nav,
            #global-nav.expanded {
                position: relative;
                width: 100%;
                height: auto;
                border-radius: 12px;
                margin-bottom: 20px;
                box-shadow: none;
                border-right: none;
            }

            #global-nav:not(.expanded) .sidebar-user-info,
            #global-nav:not(.expanded) .sidebar-logout-btn,
            #global-nav:not(.expanded) .sidebar-section-label,
            #global-nav:not(.expanded) .menu-text,
            #global-nav:not(.expanded) .item-text,
            #global-nav:not(.expanded) .sector-chevron,
            #global-nav:not(.expanded) .sidebar-footer {
                display: flex !important;
            }

            #global-nav:not(.expanded) .sidebar-user-card {
                width: calc(100% - 20px);
                justify-content: flex-start;
            }

            #global-nav:not(.expanded) .smart-dropbtn {
                justify-content: space-between;
                padding: 12px 14px;
            }

            #global-nav:not(.expanded) .sector-title {
                justify-content: flex-start;
                gap: 12px;
            }

            #global-nav:not(.expanded) .sector-title i {
                width: 20px;
                min-width: 20px;
                font-size: 16px;
            }
        }
    `;

    document.head.appendChild(style);
}

function getDefaultSidebarExpanded() {
    if (window.innerWidth <= 900) return true;
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
}

function applyBodySidebarClass(isExpanded) {
    document.body.classList.toggle('sidebar-expanded', isExpanded);
    document.body.classList.toggle('sidebar-collapsed', !isExpanded);
}

function closeAllSubmenus() {
    document.querySelectorAll('.smart-dropdown-content').forEach(el => {
        el.classList.remove('show');
    });

    document.querySelectorAll('.sector-chevron').forEach(el => {
        el.classList.remove('fa-chevron-down');
        el.classList.add('fa-chevron-right');
    });
}

function openActiveSectorSubmenu() {
    const activeDropdown = document.querySelector('.smart-dropdown.active-sector');
    if (!activeDropdown) return;

    const content = activeDropdown.querySelector('.smart-dropdown-content');
    const chevron = activeDropdown.querySelector('.sector-chevron');

    if (content) content.classList.add('show');
    if (chevron) {
        chevron.classList.remove('fa-chevron-right');
        chevron.classList.add('fa-chevron-down');
    }
}

function syncSidebarState(isExpanded) {
    const nav = document.getElementById('global-nav');
    if (!nav) return;

    nav.classList.toggle('expanded', isExpanded);
    applyBodySidebarClass(isExpanded);

    if (window.innerWidth > 900) {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, isExpanded ? 'true' : 'false');
    }

    if (!isExpanded) {
        closeAllSubmenus();
    } else {
        const hasAnyOpen = document.querySelector('.smart-dropdown-content.show');
        if (!hasAnyOpen) {
            openActiveSectorSubmenu();
        }
    }
}

window.toggleSidebar = function(forceState = null) {
    const nav = document.getElementById('global-nav');
    if (!nav) return;

    const nextState = forceState !== null
        ? forceState
        : !nav.classList.contains('expanded');

    syncSidebarState(nextState);
};

window.toggleSmartMenu = function(id, event) {
    event.stopPropagation();

    const nav = document.getElementById('global-nav');
    const targetMenu = document.getElementById(id);
    const button = event.currentTarget;
    const iconChevron = button.querySelector('.sector-chevron');

    if (!targetMenu) return;

    if (nav && !nav.classList.contains('expanded')) {
        syncSidebarState(true);
    }

    const isCurrentlyOpen = targetMenu.classList.contains('show');

    document.querySelectorAll('.smart-dropdown-content').forEach(el => {
        if (el.id !== id) el.classList.remove('show');
    });

    document.querySelectorAll('.sector-chevron').forEach(el => {
        if (el !== iconChevron) {
            el.classList.remove('fa-chevron-down');
            el.classList.add('fa-chevron-right');
        }
    });

    if (isCurrentlyOpen) {
        targetMenu.classList.remove('show');
        if (iconChevron) {
            iconChevron.classList.remove('fa-chevron-down');
            iconChevron.classList.add('fa-chevron-right');
        }
    } else {
        targetMenu.classList.add('show');
        if (iconChevron) {
            iconChevron.classList.remove('fa-chevron-right');
            iconChevron.classList.add('fa-chevron-down');
        }
    }
};

function ensureResponsiveSidebarListener() {
    if (window.__smartSidebarResizeBound) return;
    window.__smartSidebarResizeBound = true;

    window.addEventListener('resize', () => {
        const shouldExpand = getDefaultSidebarExpanded();
        syncSidebarState(shouldExpand);
    });
}

async function initGlobal(currentPageId, pageTitle) {
    try {
        const userJson = localStorage.getItem('ecoUser');
        const isLogin = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
        const isNoAccess = window.location.pathname.includes('no-access');

        if (!userJson) {
            if (!isLogin && !isNoAccess) {
                console.warn("Usuário não logado. Redirecionando...");
                window.location.href = 'index.html';
            }
            return;
        }

        let user = JSON.parse(userJson);
        const localPhoto = localStorage.getItem('ecoUserPhoto');
        const displayPhoto = (localPhoto && localPhoto.length > 50)
            ? localPhoto
            : (user.foto || user.photo || '');

        if (!isNoAccess) {
            renderHeader(user, pageTitle, displayPhoto);
            await checkPermissionsAndRenderMenu(user, currentPageId, displayPhoto);
        }
    } catch (e) {
        console.error("Erro initGlobal:", e);
    }
}

function renderHeader(user, title, photoSrc) {
    const headerEl = document.getElementById('global-header');
    if (!headerEl) return;

    headerEl.className = 'header';
    headerEl.innerHTML = `
        <div class="header-center"><p>${title}</p></div>
    `;
}

async function checkPermissionsAndRenderMenu(user, activeId, photoSrc) {
    let perms = user.permissoes || {};

    try {
        const res = await fetch(`${API_BASE_URL}/usuarios`, { headers: API_HEADERS });

        if (res.ok) {
            const allUsers = await res.json();
            const emailKey = (user.email || '').replace(/\./g, ',');
            let found = allUsers[emailKey] || Object.values(allUsers).find(u => u.email === user.email);

            if (found) {
                try {
                    perms = (typeof found.permissoes === 'string')
                        ? JSON.parse(found.permissoes)
                        : (found.permissoes || {});
                } catch {
                    perms = found.permissoes || {};
                }

                user.permissoes = perms;

                if (found.foto && !photoSrc) {
                    photoSrc = found.foto;
                }

                localStorage.setItem('ecoUser', JSON.stringify(user));
            }
        }
    } catch (e) {
        console.error("Falha ao buscar usuários:", e);
    }

    injectMenuStyles();
    ensureResponsiveSidebarListener();

    const nav = document.getElementById('global-nav');
    if (!nav) return;

    const isSidebarExpanded = getDefaultSidebarExpanded();
    applyBodySidebarClass(isSidebarExpanded);

    const hour = new Date().getHours();
    const greeting = (hour < 12) ? 'Bom dia' : (hour < 18) ? 'Boa tarde' : 'Boa noite';

    let displayName = user.nome || "Usuário";
    if (user.nome && user.nome.split(' ').length > 1) {
        displayName = `${user.nome.split(' ')[0]} ${user.nome.split(' ')[1]}`;
    }

    const avatarHTML = photoSrc
        ? `<img src="${photoSrc}" alt="${displayName}">`
        : `<span>${displayName.charAt(0).toUpperCase()}</span>`;

    let html = `
        <div class="sidebar-logo-area">
            <button class="sidebar-logo-button" onclick="toggleSidebar()" title="Expandir ou recolher menu">
                <img src="${TOP_LOGO_URL}" alt="Eco Oncologia">
            </button>
        </div>

        <div class="sidebar-user-card" title="${displayName}">
            <div class="sidebar-user-avatar">${avatarHTML}</div>
            <div class="sidebar-user-info">
                <div class="sidebar-user-greeting">${greeting},</div>
                <div class="sidebar-user-name">${displayName}</div>
            </div>
            <button class="sidebar-logout-btn" onclick="logout()" title="Sair">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>

        <div class="sidebar-section-label">Menu Principal</div>
    `;

    let hasVisibleMenu = false;

    MENU_SECTORS.forEach((sector, index) => {
        let sectorHtml = '';
        let sectorHasVisiblePages = false;
        let isSectorActive = false;

        sector.pages.forEach(pageId => {
            const page = APP_PAGES.find(p => p.id === pageId);
            if (!page) return;

            let show = false;

            if (page.id === 'helpdesk') {
                show = true;
            } else if (page.id === 'admin') {
                show = (perms.admin === true);
            } else {
                show = (perms[page.perm] === true);
            }

            if (show) {
                sectorHasVisiblePages = true;
                hasVisibleMenu = true;

                const isActive = (page.id === activeId);
                if (isActive) isSectorActive = true;

                const activeClass = isActive ? 'active' : '';
                const pageIcon = page.icon || 'fas fa-circle';

                sectorHtml += `
                    <button
                        class="smart-drop-item ${activeClass}"
                        onclick="window.location.href='${page.file}'"
                        title="${page.label}">
                        <i class="${pageIcon}"></i>
                        <span class="item-text">${page.label}</span>
                    </button>
                `;
            }
        });

        const dropId = 'dropMenu' + index;

        if (sectorHasVisiblePages) {
            const sectorActiveClass = isSectorActive ? 'active-sector' : '';
            const showClass = (isSidebarExpanded && isSectorActive) ? 'show' : '';
            const chevronClass = (isSidebarExpanded && isSectorActive) ? 'fa-chevron-down' : 'fa-chevron-right';

            html += `
                <div class="smart-dropdown ${sectorActiveClass}">
                    <button
                        class="smart-dropbtn"
                        onclick="toggleSmartMenu('${dropId}', event)"
                        title="${sector.name}">
                        <span class="sector-title">
                            <i class="${sector.icon}"></i>
                            <span class="menu-text">${sector.name}</span>
                        </span>
                        <i class="fas ${chevronClass} sector-chevron"></i>
                    </button>

                    <div id="${dropId}" class="smart-dropdown-content ${showClass}">
                        ${sectorHtml}
                    </div>
                </div>
            `;
        } else if (sector.pages.length === 0 && perms.admin === true) {
            html += `
                <div class="smart-dropdown">
                    <button class="smart-dropbtn" style="opacity:0.5; cursor:not-allowed;" title="${sector.name}">
                        <span class="sector-title">
                            <i class="${sector.icon}"></i>
                            <span class="menu-text">${sector.name}</span>
                        </span>
                        <small style="font-size:9px; background:#f1f5f9; color:#64748b; padding:2px 5px; border-radius:4px;">Em breve</small>
                    </button>
                </div>
            `;
        }
    });

    html += `
        <div class="sidebar-footer">
            <img src="${FOOTER_LOGO_URL}" alt="Eco Oncologia">
            <span>&copy; ${new Date().getFullYear()} ECO SISTEMAS</span>
        </div>
    `;

    nav.innerHTML = html;
    syncSidebarState(isSidebarExpanded);

    // --- ROTEADOR / CONTROLE DE ACESSO ---
    const pageConfig = APP_PAGES.find(p => p.id === activeId);

    if (pageConfig) {
        const req = pageConfig.perm;
        const allowed =
            (perms.admin === true && pageConfig.id === 'admin') ||
            (req === 'helpdesk') ||
            (perms[req] === true);

        if (!allowed) {
            const firstValidPage = APP_PAGES.find(p => {
                if (p.id === activeId) return false;
                if (p.id === 'helpdesk') return true;
                if (p.id === 'admin' && perms.admin) return true;
                return perms[p.perm] === true;
            });

            if (firstValidPage) {
                window.location.href = firstValidPage.file;
            } else {
                window.location.href = 'no-access-teste.html';
            }
        }
    } else if (!hasVisibleMenu && !perms.admin) {
        window.location.href = 'no-access-teste.html';
    }
}

function logout() {
    localStorage.removeItem('ecoUser');
    localStorage.removeItem('ecoUserPhoto');
    window.location.href = 'https://ecooncologia.com.br/smart/';
}
