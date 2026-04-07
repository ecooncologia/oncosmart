let API_BASE_URL = "https://api.ecooncologia.com.br:3000";

if (window.location.href.includes('/teste/')) {
    API_BASE_URL = "https://api.ecooncologia.com.br:4000";
}

const API_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'EcoOnco_Smart_Seguranca_2026!@'
};

const TOP_LOGO_URL = 'https://i.imgur.com/okuWi3T.png';
const TOP_AVATAR_URL = 'https://i.imgur.com/Xgvttab.png';
const FOOTER_LOGO_URL = 'https://i.imgur.com/kpCeqqJ.png';

const SIDEBAR_STORAGE_KEY = 'ecoSidebarExpanded';

// 1. LISTA MESTRA DAS PÁGINAS E PERMISSÕES
const APP_PAGES = [
    { id: 'dashboard', label: 'Dashboard', file: 'dashboard.html', perm: 'dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'budget', label: 'Novo Orçamento', file: 'budget.html', perm: 'orcamentos', icon: 'fas fa-plus-circle' },
    { id: 'budgets', label: 'Orçamentos', file: 'budgets.html', perm: 'orcamentos', icon: 'fas fa-file-invoice-dollar' },
    { id: 'sales', label: 'Particulares', file: 'sales.html', perm: 'consultas', icon: 'fas fa-hand-holding-usd' },
    { id: 'repass', label: 'Repasse', file: 'medical-repass.html', perm: 'repass', icon: 'fas fa-money-check-alt' },
    { id: 'dashboard-repasse', label: 'Dashboard Repasse', file: 'dashboard-repasse.html', perm: 'dashboard-repasse', icon: 'fas fa-chart-bar' },
    { id: 'procedures', label: 'Procedimentos', file: 'procedures.html', perm: 'procedimentos', icon: 'fas fa-notes-medical' },

    { id: 'transporte', label: 'Recepção (Triagem)', file: 'transporte.html', perm: 'transporte', icon: 'fas fa-clipboard-check' },
    { id: 'stenci', label: 'Stenci', file: 'stenci.html', perm: 'stenci', icon: 'fas fa-print' },
    { id: 'selos', label: 'Selos', file: 'selos.html', perm: 'selos', icon: 'fas fa-stamp' },
    { id: 'tuss', label: 'Tabela TUSS', file: 'tuss.html', perm: 'tuss', icon: 'fas fa-th-list' },

    { id: 'helpdesk_admin', label: 'Gestão Helpdesk', file: 'helpdesk-admin.html', perm: 'helpdesk_admin', icon: 'fas fa-tools' },
    { id: 'admin', label: 'Admin', file: 'admin.html', perm: 'admin', icon: 'fas fa-shield-alt' },

    { id: 'enfermagem', label: 'Enfermagem (Triagem)', file: 'enfermagem.html', perm: 'enfermagem', icon: 'fas fa-heartbeat' },
    { id: 'doctors', label: 'Médicos', file: 'doctors.html', perm: 'medicos', icon: 'fas fa-user-md' },
    { id: 'pacientes', label: 'Pacientes', file: 'pacientes.html', perm: 'pacientes', icon: 'fas fa-procedures' },
    { id: 'shifts', label: 'Plantão', file: 'shifts.html', perm: 'plantao', icon: 'fas fa-calendar-alt' },

    { id: 'indicadores_enf', label: 'Indicadores', file: 'indicadores-enfermagem.html', perm: 'indicadores_enf', icon: 'fas fa-chart-line' },
    { id: 'helpdesk_dash', label: 'Dashboard Helpdesk', file: 'helpdesk-dash.html', perm: 'helpdesk_dash', icon: 'fas fa-desktop' },
    { id: 'eventos', label: 'Eventos', file: 'eventos.html', perm: 'eventos', icon: 'fas fa-calendar-check' },
    { id: 'atas', label: 'Mural de ATAs', file: 'atas.html', perm: 'atas', icon: 'fas fa-sticky-note' },

    { id: 'helpdesk', label: 'Helpdesk', file: 'helpdesk.html', perm: 'helpdesk', icon: 'fas fa-headset' },
    { id: 'kanban', label: 'Trello', file: 'kanban.html', perm: 'kanban', icon: 'fas fa-columns' },
    { id: 'oncofood', label: 'OncoFood - Copa', file: 'oncofood.html', perm: 'oncofood', icon: 'fas fa-utensils' },

    { id: 'marketing', label: 'Gerador de Artes', file: 'gerador-imagens.html', perm: 'marketing', icon: 'fas fa-palette' },
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
        #global-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 78px;
            height: 100vh;
            background: rgba(255,255,255,0.96);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-right: 1px solid #e2e8f0;
            box-shadow: 4px 0 20px rgba(0,0,0,0.03);
            z-index: 1000;
            overflow-y: auto;
            overflow-x: visible;
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;
        }

        #global-nav.expanded {
            width: 260px;
        }

        #global-nav::-webkit-scrollbar {
            width: 5px;
        }

        #global-nav::-webkit-scrollbar-track {
            background: transparent;
        }

        #global-nav::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }

        #global-nav::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* HEADER SUPERIOR DA PÁGINA */
        #global-header.header {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        .header-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 18px;
            border-right: 1px solid #e2e8f0;
            flex-shrink: 0;
        }

        .header-brand img {
            width: 210px;
            max-width: 26vw;
            min-width: 150px;
            height: auto;
            object-fit: contain;
            display: block;
        }

        /* TOPO DA SIDEBAR */
        .sidebar-logo-area {
            padding: 16px 12px 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .sidebar-logo-button {
            width: 54px;
            height: 54px;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.25s ease;
            padding: 6px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
            position: relative;
        }

        .sidebar-logo-button:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
        }

        .sidebar-logo-avatar,
        .sidebar-logo-full {
            display: block;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .sidebar-logo-full {
            display: none;
        }

        #global-nav.expanded .sidebar-logo-button {
            width: 190px;
            height: 62px;
            border-radius: 18px;
            padding: 8px 14px;
        }

        #global-nav.expanded .sidebar-logo-avatar {
            display: none;
        }

        #global-nav.expanded .sidebar-logo-full {
            display: block;
            width: 100%;
            height: 100%;
        }

        #global-nav:not(.expanded) .sidebar-logo-avatar {
            display: block;
            width: 42px;
            height: 42px;
        }

        #global-nav:not(.expanded) .sidebar-logo-full {
            display: none;
        }

        /* CARD DO USUÁRIO */
        .sidebar-user-card {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 10px 12px;
            width: calc(100% - 20px);
            margin: 0 auto 14px auto;
            transition: 0.25s ease;
        }

        .sidebar-user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #e2e8f0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            color: #00855B;
            flex-shrink: 0;
            border: 1px solid #dbe5ef;
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
            width: 34px;
            height: 34px;
            background: transparent;
            border: none;
            color: #ef4444;
            cursor: pointer;
            border-radius: 10px;
            transition: 0.2s;
            flex-shrink: 0;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
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

        /* SETORES */
        .smart-dropdown {
            margin-bottom: 8px;
            padding: 0 10px;
            position: relative;
        }

        .smart-dropbtn {
            width: 100%;
            background: transparent;
            color: #475569;
            padding: 12px 14px;
            font-size: 13px;
            font-weight: 700;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: 0.22s ease;
            position: relative;
        }

        .smart-dropbtn:hover {
            background: #f8fafc;
            color: #00855B;
            border-color: #cbd5e1;
            transform: translateY(-1px);
            box-shadow: 0 6px 14px rgba(15, 23, 42, 0.04);
        }

        .sector-title {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            min-width: 0;
        }

        .sector-title i {
            font-size: 15px;
            width: 30px;
            height: 30px;
            min-width: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #64748b;
            background: #f8fafc;
            border: 1px solid #eef2f7;
            border-radius: 10px;
            transition: 0.22s ease;
        }

        .menu-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .smart-dropbtn:hover .sector-title i {
            color: #00855B;
            background: #ecfdf5;
            border-color: #d1fae5;
        }

        .smart-dropdown.active-sector .smart-dropbtn {
            background: #ecfdf5;
            color: #00855B;
            font-weight: 800;
            border-color: #a7f3d0;
        }

        .smart-dropdown.active-sector .smart-dropbtn .sector-title i {
            color: #00855B;
            background: #ffffff;
            border-color: #c7f0dc;
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

        /* SUBITENS */
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
            border-radius: 10px;
            transition: 0.2s ease;
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .smart-drop-item i {
            width: 24px;
            height: 24px;
            min-width: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 12px;
            background: #f8fafc;
            border: 1px solid #eef2f7;
            border-radius: 8px;
            color: #64748b;
            transition: 0.2s ease;
        }

        .smart-drop-item:hover {
            color: #00855B;
            background: #f8fafc;
            border-color: #e2e8f0;
        }

        .smart-drop-item:hover i {
            color: #00855B;
            background: #ecfdf5;
            border-color: #d1fae5;
        }

        .smart-drop-item.active {
            color: #00855B;
            font-weight: 800;
            background: #f8fffb;
            border-color: #d1fae5;
        }

        .smart-drop-item.active i {
            color: #00855B;
            background: #ecfdf5;
            border-color: #c7f0dc;
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
            padding: 18px;
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

        /* TOOLTIPS REAIS */
        #global-nav:not(.expanded) [data-tooltip] {
            position: relative;
        }

        #global-nav:not(.expanded) [data-tooltip]::after {
            content: attr(data-tooltip);
            position: absolute;
            left: calc(100% + 12px);
            top: 50%;
            transform: translateY(-50%) translateX(-6px);
            background: #0f172a;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.2px;
            padding: 8px 10px;
            border-radius: 10px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: 0.18s ease;
            z-index: 1200;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
        }

        #global-nav:not(.expanded) [data-tooltip]::before {
            content: '';
            position: absolute;
            left: calc(100% + 6px);
            top: 50%;
            transform: translateY(-50%) translateX(-6px);
            border-width: 6px;
            border-style: solid;
            border-color: transparent #0f172a transparent transparent;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: 0.18s ease;
            z-index: 1199;
        }

        #global-nav:not(.expanded) [data-tooltip]:hover::after,
        #global-nav:not(.expanded) [data-tooltip]:hover::before {
            opacity: 1;
            visibility: visible;
            transform: translateY(-50%) translateX(0);
        }

        /* ESTADO RECOLHIDO */
        #global-nav:not(.expanded) .sidebar-user-card {
            width: 58px;
            padding: 8px 6px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
        }

        #global-nav:not(.expanded) .sidebar-user-info,
        #global-nav:not(.expanded) .sidebar-section-label,
        #global-nav:not(.expanded) .menu-text,
        #global-nav:not(.expanded) .item-text,
        #global-nav:not(.expanded) .sector-chevron,
        #global-nav:not(.expanded) .sidebar-footer {
            display: none !important;
        }

        #global-nav:not(.expanded) .smart-dropbtn {
            justify-content: center;
            padding: 12px 8px;
        }

        #global-nav:not(.expanded) .sector-title {
            justify-content: center;
            gap: 0;
        }

        #global-nav:not(.expanded) .sector-title i {
            width: 36px;
            height: 36px;
            min-width: 36px;
            border-radius: 12px;
            font-size: 16px;
        }

        #global-nav:not(.expanded) .smart-dropdown-content {
            display: none !important;
        }

        /* ESTADO EXPANDIDO */
        #global-nav.expanded .sidebar-user-card {
            flex-direction: row;
        }

        /* MOBILE */
        @media (max-width: 900px) {
            #global-header.header {
                gap: 12px;
                flex-direction: column;
                align-items: flex-start;
            }

            .header-brand {
                border-right: none;
                padding-right: 0;
                width: 100%;
                justify-content: flex-start;
            }

            .header-brand img {
                width: 180px;
                max-width: 100%;
                min-width: 0;
            }

            #global-nav,
            #global-nav.expanded {
                position: relative;
                width: 100%;
                height: auto;
                border-right: none;
                border-radius: 16px;
                margin-bottom: 18px;
                box-shadow: none;
                overflow-x: hidden;
            }

            #global-nav:not(.expanded) .sidebar-user-card,
            #global-nav:not(.expanded) .sidebar-section-label,
            #global-nav:not(.expanded) .menu-text,
            #global-nav:not(.expanded) .item-text,
            #global-nav:not(.expanded) .sector-chevron,
            #global-nav:not(.expanded) .sidebar-footer {
                display: flex !important;
            }

            #global-nav:not(.expanded) .sidebar-user-card {
                width: calc(100% - 20px);
                padding: 10px 12px;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
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
                width: 30px;
                height: 30px;
                min-width: 30px;
                border-radius: 10px;
                font-size: 15px;
            }

            #global-nav:not(.expanded) [data-tooltip]::after,
            #global-nav:not(.expanded) [data-tooltip]::before {
                display: none !important;
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
        const hasOpenMenu = document.querySelector('.smart-dropdown-content.show');
        if (!hasOpenMenu) {
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
    const iconChevron = event.currentTarget.querySelector('.sector-chevron');

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
            renderHeader(pageTitle);
            await checkPermissionsAndRenderMenu(user, currentPageId, displayPhoto);
        }
    } catch (e) {
        console.error("Erro initGlobal:", e);
    }
}

