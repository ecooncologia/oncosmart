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
    { id: 'oncofood', label: 'OncoFood - Copa', file: 'oncofood.html', perm: 'oncofood' },
    
    { id: 'marketing', label: 'Gerador de Artes', file: 'gerador-imagens.html', perm: 'marketing' },
    { id: 'guias_cirurgicas', label: 'Guias Cirúrgicas', file: 'guias-cirurgicas.html', perm: 'guias_cirurgicas' }
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

// 💡 NOVO ESTILO: BARRA LATERAL FIXA (SIDEBAR) ESTILO SAAS 
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
            background: linear-gradient(180deg, #00855B 0%, #004d34 100%); 
            box-shadow: 4px 0 15px rgba(0,0,0,0.1); 
            z-index: 1000;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            color: white;
            transition: 0.3s;
        }
        
        /* SCROLLBAR CUSTOMIZADA (Fininha e Discreta) */
        #global-nav::-webkit-scrollbar { width: 5px; }
        #global-nav::-webkit-scrollbar-track { background: transparent; }
        #global-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        #global-nav::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

        /* ÁREA DA LOGO NO TOPO DO MENU */
        .sidebar-logo-area {
            padding: 25px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 15px;
        }
        .sidebar-logo-area img { max-width: 140px; height: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }

        /* BOTÃO MESTRE DOS SETORES (Acordeão) */
        .smart-dropdown { margin-bottom: 5px; padding: 0 15px; }
        .smart-dropbtn { 
            width: 100%;
            background: transparent; 
            color: rgba(255,255,255,0.85); 
            padding: 12px 15px; 
            font-size: 13px; 
            font-weight: 700; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            transition: 0.2s; 
        }
        .smart-dropbtn:hover { background: rgba(255, 255, 255, 0.1); color: white; }
        
        .sector-title { display: flex; align-items: center; gap: 12px; }
        .sector-title i { font-size: 16px; width: 20px; text-align: center; }

        /* STATUS ATIVO (Quando a página aberta pertence a este setor) */
        .smart-dropdown.active-sector .smart-dropbtn { 
            background: rgba(255, 255, 255, 0.2); 
            color: #ffffff; 
            font-weight: 800;
        }

        /* CAIXA DE SUB-ITENS (Páginas) */
        .smart-dropdown-content { 
            display: none; 
            flex-direction: column;
            gap: 2px;
            padding: 5px 0 5px 35px; /* Recuo para mostrar que está dentro */
            overflow: hidden; 
        }
        .smart-dropdown-content.show { display: flex; animation: slideDown 0.3s ease-out; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* ITEM DA PÁGINA (Link) */
        .smart-drop-item { 
            padding: 10px 15px; 
            text-decoration: none; 
            color: rgba(255,255,255,0.7); 
            font-size: 12px; 
            font-weight: 600; 
            border: none; 
            background: transparent; 
            cursor: pointer; 
            text-align: left; 
            width: 100%; 
            border-radius: 6px;
            transition: 0.2s;
            position: relative;
        }
        .smart-drop-item:hover { color: white; background: rgba(255,255,255,0.05); }
        
        /* PÁGINA ATUAL ABERTA */
        .smart-drop-item.active { 
            color: white; 
            font-weight: 800; 
            background: rgba(255,255,255,0.15); 
        }
        .smart-drop-item.active::before {
            content: '';
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 5px #10b981;
        }

        /* AJUSTES PARA CELULAR (Vira um menu gaveta inferior ou tela inteira - Opcional) */
        @media (max-width: 900px) {
            #global-nav { position: relative; width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px; }
            .sidebar-logo-area { display: none; }
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
        : `<span>${displayName.charAt(0)}</span>`;

    // 💡 O cabeçalho agora ficou menor, pois a Logo foi para a barra lateral!
    headerEl.innerHTML = `
        <div class="header-logo"><img src="https://i.imgur.com/kpCeqqJ.png" alt="ECO"></div>
        <div class="header-center"><p>${title}</p></div>
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
        const res = await fetch(`${API_BASE_URL}/usuarios`, { headers: API_HEADERS });
        
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
    } catch(e) { console.error("Falha ao buscar usuários:", e); }

    injectMenuStyles();

    const nav = document.getElementById('global-nav');
    if(!nav) return;
    
    // 💡 INSERE A LOGO DA CLÍNICA NO TOPO DA BARRA LATERAL
    let html = `
        <div class="sidebar-logo-area">
            <img src="https://i.imgur.com/kpCeqqJ.png" alt="ONCO SMART">
        </div>
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
                sectorHtml += `<button class="smart-drop-item ${activeClass}" onclick="window.location.href='${page.file}'">${page.label}</button>`;
            }
        });

        const dropId = 'dropMenu' + index;

        if (sectorHasVisiblePages) {
            const sectorActiveClass = isSectorActive ? 'active-sector' : '';
            // Se o setor estiver ativo, o ícone já nasce apontando para baixo e o menu aberto
            const iconChevron = isSectorActive ? 'fa-chevron-down' : 'fa-chevron-right';
            const showClass = isSectorActive ? 'show' : '';

            html += `
            <div class="smart-dropdown ${sectorActiveClass}">
                <button class="smart-dropbtn" onclick="toggleSmartMenu('${dropId}', event)">
                    <span class="sector-title"><i class="${sector.icon}"></i> ${sector.name}</span>
                    <i class="fas ${iconChevron}" style="font-size:10px; opacity:0.6;"></i>
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
                    <small style="font-size: 9px; background: rgba(255,255,255,0.2); padding: 2px 5px; border-radius: 4px;">Em breve</small>
                </button>
            </div>`;
        }
    });
    
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