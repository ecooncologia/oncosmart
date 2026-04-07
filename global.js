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

// =============================================
// TOOLTIP VIA JAVASCRIPT
// =============================================
function initTooltipSystem() {
    if (window.__tooltipSystemReady) return;
    window.__tooltipSystemReady = true;

    const tooltipEl = document.createElement('div');
    tooltipEl.id = 'smart-tooltip';
    document.body.appendChild(tooltipEl);

    const arrowEl = document.createElement('div');
    arrowEl.id = 'smart-tooltip-arrow';
    document.body.appendChild(arrowEl);

    let hideTimeout = null;

    document.addEventListener('mouseover', function (e) {
        const nav = document.getElementById('global-nav');
        if (!nav || nav.classList.contains('expanded')) return;
        if (window.innerWidth <= 1100) return;

        const target = e.target.closest('[data-tooltip]');
        if (!target || !nav.contains(target)) return;

        const text = target.getAttribute('data-tooltip');
        if (!text) return;

        clearTimeout(hideTimeout);

        tooltipEl.textContent = text;
        tooltipEl.style.display = 'block';
        arrowEl.style.display = 'block';

        const rect = target.getBoundingClientRect();
        const tipW = tooltipEl.offsetWidth;
        const tipH = tooltipEl.offsetHeight;

        let left = rect.right + 12;
        let top = rect.top + (rect.height / 2) - (tipH / 2);

        if (left + tipW > window.innerWidth - 12) {
            left = window.innerWidth - tipW - 12;
        }

        if (top < 12) top = 12;
        if (top + tipH > window.innerHeight - 12) {
            top = window.innerHeight - tipH - 12;
        }

        tooltipEl.style.left = left + 'px';
        tooltipEl.style.top = top + 'px';

        arrowEl.style.left = (rect.right + 4) + 'px';
        arrowEl.style.top = (rect.top + (rect.height / 2) - 6) + 'px';

        requestAnimationFrame(() => {
            tooltipEl.classList.add('visible');
            arrowEl.classList.add('visible');
        });
    });

    document.addEventListener('mouseout', function (e) {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;

        hideTimeout = setTimeout(() => {
            tooltipEl.classList.remove('visible');
            arrowEl.classList.remove('visible');

            setTimeout(() => {
                tooltipEl.style.display = 'none';
                arrowEl.style.display = 'none';
            }, 160);
        }, 80);
    });
}

