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
    { id: 'dashboard', label: 'Dashboard', file: 'dashboard.html', perm: 'dashboard' },
    { id: 'budget', label: 'Novo Orçamento', file: 'budget.html', perm: 'orcamentos' },
    { id: 'budgets', label: 'Orçamentos', file: 'budgets.html', perm: 'orcamentos' },
    { id: 'sales', label: 'Particulares', file: 'sales.html', perm: 'consultas' },
    { id: 'repass', label: 'Repasse', file: 'medical-repass.html', perm: 'repass' },
    { id: 'dashboard-repasse', label: 'Dashboard Repasse', file: 'dashboard-repasse.html', perm: 'dashboard-repasse' },
    { id: 'procedures', label: 'Procedimentos', file: 'procedures.html', perm: 'procedimentos' },
    
    { id: 'transporte', label: 'Recepção (Triagem)', file: 'transporte.html', perm: 'transporte' },
    { id: 'stenci', label: 'Stenci', file: 'stenci.html', perm: 'stenci' },
    { id: 'selos', label: 'Selos', file: 'selos.html', perm: 'selos' },
    { id: 'tuss', label: 'Tabela TUSS', file: 'tuss.html', perm: 'tuss' },
    
    { id: 'helpdesk_admin', label: 'Gestão Helpdesk', file: 'helpdesk-admin.html', perm: 'helpdesk_admin' },
    { id: 'admin', label: 'Admin', file: 'admin.html', perm: 'admin' },
    
    { id: 'enfermagem', label: 'Enfermagem (Triagem)', file: 'enfermagem.html', perm: 'enfermagem' },
    { id: 'doctors', label: 'Médicos', file: 'doctors.html', perm: 'medicos' },
    { id: 'pacientes', label: 'Pacientes', file: 'pacientes.html', perm: 'pacientes' },
    { id: 'shifts', label: 'Plantão', file: 'shifts.html', perm: 'plantao' },
    
    { id: 'indicadores_enf', label: 'Indicadores', file: 'indicadores-enfermagem.html', perm: 'indicadores_enf' },
    { id: 'helpdesk_dash', label: 'Dashboard Helpdesk', file: 'helpdesk-dash.html', perm: 'helpdesk_dash' },
    { id: 'eventos', label: 'Eventos', file: 'eventos.html', perm: 'eventos' },
    { id: 'atas', label: 'Mural de ATAs', file: 'atas.html', perm: 'atas' },
    
    { id: 'helpdesk', label: 'Helpdesk', file: 'helpdesk.html', perm: 'helpdesk' },
    { id: 'kanban', label: 'Trello', file: 'kanban.html', perm: 'kanban' },
    { id: 'oncofood', label: 'OncoFood - Copa', file: 'oncofood.html', perm: 'oncofood' }
];

// 2. ORGANIZAÇÃO DOS SETORES E SEUS MENUS
const MENU_SECTORS = [
    { name: "Financeiro", icon: "fas fa-chart-line", pages: ['dashboard', 'budget', 'budgets', 'sales', 'repass', 'dashboard-repasse', 'procedures'] },
    { name: "Recepção", icon: "fas fa-concierge-bell", pages: ['transporte', 'stenci', 'selos', 'tuss'] },
    { name: "Enfermagem", icon: "fas fa-user-nurse", pages: ['enfermagem', 'doctors', 'pacientes', 'shifts'] },
    { name: "Gerência", icon: "fas fa-briefcase", pages: ['indicadores_enf', 'helpdesk_dash', 'eventos', 'atas'] },
    { name: "Tec & Inovação", icon: "fas fa-laptop-code", pages: ['helpdesk_admin', 'admin'] },
    { name: "Central de Guias", icon: "fas fa-file-medical", pages: [] }, // Em breve
    { name: "Agregados", icon: "fas fa-puzzle-piece", pages: ['helpdesk', 'kanban', 'oncofood'] }
];

// Injeta o CSS do Menu Suspenso (Dropdown)
function injectMenuStyles() {
    if(document.getElementById('smart-menu-styles')) return;
    const style = document.createElement('style');
    style.id = 'smart-menu-styles';
    style.innerHTML = `
        .smart-nav-container { display: flex; gap: 10px; padding: 12px 30px; background: #fff; border-bottom: 1px solid #e5e7eb; flex-wrap: wrap; box-shadow: 0 4px 6px -4px rgba(0,0,0,0.05); }
        
        .smart-dropdown { position: relative; display: inline-block; }
        
        .smart-dropbtn { background: #f9fafb; color: #4b5563; padding: 10px 16px; font-size: 13px; font-weight: 700; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; white-space: nowrap; }
        .smart-dropbtn:hover { background: #e0f2fe; color: #0284c7; border-color: #bae6fd; }
        
        /* Setor que está com a página aberta fica Verde */
        .smart-dropdown.active-sector .smart-dropbtn { background: #00995D; color: white; border-color: #00995D; box-shadow: 0 4px 10px rgba(0,153,93,0.2); }
        
        .smart-dropdown-content { display: none; position: absolute; background-color: #fff; min-width: 220px; box-shadow: 0px 10px 25px rgba(0,0,0,0.1); z-index: 1000; border-radius: 10px; border: 1px solid #e5e7eb; top: 100%; left: 0; margin-top: 6px; overflow: hidden; }
        .smart-dropdown:hover .smart-dropdown-content { display: block; animation: dropFade 0.2s ease-out; }
        
        @keyframes dropFade { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        
        .smart-drop-item { padding: 12px 18px; text-decoration: none; display: block; color: #374151; font-size: 13px; font-weight: 600; border: none; border-bottom: 1px solid #f3f4f6; transition: 0.2s; cursor: pointer; text-align: left; background: none; width: 100%; }
        .smart-drop-item:last-child { border-bottom: none; }
        .smart-drop-item:hover { background-color: #f9fafb; color: #00995D; padding-left: 24px; }
        .smart-drop-item.active { background-color: #ecfdf5; color: #00995D; border-left: 4px solid #00995D; }
        
        /* Mobile View Ajustes */
        @media (max-width: 768px) {
            .smart-nav-container { flex-direction: column; align-items: stretch; padding: 15px; }
            .smart-dropdown { width: 100%; }
            .smart-dropbtn { justify-content: space-between; width: 100%; }
            .smart-dropdown-content { position: static; box-shadow: none; border: none; border-left: 2px solid #e5e7eb; margin-left: 10px; border-radius: 0; display: none; }
            .smart-dropdown:focus-within .smart-dropdown-content, .smart-dropdown:active .smart-dropdown-content { display: block; }
        }
    `;
    document.head.appendChild(style);
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
        const displayPhoto = (localPhoto && localPhoto.length > 50) ? localPhoto : (user.photo || '');

        if (!isNoAccess) {
            renderHeader(user, pageTitle, displayPhoto);
            await checkPermissionsAndRenderMenu(user, currentPageId);
        }
        
    } catch (e) {
        console.error("Erro initGlobal:", e);
    }
}