function renderHeader(title) {
    const headerEl = document.getElementById('global-header');
    if (!headerEl) return;

    headerEl.className = 'header';
    headerEl.innerHTML = `
        <div class="header-brand">
            <img src="${TOP_LOGO_URL}" alt="Onco Smart">
        </div>
        <div class="header-center">
            <p>${title}</p>
        </div>
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
            <button class="sidebar-logo-button" onclick="toggleSidebar()" data-tooltip="${isSidebarExpanded ? 'Recolher menu' : 'Expandir menu'}" title="Menu">
                <img class="sidebar-logo-avatar" src="${TOP_AVATAR_URL}" alt="Avatar Onco Smart">
                <img class="sidebar-logo-full" src="${TOP_LOGO_URL}" alt="Logo Onco Smart">
            </button>
        </div>

        <div class="sidebar-user-card" data-tooltip="${displayName}">
            <div class="sidebar-user-avatar">${avatarHTML}</div>
            <div class="sidebar-user-info">
                <div class="sidebar-user-greeting">${greeting},</div>
                <div class="sidebar-user-name">${displayName}</div>
            </div>
            <button class="sidebar-logout-btn" onclick="logout()" data-tooltip="Sair" title="Sair">
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
                        data-tooltip="${sector.name}"
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
                    <button class="smart-dropbtn" style="opacity:0.5; cursor:not-allowed;" data-tooltip="${sector.name}" title="${sector.name}">
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

    // atualiza tooltip do topo após sincronizar estado
    const logoButton = nav.querySelector('.sidebar-logo-button');
    if (logoButton) {
        logoButton.setAttribute('data-tooltip', nav.classList.contains('expanded') ? 'Recolher menu' : 'Expandir menu');
    }

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