// =============================================
// CSS INJETADO DO MENU
// =============================================
function injectMenuStyles() {
    if (document.getElementById('smart-menu-styles')) return;

    const style = document.createElement('style');
    style.id = 'smart-menu-styles';
    style.innerHTML = `
        #smart-tooltip {
            position: fixed;
            display: none;
            background: #0f172a;
            color: #ffffff;
            font-size: 11.5px;
            font-weight: 700;
            letter-spacing: 0.2px;
            padding: 8px 12px;
            border-radius: 10px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 99999;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.22);
            opacity: 0;
            transform: translateX(-6px);
            transition: opacity 0.16s ease, transform 0.16s ease;
        }

        #smart-tooltip.visible {
            opacity: 1;
            transform: translateX(0);
        }

        #smart-tooltip-arrow {
            position: fixed;
            display: none;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px 7px 6px 0;
            border-color: transparent #0f172a transparent transparent;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transform: translateX(-4px);
            transition: opacity 0.16s ease, transform 0.16s ease;
        }

        #smart-tooltip-arrow.visible {
            opacity: 1;
            transform: translateX(0);
        }

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
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;
        }

        #global-nav.expanded {
            width: 260px;
        }

        #global-nav::-webkit-scrollbar { width: 5px; }
        #global-nav::-webkit-scrollbar-track { background: transparent; }
        #global-nav::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        #global-nav::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        .sidebar-logo-area {
            padding: 14px 8px 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .sidebar-logo-button {
            width: 60px;
            height: 60px;
            border: 1.5px solid #e2e8f0;
            border-radius: 18px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.28s ease;
            padding: 6px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05);
        }

        .sidebar-logo-button:hover {
            background: #f8fafc;
            border-color: #c7d2db;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.07);
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
            width: 200px;
            height: 66px;
            border-radius: 18px;
            padding: 8px 16px;
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
            width: 46px;
            height: 46px;
        }

        #global-nav:not(.expanded) .sidebar-logo-full {
            display: none;
        }

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
            transition: all 0.25s ease;
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
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: 0.22s ease;
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

        #global-nav:not(.expanded) .sidebar-logout-btn {
            display: inline-flex !important;
            width: 30px;
            height: 30px;
            font-size: 12px;
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
            width: 38px;
            height: 38px;
            min-width: 38px;
            border-radius: 12px;
            font-size: 16px;
        }

        #global-nav:not(.expanded) .smart-dropdown-content {
            display: none !important;
        }

        #global-nav.expanded .sidebar-user-card {
            flex-direction: row;
        }

        @media (max-width: 1100px) {
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

            #global-nav .sidebar-logo-area {
                padding: 14px 12px 10px;
            }

            #global-nav .sidebar-logo-button,
            #global-nav.expanded .sidebar-logo-button {
                width: 190px;
                height: 62px;
                border-radius: 18px;
                padding: 8px 16px;
            }

            #global-nav .sidebar-logo-avatar {
                display: none !important;
            }

            #global-nav .sidebar-logo-full {
                display: block !important;
                width: 100%;
                height: 100%;
            }

            #global-nav .sidebar-user-card {
                width: calc(100% - 20px);
                padding: 10px 12px;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
            }

            #global-nav .sidebar-user-info,
            #global-nav .sidebar-section-label,
            #global-nav .menu-text,
            #global-nav .item-text,
            #global-nav .sector-chevron {
                display: flex !important;
            }

            #global-nav .smart-dropbtn {
                justify-content: space-between;
                padding: 12px 14px;
            }

            #global-nav .sector-title {
                justify-content: flex-start;
                gap: 12px;
            }

            #global-nav .sector-title i {
                width: 30px;
                height: 30px;
                min-width: 30px;
                border-radius: 10px;
                font-size: 15px;
            }

            /* tablet/mobile: submenu pode abrir normalmente */
            #global-nav .smart-dropdown-content {
                display: none;
            }

            #global-nav .smart-dropdown-content.show {
                display: flex !important;
            }

            #global-nav .sidebar-footer {
                display: none !important;
            }

            #smart-tooltip,
            #smart-tooltip-arrow {
                display: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

// =============================================
// FUNÇÕES DA SIDEBAR
// =============================================
function isTabletOrMobile() {
    return window.innerWidth <= 1100;
}

function getDefaultSidebarExpanded() {
    if (isTabletOrMobile()) return true;
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

function hideTooltip() {
    const tip = document.getElementById('smart-tooltip');
    const arrow = document.getElementById('smart-tooltip-arrow');
    if (tip) {
        tip.classList.remove('visible');
        tip.style.display = 'none';
    }
    if (arrow) {
        arrow.classList.remove('visible');
        arrow.style.display = 'none';
    }
}

function syncSidebarState(isExpanded) {
    const nav = document.getElementById('global-nav');
    if (!nav) return;

    nav.classList.toggle('expanded', isExpanded);
    applyBodySidebarClass(isExpanded);

    if (!isTabletOrMobile()) {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, isExpanded ? 'true' : 'false');
    }

    hideTooltip();

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

    if (isTabletOrMobile()) {
        syncSidebarState(true);
        return;
    }

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

    let resizeTimer;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const shouldExpand = getDefaultSidebarExpanded();
            syncSidebarState(shouldExpand);
        }, 120);
    });
}

// =============================================
// INIT
// =============================================
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

// =============================================
// HEADER — SOMENTE TÍTULO
// =============================================
function renderHeader(title) {
    const headerEl = document.getElementById('global-header');
    if (!headerEl) return;

    headerEl.className = 'header';
    headerEl.innerHTML = `
        <div class="header-center">
            <p>${title}</p>
        </div>
    `;
}

// =============================================
// MENU E PERMISSÕES
// =============================================
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
    initTooltipSystem();
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
            <button class="sidebar-logo-button" onclick="toggleSidebar()" data-tooltip="Menu" title="Menu">
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
    localStorage.removeItem('ecoSidebarExpanded');
    window.location.href = 'https://ecooncologia.com.br/smart/';
}
