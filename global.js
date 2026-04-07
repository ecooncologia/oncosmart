let API_BASE_URL = "https://api.ecooncologia.com.br:3000";

if (window.location.href.includes('/teste/')) {
    API_BASE_URL = "https://api.ecooncologia.com.br:4000";
}

const API_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'EcoOnco_Smart_Seguranca_2026!@'
};

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

// 💡 ESTILO: BARRA LATERAL FIXA BRANCA COM BORDAS SUTIS
function injectMenuStyles() {
    if(document.getElementById('smart-menu-styles')) return;
    const style = document.createElement('style');
    style.id = 'smart-menu-styles';
    style.innerHTML = `
        /* CONTAINER PRINCIPAL DA BARRA LATERAL */
        #global-nav { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 260px; 
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
            transition: 0.3s;
        }
        
        /* SCROLLBAR CUSTOMIZADA */
        #global-nav::-webkit-scrollbar { width: 5px; }
        #global-nav::-webkit-scrollbar-track { background: transparent; }
        #global-nav::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        #global-nav::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* ÁREA DA LOGO NO TOPO DO MENU */
        .sidebar-logo-area {
            padding: 25px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            font-size: 22px;
            font-weight: 900;
            color: #00855B;
            letter-spacing: 1px;
        }
        .sidebar-logo-area span { color: #1e293b; }

        /* PERFIL DO USUÁRIO NA SIDEBAR */
        .sidebar-user-card {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px 12px;
            width: calc(100% - 30px);
            margin: 0 auto 15px auto;
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
        .sidebar-user-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .sidebar-user-info { flex: 1; min-width: 0; }
        .sidebar-user-greeting { font-size: 10px; color: #64748b; font-weight: 500; letter-spacing: 0.3px; }
        .sidebar-user-name { font-size: 12.5px; color: #1e293b; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-logout-btn { background: transparent; border: none; color: #ef4444; cursor: pointer; padding: 5px; border-radius: 7px; transition: 0.2s; flex-shrink: 0; font-size: 13px; }
        .sidebar-logout-btn:hover { background: #fee2e2; }

        /* LABEL DE SEÇÃO */
        .sidebar-section-label { padding: 14px 22px 5px; font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #94a3b8; }

        /* BOTÃO MESTRE DOS SETORES (Acordeão) */
        .smart-dropdown { margin-bottom: 8px; padding: 0 15px; }
        .smart-dropbtn { 
            width: 100%;
            background: transparent; 
            color: #475569; 
            padding: 12px 15px; 
            font-size: 13px; 
            font-weight: 700; 
            border: 1px solid #e2e8f0; /* Bordinha sutil */
            border-radius: 8px; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            transition: 0.2s; 
        }
        .smart-dropbtn:hover { background: #f8fafc; color: #00855B; border-color: #cbd5e1; }
        
        .sector-title { display: flex; align-items: center; gap: 12px; }
        .sector-title i { font-size: 16px; width: 20px; text-align: center; color: #94a3b8; transition: 0.2s;}

        .smart-dropbtn:hover .sector-title i { color: #00855B; }

        /* STATUS ATIVO (Setor) */
        .smart-dropdown.active-sector .smart-dropbtn { 
            background: #ecfdf5; 
            color: #00855B; 
            font-weight: 800;
            border-color: #a7f3d0; /* Borda verdinha */
        }
        .smart-dropdown.active-sector .smart-dropbtn .sector-title i { color: #00855B; }

        /* CAIXA DE SUB-ITENS (Páginas) */
        .smart-dropdown-content { 
            display: none; 
            flex-direction: column;
            gap: 4px;
            padding: 5px 0 5px 35px;
            overflow: hidden; 
        }
        .smart-dropdown-content.show { display: flex; animation: slideDown 0.3s ease-out; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* ITEM DA PÁGINA (Link/Subcategoria) */
        .smart-drop-item { 
            padding: 10px 15px; 
            text-decoration: none; 
            color: #64748b; 
            font-size: 12px; 
            font-weight: 600; 
            border: 1px solid #f8fafc; /* Borda bem sutil para criar o formato de card */
            background: transparent; 
            cursor: pointer; 
            text-align: left; 
            width: 100%; 
            border-radius: 6px;
            transition: 0.2s;
            position: relative;
        }
        .smart-drop-item:hover { color: #00855B; background: #f8fafc; border-color: #e2e8f0; }
        
        /* PÁGINA ATUAL ABERTA */
        .smart-drop-item.active { 
            color: #00855B; 
            font-weight: 800; 
            background: transparent; 
            border-color: #d1fae5; /* Borda verdinha no item ativo */
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

        /* RODAPÉ DA SIDEBAR (LOGO) */
        .sidebar-footer { margin-top: auto; padding: 20px 22px; border-top: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; gap: 10px; background: #fafafa;}
        .sidebar-footer img { max-width: 130px; height: auto; opacity: 0.9; }
        .sidebar-footer span { font-size: 10px; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px; }

        @media (max-width: 900px) {
            #global-nav { position: relative; width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px; box-shadow: none; border-right: none;}
            .sidebar-logo-area { display: none; }
            .sidebar-footer { display: none; }
        }
    `;
    document.head.appendChild(style);
}