function renderHeader(user, title, photoSrc) {
    const headerEl = document.getElementById('global-header');
    if(!headerEl) return;
    
    headerEl.className = 'header';

    const hour = new Date().getHours();
    let greeting = (hour < 12) ? 'Bom dia' : (hour < 18) ? 'Boa tarde' : 'Boa noite';
    
    let displayName = user.nome || "Usuário";
    if (user.nome && user.nome.split(' ').length > 1) {
        displayName = `${user.nome.split(' ')[0]} ${user.nome.split(' ')[1]}`;
    }

    let avatarHTML = (photoSrc) 
        ? `<img src="${photoSrc}" style="width:100%; height:100%; object-fit:cover;">` 
        : `<div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;font-weight:bold; color: #00995D;">${displayName.charAt(0)}</div>`;

    headerEl.innerHTML = `
        <div class="header-logo"><img src="https://i.imgur.com/kpCeqqJ.png" alt="ECO"></div>
        <div class="header-center"><h1>ONCO SMART</h1><p>${title}</p></div>
        <div class="user-profile">
            <div class="user-info"><div class="user-greeting">${greeting},</div><div class="user-name">${displayName}</div></div>
            <div class="user-avatar">${avatarHTML}</div>
            <button class="logout-btn" onclick="logout()" title="Sair"><i class="fas fa-sign-out-alt"></i></button>
        </div>
    `;
}

async function checkPermissionsAndRenderMenu(user, activeId) {
    let perms = user.permissoes || {}; 
    
    try {
        const res = await fetch(`${API_BASE_URL}/usuarios`, {
            headers: API_HEADERS
        });
        
        if (res.ok) {
            const allUsers = await res.json();
            const emailKey = user.email.replace(/\./g, ',');
            let found = allUsers[emailKey] || Object.values(allUsers).find(u => u.email === user.email);
            if (found) {
                perms = (typeof found.permissoes === 'string') ? JSON.parse(found.permissoes) : found.permissoes;
                user.permissoes = perms;
                localStorage.setItem('ecoUser', JSON.stringify(user));
            }
        }
    } catch(e) {
        console.error("Falha ao buscar usuários:", e);
    }

    injectMenuStyles();

    const nav = document.getElementById('global-nav');
    if(!nav) return;
    
    let html = '<div class="smart-nav-container">';
    let hasVisibleMenu = false;
    
    // RENDERIZAÇÃO DOS SETORES EM DROPDOWNS
    MENU_SECTORS.forEach(sector => {
        let sectorHtml = '';
        let sectorHasVisiblePages = false;
        let isSectorActive = false;

        sector.pages.forEach(pageId => {
            const page = APP_PAGES.find(p => p.id === pageId);
            if (!page) return;

            let show = false;
            if (page.id === 'helpdesk') show = true; // Liberado para todos
            else if (page.id === 'admin') show = (perms.admin === true);
            else show = (perms[page.perm] === true);

            if (show) {
                sectorHasVisiblePages = true;
                hasVisibleMenu = true;
                
                const isActive = (page.id === activeId);
                if (isActive) isSectorActive = true;
                
                const activeClass = isActive ? 'active' : '';
                sectorHtml += `<button class="smart-drop-item ${activeClass}" onclick="window.location.href='${page.file}'">${page.label}</button>`;
            }
        });

        // Se o usuário tiver pelo menos 1 página liberada nesse setor, exibe o botão do setor
        if (sectorHasVisiblePages) {
            const sectorActiveClass = isSectorActive ? 'active-sector' : '';
            html += `
            <div class="smart-dropdown ${sectorActiveClass}">
                <button class="smart-dropbtn"><i class="${sector.icon}"></i> ${sector.name} &nbsp;<i class="fas fa-chevron-down" style="font-size:10px; opacity:0.6;"></i></button>
                <div class="smart-dropdown-content">
                    ${sectorHtml}
                </div>
            </div>`;
        } else if (sector.pages.length === 0 && perms.admin === true) {
            // Mostra o placeholder "Em breve" apenas para o Admin
            html += `
            <div class="smart-dropdown">
                <button class="smart-dropbtn" style="opacity: 0.5; cursor: not-allowed;"><i class="${sector.icon}"></i> ${sector.name} <small>(Em breve)</small></button>
            </div>`;
        }
    });
    
    html += '</div>';
    nav.innerHTML = html;

    // --- ROTEADOR (BLOQUEIO DE ACESSO INDEVIDO) ---
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