// Funções para Controle do Acordeão (Sanfona)
window.toggleSmartMenu = function(id, event) {
    event.stopPropagation();
    
    const targetMenu = document.getElementById(id);
    const iconChevron = event.currentTarget.querySelector('.fa-chevron-down, .fa-chevron-right');
    const isCurrentlyOpen = targetMenu.classList.contains('show');

    // Comportamento moderno: Fechar outras gavetas ao abrir uma nova
    document.querySelectorAll('.smart-dropdown-content').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('.smart-dropbtn .fa-chevron-down').forEach(el => {
        el.classList.replace('fa-chevron-down', 'fa-chevron-right');
    });

    if (!isCurrentlyOpen) {
        targetMenu.classList.add('show');
        if(iconChevron) iconChevron.classList.replace('fa-chevron-right', 'fa-chevron-down');
    }
};

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
        const displayPhoto = (localPhoto && localPhoto.length > 50) ? localPhoto : (user.foto || user.photo || '');

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
    if(!headerEl) return;
    
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
            const emailKey = user.email.replace(/\./g, ',');
            let found = allUsers[emailKey] || Object.values(allUsers).find(u => u.email === user.email);
            if (found) {
                perms = (typeof found.permissoes === 'string') ? JSON.parse(found.permissoes) : found.permissoes;
                user.permissoes = perms;
                if(found.foto && !photoSrc) photoSrc = found.foto; 
                localStorage.setItem('ecoUser', JSON.stringify(user));
            }
        }
    } catch(e) { console.error("Falha ao buscar usuários:", e); }

    injectMenuStyles();

    const nav = document.getElementById('global-nav');
    if(!nav) return;
    
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
            ONCO <span>SMART</span>
        </div>
        <div class="sidebar-user-card">
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
            if (page.id === 'helpdesk') show = true; 
            else if (page.id === 'admin') show = (perms.admin === true);
            else show = (perms[page.perm] === true);

            if (show) {
                sectorHasVisiblePages = true;
                hasVisibleMenu = true;
                
                const isActive = (page.id === activeId);
                if (isActive) isSectorActive = true;
                
                const activeClass = isActive ? 'active' : '';
                const pageIcon = page.icon || 'fas fa-circle';

                sectorHtml += `
                    <button class="smart-drop-item ${activeClass}" onclick="window.location.href='${page.file}'">
                        <i class="${pageIcon}"></i>
                        ${page.label}
                    </button>`;
            }
        });

        const dropId = 'dropMenu' + index;

        if (sectorHasVisiblePages) {
            const sectorActiveClass = isSectorActive ? 'active-sector' : '';
            const showClass = isSectorActive ? 'show' : '';
            const openClass = isSectorActive ? 'is-open' : '';

            html += `
            <div class="smart-dropdown ${sectorActiveClass}">
                <button class="smart-dropbtn ${openClass}" onclick="toggleSmartMenu('${dropId}', event)">
                    <span class="sector-title"><i class="${sector.icon}"></i> ${sector.name}</span>
                    <i class="fas fa-chevron-right sector-chevron"></i>
                </button>
                <div id="${dropId}" class="smart-dropdown-content ${showClass}">
                    ${sectorHtml}
                </div>
            </div>`;
        } else if (sector.pages.length === 0 && perms.admin === true) {
            html += `
            <div class="smart-dropdown">
                <button class="smart-dropbtn" style="opacity: 0.5; cursor: not-allowed;">
                    <span class="sector-title"><i class="${sector.icon}"></i> ${sector.name}</span>
                    <small style="font-size: 9px; background: #f1f5f9; color: #64748b; padding: 2px 5px; border-radius: 4px;">Em breve</small>
                </button>
            </div>`;
        }
    });

    html += `
        <div class="sidebar-footer">
            <img src="https://i.imgur.com/kpCeqqJ.png" alt="Eco Oncologia">
            <span>&copy; ${new Date().getFullYear()} ECO SISTEMAS</span>
        </div>
    `;
    
    nav.innerHTML = html;

    // --- ROTEADOR ---
    const pageConfig = APP_PAGES.find(p => p.id === activeId);
    if (pageConfig) {
        const req = pageConfig.perm;
        const allowed = (perms.admin === true && pageConfig.id === 'admin') || 
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